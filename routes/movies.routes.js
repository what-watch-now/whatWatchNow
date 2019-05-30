const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie.model')


// Movies list
router.get('/list', (req, res, next) => {
  Movie.find({ genre: { $regex: req.query.genre } })
    .then(MoviesByGenre => {
      // console.log(MoviesByGenre)
      res.render('movies/movies-list', { movies: MoviesByGenre })
    })
    .catch(error => console.log(error))
})

// Movie Detail
router.get('/detail', (req, res, next) => {
  Movie.findOne({ netflixid: req.query.netflix_id })
    .then(theMovie => {
      let filmAdded = false
      if (req.user.favList.includes(theMovie._id))
        filmAdded = true

      res.render('movies/movie-detail', {
        user: req.user,
        movie: theMovie,
        movieJSON: JSON.stringify(theMovie),

        filmAdded
      })
    })
    .catch(error => console.log(error))
})


module.exports = router;