let domUpdates = {
  greetUser(user) {
    document.querySelector('.js-welcome').innerText += ' ' + user.name.split(' ')[0]
  },

  populateUserInfo(user, trips) {
    const userTrips = user.findUserTrips(trips)
  }
}

export default domUpdates;
