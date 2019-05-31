document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  const addToFavList = document.getElementById("fav-button")
  const addToBlackList = document.getElementById("black-button")
  const addToViewList = document.getElementById("view-button")

  const favouriteImg = document.getElementById("favourite-img")
  const noFavouriteImg = document.getElementById("no-favourite-img")
  const blackImg = document.getElementById("black-img")
  const noBlackImg = document.getElementById("no-black-img")
  const viewImg = document.getElementById("view-img")
  const noViewImg = document.getElementById("no-view-img")

  let heartPressed = false
  let pooPressed = false
  let viewPressed = false


  const paintHeart = (isAdded) => {
    if (isAdded) {
      favouriteImg.setAttribute('class', 'shown')
      noFavouriteImg.setAttribute('class', 'unshown')
    }
    else {
      favouriteImg.setAttribute('class', 'unshown')
      noFavouriteImg.setAttribute('class', 'shown')
    }
  }

  const paintPoo = (isAdded) => {
    if (isAdded) {
      blackImg.setAttribute('class', 'shown')
      noBlackImg.setAttribute('class', 'unshown')
    }
    else {
      blackImg.setAttribute('class', 'unshown')
      noBlackImg.setAttribute('class', 'shown')
    }
  }

  const paintView = (isAdded) => {
    if (isAdded) {
      viewImg.setAttribute('class', 'shown')
      noViewImg.setAttribute('class', 'unshown')
    }
    else {
      viewImg.setAttribute('class', 'unshown')
      noViewImg.setAttribute('class', 'shown')
    }
  }

  // Para que este actualizado cuando se recargue
  paintHeart(favouriteAdded)
  paintPoo(blackAdded)
  paintView(viewAdded)


  // Corazon pulsado
  addToFavList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-favouriteList?movieID=${movieID}`)
      .then(response => paintHeart(response.data.favourite))
  }


  // Poo pulsado
  addToBlackList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-blackList?movieID=${movieID}`)
      .then(response => paintPoo(response.data.black))
  }

  // Ojo pulsado
  addToViewList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-viewList?movieID=${movieID}`)
      .then(response => paintView(response.data.view))
  }

}, false);

