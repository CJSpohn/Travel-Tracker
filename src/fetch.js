let apiFetch = {
  confirmStatus(response) {
    if (!response.ok) {
      throw 'Looks like you already booked this trip!';
    }
    return response;
  },

  getData(url) {
    return fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
  },

  postData(url, tripInfo) {
    const options = {
      method: "POST",
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(tripInfo)
    }
    return fetch(url, options)
      .then(response => this.confirmStatus(response))
      .then(res => res.json())
      .catch(err => console.log(err))
  }

}

export default apiFetch;
