let domUpdates = {
  greetUser(user) {
    document.querySelector('.js-welcome').innerText += ' ' + user.name.split(' ')[0]
  }
}

export default domUpdates;
