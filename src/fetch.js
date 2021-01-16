let apiFetch = {
  getData(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err))
  }

}

export default apiFetch;
