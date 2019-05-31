window.onload = () => {
  const movieInputs = document.querySelectorAll('.admin-movie-add input')
  const movieButtons = document.querySelectorAll('.admin-movie-add button')
  const createMovie = movieButtons[0]
  const fillFildsButton = movieButtons[1]
  const editButton = movieButtons[2]
  const netflixId = movieInputs[0]


  // Fill fields
  fillFildsButton.onclick = e => {
    e.preventDefault()

    axios.get(`/admin/edit?netflix_id=${netflixId.value}`)
      .then(response => {
        movieInputs[1].value = response.data.title
        movieInputs[2].value = response.data.image
        movieInputs[3].value = response.data.synopsis
        movieInputs[4].value = response.data.genre
        movieInputs[5].value = response.data.type
        movieInputs[6].value = response.data.released
        movieInputs[7].value = response.data.largimage
        movieInputs[8].value = response.data.unogsdate
        movieInputs[9].value = response.data.imdbid
        movieInputs[10].value = response.data.download
        movieInputs[11].value = response.data.imdbrating
      })
      .catch(error => console.log(error));
  }

}