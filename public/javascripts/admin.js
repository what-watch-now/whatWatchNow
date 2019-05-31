window.onload = () => {
  const movieInputs = document.querySelectorAll('.admin-movie-add input')
  const movieButtons = document.querySelectorAll('.admin-movie-add button')
  const fillFildsButton = movieButtons[1]
  const editButton = movieButtons[2]
  const netflixId = movieInputs[0]


  // Fill

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


  // Edit

  // editButton.onclick = e => {

  //   // e.preventDefault()
  //   const netflix_id = movieInputs[0].value
  //   const title = movieInputs[1].value
  //   const image = movieInputs[2].value
  //   const synopsis = movieInputs[3].value
  //   const genre = movieInputs[4].value
  //   const type = movieInputs[5].value
  //   const released = movieInputs[6].value
  //   const largimage = movieInputs[7].value
  //   const unogsdate = movieInputs[8].value
  //   const imdbid = movieInputs[9].value
  //   const download = movieInputs[10].value
  //   const imdbrating = movieInputs[11].value
  //   console.log('el titulo es', title)

  //   return axios.get(`/edit?netflix_id=${netflix_id}&title=${title}&image=${image}&syponpis=${synopsis}&genre=${genre}&type=${type}&released=${released}&largimage=${largimage}&unogsdate=${unogsdate}&imdbid=${imdbid}&download=${download}&imdbrating=${imdbrating}`)
  //     .then(response => {
  //       response.data
  //     })

  //     .catch(error => console.log(error));
  // }





}