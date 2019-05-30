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
    console.log('Esta anhadida la peli??', isAdded)
    // if (!isAdded) {
    //   favouriteImg.setAttribute('class', 'shown')
    //   noFavouriteImg.setAttribute('class', 'unshown')
    // }
    // else {
    //   favouriteImg.setAttribute('class', 'unshown')
    //   noFavouriteImg.setAttribute('class', 'shown')
    // }
  }

  const paintPoo = () => {
    pooPressed = !pooPressed

    if (pooPressed) {
      blackImg.setAttribute('class', 'shown')
      noBlackImg.setAttribute('class', 'unshown')
    }
    else {
      blackImg.setAttribute('class', 'unshown')
      noBlackImg.setAttribute('class', 'shown')
    }
  }

  const paintView = () => {
    viewPressed = !viewPressed

    if (viewPressed) {
      viewImg.setAttribute('class', 'shown')
      noViewImg.setAttribute('class', 'unshown')
    }
    else {
      viewImg.setAttribute('class', 'unshown')
      noViewImg.setAttribute('class', 'shown')
    }
  }
  console.log(addToFavList, addToBlackList, addToViewList)

  // Corazon pulsado
  addToFavList.onclick = (e) => {
    e.preventDefault()
    // console.log(favList, '---------------------------------Lista')

    axios.get(`/update-favouriteList?movieID=${movieID}`)
      .then(response => {
        console.log(response.data)
        // console.log(response.data._movieId)
        // console.log(response.data.favList)
        // if (response.data.msg == 'adding') {
        // if (response.data.favList.includes(response.data._movieId))
        //   paintHeart(true)
        // else
        //   paintHeart(false)
        // }
        paintHeart(true)
      })
  }

  // Poo pulsado
  addToBlackList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-blackList?movieID=${movieID}`)
      .then(res => paintPoo())
  }

  // Ojo pulsado
  addToViewList.onclick = (e) => {
    e.preventDefault()

    axios.get(`/update-viewList?movieID=${movieID}`)
      .then(res => paintView())
  }


}, false);

