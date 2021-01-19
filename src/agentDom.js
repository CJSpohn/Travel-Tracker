const agentDom = {
  logInAgent() {
    document.querySelector('.login__wrapper').classList.add('hidden');
    document.querySelector('.agent-wrapper').classList.remove('hidden');
  }
}

export default agentDom;
