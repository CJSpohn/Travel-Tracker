import './css/base.scss';

import domUpdates from './domUpdates';
import apiFetch from './fetch';

import Trip from './Trip';
import User from './User';

const signOutButton = document.querySelector('.log-out');
const costButton = document.querySelector('.input__cost-button');
const confirmTripButton = document.querySelector('.input__confirm-button');

let currentUser, trips, destinations, currentTrip;

const sortUserTrips = (trips) => {
  const currentDate = Date.now();
  trips.forEach(trip => {
    domUpdates.hidePastHeader();
    const tripDate = new Date(trip.date);
    if (tripDate > currentDate || trip.status === 'pending') {
      domUpdates.hidePendingHeader();
      domUpdates.addPendingTrip(trip, destinations)
    } else {
      domUpdates.hidePastHeader();
      domUpdates.addPastTrip(trip, destinations);
    }
  })
}

const onStartup = () => {
  const usersPromise = apiFetch.getData('http://localhost:3001/api/v1/travelers');
  const tripsPromise = apiFetch.getData('http://localhost:3001/api/v1/trips');
  const destinationsPromise = apiFetch.getData('http://localhost:3001/api/v1/destinations');

  Promise.all([usersPromise, tripsPromise, destinationsPromise])
    .then(promises => {
      currentUser = new User(promises[0].travelers[13]);
      trips = promises[1].trips;
      destinations = promises[2].destinations;
      domUpdates.greetUser(currentUser);
      domUpdates.populateDestinations(destinations);
      sortUserTrips(currentUser.findUserTrips(trips));
    })
    domUpdates.setStartDate();
}

const calculateTrip = () => {
  const destinationName = document.querySelector('.form__list').value;
  const startDate = document.querySelector('.start-date').value.replaceAll('-', '/');
  const travelers = document.querySelector('.travelers').value;
  const duration = document.querySelector('.duration').value;
  const id = trips.length + 1;
  const destinationId = destinations.find(destination => destination.destination === destinationName).id;
  const tripDetails = {
    id: id,
    userID: currentUser.id,
    destinationID: destinationId,
    travelers: travelers,
    date: startDate,
    duration: duration,
  }
  currentTrip = new Trip(tripDetails);
  const tripCost = currentTrip.calculateCost(destinations);
  domUpdates.revealCostDisplay(tripCost);
  console.log(currentTrip)
}

const updatePendingTrips = () => {
  onStartup();
}

const postTrip = () => {
  apiFetch.postData('http://localhost:3001/api/v1/trips', currentTrip)
    .then(res => {
      console.log(res);
      domUpdates.hideConfirmScreen();
      domUpdates.revealCalculateButton();
      updatePendingTrips();
    });

}


window.onload = onStartup();
costButton.addEventListener('click', calculateTrip)
confirmTripButton.addEventListener('click', postTrip)
// signOutButton.addEventListener('click', log)
