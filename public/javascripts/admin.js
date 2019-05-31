window.onload = () => {
  const movieInputs = document.querySelectorAll('#movie-add input')
  const movieButtons = document.querySelectorAll('#movie-add button')
  const fillFildsButton = movieButtons[1]
  const netflixId = movieInputs[0]


  fillFildsButton.onclick = e => {
    e.preventDefault()

    console.log(netflixId.value)
  }

}