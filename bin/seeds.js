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
    password: bcusersrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
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

const Movie = require('../models/Movie.model')

const ApiHandler = require('./handler')
const unogsApi = new ApiHandler('https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi')
const SpainCode = 270
const typeMedia = 'movie'
let indexFilmPerPage = 0
let currentPage = 1
let indexFilm = 0

unogsApi.getFilms(SpainCode, typeMedia, currentPage)
  .then(spanishMovies => createFilms(spanishMovies))
  .catch(error => console.log(error))


const createFilms = spanishMovies => {
  // const numberMovies = spanishMovies.length
  const numberMovies = 20

  // const currentFilm = spanishMovies.type[indexFilmPerPage]
  const currentFilm = spanishMovies[indexFilmPerPage]
  // console.log(indexFilmPerPage)
  // console.log(currentFilm)
  if (currentFilm.type === 'movie' && typeof currentFilm.imdbid) {
    // console.log(currentFilm, '---------------')
    unogsApi.getImdbInfo(currentFilm.imdbid)
      .then(imdbInfo => {
        // console.log(indexFilmPerPage, imdbInfo)
        if (imdbInfo) {
          currentFilm.imdbrating = imdbInfo.imdbrating
          currentFilm.genre = imdbInfo.genre
        }
        else {
          currentFilm.imdbrating = 'N/A'
        }

        console.log(indexFilmPerPage, '----------------------------------------')
        console.log(currentFilm)
        movieUpdate(currentFilm)

        if (indexFilmPerPage == 99) {
          currentPage++
          indexFilmPerPage = -1
        }

        indexFilmPerPage++
        indexFilm++

        if (indexFilm < numberMovies) {
          createFilms(spanishMovies)
        }

      })
      .catch(error => console.log(error))


  } else {

    console.log(indexFilmPerPage, '----------------------------------------')
    console.log('Esto es una Serie')

    if (indexFilmPerPage == 99) {
      currentPage++
      indexFilmPerPage = -1
    }

    indexFilmPerPage++
    indexFilm++

    // if (indexFilmPerPage < spanishMovies.length) return createFilms(spanishMovies)
    if (indexFilm < numberMovies) return createFilms(spanishMovies)
  }

}

const movieUpdate = movie => {
  Movie.create(movie)
    .then(moviesCreated => {
      console.log(`Creada una pelicula`)
    })
    .catch(err => console.log(`Hubo un error: ${err}`))
}