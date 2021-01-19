import './css/base.scss';

import domUpdates from './domUpdates';
import apiFetch from './fetch';
import agentDom from './agentDom';

import Trip from './Trip';
import User from './User';

const signInButton = document.querySelector('.js-login-form');
const signOutButton = document.querySelector('.log-out');
const enterSiteButton = document.querySelector('.js-enter');
const costButton = document.querySelector('.input__cost-button');
const confirmTripButton = document.querySelector('.input__confirm-button');
const clearTripButton = document.querySelector('.input__clear-button');

let currentUser, trips, destinations, currentTrip, users, agent;

const sortUserTrips = (trips) => {
  const currentDate = Date.now();
  trips.forEach(trip => {
    const tripDate = new Date(trip.date);
    if (trip.status === 'pending') {
      domUpdates.hidePendingHeader();
      let expired = tripDate.getTime() < currentDate;
      domUpdates.addPendingTrip(trip, destinations, expired)
    } else {
      domUpdates.hidePastHeader();
      domUpdates.addPastTrip(trip, destinations);
    }
  })
}

const onStartup = (userId) => {
  const usersPromise = apiFetch.getData(`http://localhost:3001/api/v1/travelers/${userId}`);
  const tripsPromise = apiFetch.getData('http://localhost:3001/api/v1/trips');
  const destinationsPromise = apiFetch.getData('http://localhost:3001/api/v1/destinations');
  Promise.all([usersPromise, tripsPromise, destinationsPromise])
    .then(promises => {
      currentUser = new User(promises[0]);
      trips = promises[1].trips;
      destinations = promises[2].destinations;
      domUpdates.greetUser(currentUser);
      domUpdates.populateDestinations(destinations);
      sortUserTrips(currentUser.findUserTrips(trips));
      domUpdates.populateExpenditures(currentUser, destinations);
    })
    domUpdates.setStartDate();
}

const onAgentStartup = () => {
  const usersPromise = apiFetch.getData(`http://localhost:3001/api/v1/travelers/users`);
  const tripsPromise = apiFetch.getData('http://localhost:3001/api/v1/trips');
  const destinationsPromise = apiFetch.getData('http://localhost:3001/api/v1/destinations');
  Promise.all([usersPromise, tripsPromise, destinationsPromise])
    .then(promises => {
      users = promises[0].travelers;
      trips = promises[1].trips;
      destinations = promises[2].destinations;
      agent = new Agent({id: 1, name: 'Agent', travelerType: 'Agent', trips: trips });
      console.log(agent);
    })
}

const verifyCredentials = () => {
  let username = document.querySelector('.js-username').value;
  let password = document.querySelector('.js-password').value;
  if (username === 'agency' && password === 'travel2020') {
    agentDom.logInAgent();
    onAgentStartup();
    return
  }
  let userId = username.slice(-2);
  if (parseInt(userId) / 50 <= 1
    && username.includes('traveler')
    && parseInt(userId) > 0) {
    if (password === 'travel2020') {
      domUpdates.logInUser();
      onStartup(userId);
      return
    }
  } else {
    domUpdates.displayLogInError();
  }
}

const verifyInputs = (stringInputs, numberInputs) => {
  let inputsCorrect = true;
  stringInputs.forEach(input => {
    if (input === '') {
      inputsCorrect = false;
    }
  });
  numberInputs.forEach(input => {
    if (!parseInt(input)) {
      inputsCorrect = false;
    }
  });
  return inputsCorrect;
}

const calculateTrip = () => {
  const destinationName = document.querySelector('.form__list').value;
  const startDate = document.querySelector('.start-date').value.replaceAll('-', '/');
  const travelers = document.querySelector('.travelers').value;
  const duration = document.querySelector('.duration').value;
  const id = trips[trips.length-1].id + 1;
  const verifiedInputs = verifyInputs( [ startDate ], [ travelers, duration ] );
  if (!verifiedInputs) {
    domUpdates.revealFormError();
    return;
  }
  const destinationId = destinations.find(destination => destination.destination === destinationName).id;
  const tripDetails = {
    id: id,
    userID: currentUser.id,
    destinationID: destinationId,
    travelers: travelers,
    date: startDate,
    duration: duration,
  };
  currentTrip = new Trip(tripDetails);
  const tripCost = currentTrip.calculateCost(destinations);
  domUpdates.hideFormError();
  domUpdates.revealCostDisplay(tripCost);
  console.log(currentTrip);
}

const updateTrips = () => {
  domUpdates.addPendingTrip(currentTrip, destinations)
  apiFetch.getData('http://localhost:3001/api/v1/trips')
    .then(res => trips = res.trips);
}

const postTrip = () => {
  apiFetch.postData('http://localhost:3001/api/v1/trips', currentTrip)
  .then(res => {
    domUpdates.hideConfirmScreen();
    domUpdates.revealCalculateButton();
    domUpdates.displayPostSuccess();
    domUpdates.clearTripForm();
    updateTrips();
  })
  .catch(err => {
    console.log(err);
    domUpdates.displayPostError();
  });
}

costButton.addEventListener('click', calculateTrip);
confirmTripButton.addEventListener('click', postTrip);
clearTripButton.addEventListener('click', () => {
  domUpdates.clearTripForm();
})
signInButton.addEventListener('click', domUpdates.showSignIn);
enterSiteButton.addEventListener('click', verifyCredentials);
signOutButton.addEventListener('click', () => {
  location.reload();
})
