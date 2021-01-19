const agentDom = {
  displayLoadError() {
    document.querySelector('.agent-loading-error').innerText = `
    Something went wrong. Your remote server probably isn't started. Check the Readme for more information.
    `
  },

  logInAgent() {
    document.querySelector('.login__wrapper').classList.add('hidden');
    document.querySelector('.agent-wrapper').classList.remove('hidden');
  },

  populateIncome(tripInfo) {
    document.querySelector('.agent__income-amount').innerText += tripInfo.agentFees;
    document.querySelector('.agent__trips-taken').innerText += tripInfo.tripsTaken;
  },

  populatePendingTrips(pendingTrip, destinations, users) {
    document.querySelector('.agent__pending-header').classList.add('hidden');
    const template = document.querySelector('.agent__pending-trip').content;
    const user = template.querySelector('.a-pending-trip__user');
    const destination = template.querySelector('.a-pending-trip__destination');
    const startDate = template.querySelector('.a-pending-trip__date');
    const travelers = template.querySelector('.a-pending-trip__travelers');
    const days = template.querySelector('.a-pending-trip__duration');
    user.textContent = users.find(user => user.id === pendingTrip.userID).name;
    destination.textContent = destinations.find(destinations => destinations.id === pendingTrip.destinationID).destination;
    startDate.textContent = pendingTrip.date;
    travelers.textContent = pendingTrip.travelers;
    days.textContent = pendingTrip.duration;
    document.querySelector('.agent__pending-trips').appendChild(
      document.importNode(template, true));
  }
}

export default agentDom;
