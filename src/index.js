import './css/base.scss';

import domUpdates from './domUpdates';
import apiFetch from './fetch';

import Trip from './Trip';
import User from './User';

const signOutButton = document.querySelector('.log-out');

let currentUser, trips;

const sortUserTrips = (trips) => {
  trips.forEach(trip => {
    if (trip.status === 'pending') {
      domUpdates.addPendingTrip(trip)
    }
  })
}

const onStartup = () => {
  const usersPromise = apiFetch.getData('http://localhost:3001/api/v1/travelers');
  const tripsPromise = apiFetch.getData('http://localhost:3001/api/v1/trips');

  Promise.all([usersPromise, tripsPromise])
    .then(promises => {
      currentUser = new User(promises[0].travelers[9]);
      trips = promises[1].trips;
      domUpdates.greetUser(currentUser);
      sortUserTrips(currentUser.findUserTrips(trips));
    })

}


window.onload = onStartup();
// signOutButton.addEventListener('click', log)
