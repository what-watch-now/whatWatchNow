// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/wwn', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    // mongoose.disconnect()
  })
  .catch(err => {
    // mongoose.disconnect()
    throw err
  })





// Movies

const Netflix = require('../models/Netflix.model')

const ApiHandler = require('./handler')
const unogsApi = new ApiHandler('https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi')
const SpainCode = 270
const typeMedia = 'movie'
let indexFilm = 0
let currentPage = 1

unogsApi.getFilms(SpainCode, typeMedia, currentPage)
  .then(spanishMovies => createFilms(spanishMovies))
  .catch(error => console.log(error))


const createFilms = spanishMovies => {
  // const numberMovies = spanishMovies.length
  const numberMovies = 5

  // const currentFilm = spanishMovies.type[indexFilm]
  const currentFilm = spanishMovies[indexFilm]
  // console.log(indexFilm)
  // console.log(currentFilm)
  if (currentFilm.type === 'movie' && typeof currentFilm.imdbid) {
    // console.log(currentFilm, '---------------')
    unogsApi.getImdbInfo(currentFilm.imdbid)
      .then(imdbInfo => {
        // console.log(indexFilm, imdbInfo)
        if (imdbInfo) {
          currentFilm.imdbrating = imdbInfo.imdbrating
        }
        else {
          currentFilm.imdbrating = 'N/A'
        }

        console.log(indexFilm)
        console.log(currentFilm, '----------------------------------------')
        movieUpdate(currentFilm)
        indexFilm++
        if (indexFilm < numberMovies) createFilms(spanishMovies)

      })
      .catch(error => console.log(error))


  } else {
    indexFilm++
    // if (indexFilm < spanishMovies.length) return createFilms(spanishMovies)
    if (indexFilm < numberMovies) return createFilms(spanishMovies)
  }

}

const movieUpdate = movie => {
  Netflix.create(movie)
    .then(moviesCreated => {
      console.log(`Creada una pelicula`)
    })
    .catch(err => console.log(`Hubo un error: ${err}`))
}