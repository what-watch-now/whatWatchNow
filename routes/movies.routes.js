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
      let favouriteAdded = false
      let blackAdded = false
      let viewAdded = false

      if (req.user.favList.includes(theMovie._id))
        favouriteAdded = true
      if (req.user.blackList.includes(theMovie._id))
        blackAdded = true
      if (req.user.viewList.includes(theMovie._id))
        viewAdded = true


      res.render('movies/movie-detail', {
        user: req.user,
        movie: theMovie,
        // movieJSON: JSON.stringify(theMovie),
        favouriteAdded,
        blackAdded,
        viewAdded
      })
    })
    .catch(error => console.log(error))
})


module.exports = router;