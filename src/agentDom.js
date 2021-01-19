const agentDom = {
  logInAgent() {
    document.querySelector('.login__wrapper').classList.add('hidden');
    document.querySelector('.agent-wrapper').classList.remove('hidden');
  },

  populateIncome(tripInfo) {
    document.querySelector('.agent__income-amount').innerText += tripInfo.agentFees;
    document.querySelector('.agent__trips-taken').innerText += tripInfo.tripsTaken;
  },

  populatePendingTrips(pendingTrip) {
    const template = document.querySelector('.agent__pending-trip').content;
    const user = template.querySelector('.a-pending-trip__user');
    const destination = template.querySelector('.a-pending-trip__destination');
    const startDate = template.querySelector('.a-pending-trip__date');
    const travelers = template.querySelector('.a-pending-trip__travelers');
    const days = template.querySelector('.a-pending-trip__duration');
    user.textContent = pendingTrip.userID;
    destination.textContent = pendingTrip.destinationID;
    startDate.textContent = pendingTrip.date;
    travelers.textContent = pendingTrip.travelers;
    days.textContent = pendingTrip.duration;
    document.querySelector('.agent__pending-trips').appendChild(
      document.importNode(template, true));
  }
}

export default agentDom;
