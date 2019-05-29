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
      // console.log(theMovie)
      res.render('movies/movie-detail', { movie: theMovie })
    })
    .catch(error => console.log(error))
})


module.exports = router;