let domUpdates = {
  greetUser(user) {
    document.querySelector('.js-welcome').innerText += ' ' + user.name.split(' ')[0]
  },

  addPendingTrip(trip) {
    console.log(trip)
  }

}

export default domUpdates;
