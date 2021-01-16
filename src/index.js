import './css/base.scss';

import domUpdates from './domUpdates';
import apiFetch from './fetch';

import Trip from './Trip';
import User from './User';

const signOutButton = document.querySelector('.log-out');

let currentUser, trips, destinations;

const sortUserTrips = (trips) => {
  trips.forEach(trip => {
    if (trip.status === 'pending') {
      domUpdates.hideHeader();
      domUpdates.addPendingTrip(trip, destinations)
    }
  })
}

const onStartup = () => {
  const usersPromise = apiFetch.getData('http://localhost:3001/api/v1/travelers');
  const tripsPromise = apiFetch.getData('http://localhost:3001/api/v1/trips');
  const destinationsPromise = apiFetch.getData('http://localhost:3001/api/v1/destinations');

  Promise.all([usersPromise, tripsPromise, destinationsPromise])
    .then(promises => {
      currentUser = new User(promises[0].travelers[6]);
      trips = promises[1].trips;
      destinations = promises[2].destinations;
      domUpdates.greetUser(currentUser);
      sortUserTrips(currentUser.findUserTrips(trips));
    })

}


window.onload = onStartup();
// signOutButton.addEventListener('click', log)
