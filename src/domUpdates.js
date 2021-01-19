let domUpdates = {
  displayLoadError() {
    document.querySelector('.js-welcome').innerText =
    `Something went wrong. Your remote server probably isn\'t started.
    Check the readme for more information.`
  },

  showSignIn() {
    document.querySelector('.login__form').classList.remove('hidden');
  },

  displayLogInError() {
    document.querySelector('.login__error').innerText = 'Invalid username or password';
  },

  logInUser() {
    document.querySelector('.login__wrapper').classList.add('hidden');
    document.querySelector('.user-wrapper').classList.remove('hidden');
  },

  greetUser(user) {
    document.querySelector('.js-welcome').innerText += ' ' + user.name.split(' ')[0]
  },

  addPendingTrip(trip, destinations, expired) {
    this.hidePendingHeader();
    let tripDestination = destinations.find(destination => destination.id === trip.destinationID);
    const template = document.querySelector('.pending-trips__trip').content;
    template.querySelector('.pending-trip__destination').textContent = tripDestination.destination;
    template.querySelector('.pending-trip__date').textContent = trip.date;
    template.querySelector('.pending-trip__travelers').textContent = trip.travelers;
    template.querySelector('.pending-trip__duration').textContent = trip.duration;
    const status = template.querySelector('.pending-trip__status');
    expired ? status.textContent = 'This request has expired.' : status.textContent = trip.status;
    this.addStatusClassList(trip, status);
    document.querySelector('.pending-trips__wrapper').appendChild(
      document.importNode(template, true));
  },

  addStatusClassList(trip, status) {
    if (trip.status === 'pending') {
      status.classList.add('pending');
      status.classList.remove('approved');
    } else {
      status.classList.add('approved');
      status.classList.remove('pending');
    }
  },

  addPastTrip(trip, destinations) {
    let tripDestination = destinations.find(destination => destination.id === trip.destinationID);
    const template = document.querySelector('.past-trips__trip').content;
    template.querySelector('.past-trips__destination').textContent = tripDestination.destination;
    template.querySelector('.past-trips__date').textContent = trip.date;
    const image = template.querySelector('.past-trips__image');
    image.src = tripDestination.image;
    image.alt = tripDestination.alt;
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

  populateExpenditures(user, destinations) {
    const expenses = user.getTripCostsForCalendarYear(destinations);
    document.querySelector('.trips-taken').innerText += ` ${expenses.tripsTaken}`;
    document.querySelector('.trips-cost').innerText += expenses.tripCosts;
    document.querySelector('.trips-fees').innerText += expenses.agentFees;
    document.querySelector('.trips-total').innerText += expenses.totalSpent;
  },

  setStartDate() {
    const calendar = document.querySelector('.start-date')
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }
    today = year + '-' + month + '-' + day;
    calendar.setAttribute("min", today);
  },

  updateCost(cost) {
    const costDisplay = document.querySelector('.input__cost-display');
    costDisplay.innerText = `$${cost}`
  },

  clearTripForm() {
    document.querySelector('.form__list').value = ''
    document.querySelector('.start-date').value = '';
    document.querySelector('.travelers').value = '';
    document.querySelector('.duration').value = '';
    this.hideConfirmScreen();
    this.revealCalculateButton();
  },

  displayPostError() {
    document.querySelector('.main-error-text').classList.remove('hidden');
    setTimeout(() => {
      document.querySelector('.main-error-text').classList.add('hidden');
    }, 5000);
  },

  displayPostSuccess() {
    document.querySelector('.main-success-text').classList.remove('hidden');
    setTimeout(() => {
      document.querySelector('.main-success-text').classList.add('hidden');
    }, 5000);
  },

  revealCostDisplay(cost) {
    this.hideCalculateButton();
    this.revealConfirmScreen();
    this.updateCost(cost)
  },

  revealFormError() {
    document.querySelector('.form__error').classList.remove('hidden');
  },

  hideFormError() {
    document.querySelector('.form__error').classList.add('hidden');
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
  },

}

export default domUpdates;
