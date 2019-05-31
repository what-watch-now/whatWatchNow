// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
require("dotenv").config()

const bcryptSalt = 10;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

    // const Movie = require('../models/Movie.model')

    // const ApiHandler = require('./handler')
    // const unogsApi = new ApiHandler('https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi')
    // const SpainCode = 270
    // const typeMedia = 'movie'
    // let indexFilmPerPage = 0
    // let currentPage = 0
    // let indexFilm = 0
    // let lastPage = false


    // const createFilms = (currentPage) => {
    //   return unogsApi.getFilms(SpainCode, typeMedia, currentPage)
    //     .then(spanishMovies => spanishMovies)
    //     .catch(error => console.log(error))
    // }

    // const getImdbInformation = imdbId => {
    //   return unogsApi.getImdbInfo(imdbId)
    //     .then(imdbInfo => imdbInfo)
    //     .catch(error => console.log(error))
    // }

    // const getLargeImage = (netflixId) => {
    //   return unogsApi.getImages(netflixId)
    //     .then(image => image)
    //     .catch(error => console.log(error))
    // }

    // const movieUpdate = movie => {
    //   return Movie.create(movie)
    //     .then(moviesCreated => {
    //       console.log(`Creada una pelicula`)
    //     })
    //     .catch(err => console.log(`Hubo un error: ${err}`))
    // }



    // // const numberMovies = 10
    // const recursiveFunction = spanishMovies => {

    //   const numberMovies = spanishMovies.length
    //   console.log(indexFilmPerPage)
    //   const currentFilm = spanishMovies[indexFilmPerPage]

    //   // Es pelicula
    //   if (currentFilm.type === 'movie' && currentFilm.imdbid) {

    //     console.log(indexFilmPerPage, 'Pelicula----------------------------------------')

    //     getImdbInformation(currentFilm.imdbid)
    //       // unogsApi.getImdbInfo(currentFilm.imdbid)
    //       .then(imdbInfo => {
    //         if (imdbInfo) {
    //           currentFilm.imdbrating = imdbInfo.imdbrating
    //           currentFilm.genre = imdbInfo.genre
    //         }
    //         else currentFilm.imdbrating = 'N/A'

    //         // Busqueda Imagen large
    //         getLargeImage(currentFilm.netflixid)
    //           .then(largeImage => {

    //             if (largeImage) currentFilm.largeimage = largeImage

    //             // Introducir pelicula en base de datos
    //             movieUpdate(currentFilm)
    //               .then(() => {

    //                 // Peli actual < 100
    //                 if (indexFilmPerPage < numberMovies) {
    //                   indexFilmPerPage++
    //                   indexFilm++

    //                   // Ultima pelicula
    //                   if (indexFilmPerPage == 100) {

    //                     if (lastPage) {
    //                       mongoose.connection.close()
    //                       return
    //                     }

    //                     indexFilmPerPage = 0
    //                     currentPage++

    //                     createFilms(currentPage)
    //                       .then(spanishMovies => {
    //                         // Paquete de pelis = 100
    //                         if (spanishMovies.length == 100) {
    //                           recursiveFunction(spanishMovies)
    //                           // Paquete de pelis = 0
    //                         } else if (spanishMovies.length == 0) {
    //                           mongoose.connection.close()
    //                           return
    //                           // Paquete de pelis < 100 => ultimo paquete
    //                         } else {
    //                           lastPage = true
    //                           recursiveFunction(spanishMovies)
    //                         }
    //                       })
    //                       .catch(error => console.log(error))
    //                   }

    //                   // NO ultima pelicula
    //                   else {
    //                     recursiveFunction(spanishMovies)
    //                   }
    //                 }
    //               })
    //           })
    //           .catch(error => console.log(error))
    //       })
    //       .catch(error => console.log(error))
    //   }

    //   // Es serie
    //   else {

    //     console.log(indexFilmPerPage, 'Serie----------------------------------------')

    //     if (indexFilmPerPage < numberMovies - 1) {

    //       indexFilmPerPage++
    //       indexFilm++
    //       recursiveFunction(spanishMovies)

    //     } else {

    //       if (lastPage) {
    //         mongoose.connection.close()
    //         return
    //       }

    //       indexFilmPerPage = 0
    //       indexFilm++
    //       currentPage++
    //       // Traer nuevas peliculas
    //       createFilms(currentPage)
    //         .then(spanishMovies => {
    //           if (spanishMovies.length == 100) {
    //             recursiveFunction(spanishMovies)
    //           } else if (spanishMovies.length == 0) {
    //             mongoose.connection.close()
    //             return
    //           } else {
    //             lastPage = true
    //             recursiveFunction(spanishMovies)
    //           }

    //         })
    //         .catch(error => console.log(error))
    //     }

    //   }
    // }

    // // Crear peliculas
    // createFilms(currentPage)
    //   .then(spanishMovies => {
    //     if (spanishMovies.length == 100)
    //       recursiveFunction(spanishMovies)
    //   })
    //   .catch(error => console.log(error))






    // Users

    let users = [
      {
        username: "alice",
        password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
        role: 'user',
        favList: [],
        blackList: [],
        viewList: []
      },
      {
        username: "admin",
        password: bcrypt.hashSync("admin", bcrypt.genSaltSync(bcryptSalt)),
        role: 'admin',
        favList: [],
        blackList: [],
        viewList: []
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
        mongoose.disconnect()
      })
      .catch(err => {
        mongoose.disconnect()
        throw err
      })



  })  // End Mongoose
  .catch(err => console.error('Error connecting to mongo', err))








