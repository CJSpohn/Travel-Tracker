let domUpdates = {
  greetUser(user) {
    document.querySelector('.js-welcome').innerText += ' ' + user.name.split(' ')[0]
  },

  addPendingTrip(trip, destinations) {
    let tripDestination = destinations.find(destination => destination.id === trip.destinationID);
    const template = document.querySelector('.pending-trip').content;
    const destination = template.querySelector('.pending-trip__destination');
    const date = template.querySelector('.pending-trip__date');
    const travelers = template.querySelector('.pending-trip__travelers');
    const duration = template.querySelector('.pending-trip__duration');
    destination.textContent = tripDestination.destination;
    date.textContent = trip.date;
    travelers.textContent = trip.travelers;
    duration.textContent = trip.duration;
    document.querySelector('.pending-trips__wrapper').appendChild(
      document.importNode(template, true));
  },

  hideHeader() {
    document.querySelector('.pending-trips__header').classList.add('hidden')
  }

}

export default domUpdates;
