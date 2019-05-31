window.onload = () => {
  const movieInputs = document.querySelectorAll('.admin-movie-add input')
  const movieButtons = document.querySelectorAll('.admin-movie-add button')
  const fillFildsButton = movieButtons[1]
  const netflixId = movieInputs[0]


  fillFildsButton.onclick = e => {
    e.preventDefault()

    axios.get(`/admin/edit?netflix_id=${netflixId.value}`)
      .then(response => {
        movieInputs[1].value = response.data.title
        movieInputs[2].value = response.data.image
        movieInputs[3].value = response.data.synopsis
        // movieInputs[4].value = response.data.rating
        movieInputs[4].value = response.data.type
        movieInputs[5].value = response.data.released
        movieInputs[6].value = response.data.largimage
        movieInputs[7].value = response.data.unogsdate
        movieInputs[8].value = response.data.imdbid
        movieInputs[9].value = response.data.download
        movieInputs[10].value = response.data.imdbrating
      })
  }

}