let domUpdates = {
  greetUser(user) {
    document.querySelector('.js-welcome').innerText += ' ' + user.name.split(' ')[0]
  },

  addPendingTrip(trip, destinations) {
    let tripDestination = destinations.find(destination => destination.id === trip.destinationID);
    const template = document.querySelector('.pending-trips__trip').content;
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

  addPastTrip(trip, destinations) {
    let tripDestination = destinations.find(destination => destination.id === trip.destinationID);
    const template = document.querySelector('.past-trips__trip').content;
    const destination = template.querySelector('.past-trips__destination');
    const date = template.querySelector('.past-trips__date');
    const image = template.querySelector('.past-trips__image');
    destination.textContent = tripDestination.destination;
    date.textContent = trip.date;
    image.src = tripDestination.image;
    document.querySelector('.past-trips__wrapper').appendChild(
      document.importNode(template, true));
  },

  populateDestinations(destinations) {
    const list = document.querySelector('.form__list');
    destinations.forEach(destination => {
      list.innerHTML += `
      <option class="form__list-element" value="${destination.destination}">${destination.destination}</option>
      `
    })
  },

  setStartDate() {
    const calendar = document.querySelector('.start-date')
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd='0'+dd
    }
    if(mm < 10 ) {
      mm='0'+mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    calendar.setAttribute("min", today);
  },

  updateCost(cost) {
    const costDisplay = document.querySelector('.input__cost-display');
    costDisplay.innerText = `$${cost}`
  },

  revealCostDisplay(cost) {
    this.hideCalculateButton();
    this.revealConfirmScreen();
    this.updateCost(cost)
  },

  revealConfirmScreen() {
    document.querySelector('.form__cost-wrapper').classList.remove('hidden');
  },

  hideConfirmScreen() {
    document.querySelector('.form__cost-wrapper').classList.add('hidden');
  },

  hideCalculateButton() {
    document.querySelector('.input__cost-button').classList.add('hidden');
  },

  revealCalculateButton() {
    document.querySelector('.input__cost-button').classList.remove('hidden');
  },

  hidePendingHeader() {
    document.querySelector('.pending-trips__header').classList.add('hidden')
  },

  hidePastHeader() {
    document.querySelector('.past-trips__header').classList.add('hidden')
  }

}

export default domUpdates;
