let apiFetch = {
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
      .then(res => res.json())
      .catch(err => console.log(err))
  }

}

export default apiFetch;
