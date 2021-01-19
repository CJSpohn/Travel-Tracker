const agentDom = {
  logInAgent() {
    document.querySelector('.login__wrapper').classList.add('hidden');
    document.querySelector('.agent-wrapper').classList.remove('hidden');
  },

  populateIncome(tripInfo) {
    document.querySelector('.agent__income-amount').innerText += tripInfo.agentFees;
    document.querySelector('.agent__trips-taken').innerText += tripInfo.tripsTaken;
  },

  populatePendingTrips(pendingTrips) {
    console.log(pendingTrips)
  }
}

export default agentDom;
