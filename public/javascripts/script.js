document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  const addToFavList = document.getElementById("fav-button")
  const addToBlackList = document.getElementById("black-button")
  const addToViewList = document.getElementById("view-button")

  let heartPressed = false
  let pooPressed = false
  let viewPressed = false

  // Corazon pulsado
  addToFavList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-favouriteList?movieID=${movieID}`)
      .then(res => {
        heartPressed = !heartPressed

        if (heartPressed) {
          // pintar corazon de rojo
        }
        else {
          // despintar corazon
        }
      })
  }

  // Poo pulsado
  addToBlackList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-blackList?movieID=${movieID}`)
      .then(res => {
        pooPressed = !pooPressed

        if (pooPressed) {
          // pintar poo
        }
        else {
          // despintar poo
        }
      })
  }

  // Ojo pulsado
  addToViewList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-viewList?movieID=${movieID}`)
      .then(res => {
        viewPressed = !viewPressed

        if (viewPressed) {
          // pintar ojo
        }
        else {
          // despintar ojo
        }
      })
  }


}, false);

