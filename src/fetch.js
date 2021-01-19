import domUpdates from './domUpdates';

let apiFetch = {
  confirmStatus(response) {
    if (!response.ok) {
      throw response;
    }
    return response;
  },

  getData(url) {
    return fetch(url)
      .then(res => res.json())
      .catch(err => domUpdates.displayLoadError());
  },

  postData(url, tripInfo) {
    const options = {
      method: "POST",
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(tripInfo)
    }
    return fetch(url, options)
      .then(res => this.confirmStatus(res))
      .then(res => res.json())
  }

}

export default apiFetch;
