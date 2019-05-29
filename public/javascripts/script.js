document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  const addToFavList = document.getElementById("fav-button")
  const addToBlackList = document.getElementById("black-button")
  const addToViewList = document.getElementById("view-button")

  let heartPressed = false

  // Corazon pulsado
  addToFavList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-favourite?movieID=${movieID}`)
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

  }

  addToViewList.onclick = (e) => {
    e.preventDefault()


  }



}, false);

