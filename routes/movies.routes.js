const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");

// Movies list
router.get("/list", (req, res, next) => {
  Movie.find({ genre: { $regex: req.query.genre } })
    .where({ "imdbrating": { "$ne": "N/A" } })
    .sort({ 'imdbrating': -1 }).limit(100)

    .then(MoviesByGenre => res.render('movies/movies-list', { movies: MoviesByGenre }))
    .catch(error => console.log(error))
})



// Movie Detail
router.get("/detail", (req, res, next) => {
  Movie.findOne({ netflixid: req.query.netflix_id })
    .then(theMovie => {
      let favouriteAdded = false;
      let blackAdded = false;
      let viewAdded = false;

      if (req.user) {
        if (req.user.favList.includes(theMovie._id))
          favouriteAdded = true
        if (req.user.blackList.includes(theMovie._id))
          blackAdded = true
        if (req.user.viewList.includes(theMovie._id))
          viewAdded = true
      }

      res.render("movies/movie-detail", {
        user: req.user,
        movie: theMovie,
        // movieJSON: JSON.stringify(theMovie),
        favouriteAdded,
        blackAdded,
        viewAdded
      });
    })
    .catch(error => console.log(error));
});



// Update 
router.post("/edit", (req, res, next) => {

  console.log('-----------------------------------------')
  const { netflixid, title, image, synopsis, genre, type, released, largeimage, unogsdate, imdbid, download, imdbrating } = req.body
  console.log(download)

  Movie.findOneAndUpdate({ netflixid: req.query.netflix_id },
    // { $set: { netflixid: req.query.netflix_id, title: req.query.title, image: req.query.image, synopsis: req.query.synopsis, genre: req.query.genre, type: req.query.type, released: req.query.released, largimage: req.query.largimage, unogsdate: req.query.unogsdate, imdbid: req.query.imdbid, download: req.query.download, imdbrating: req.query.imdbrating } },
    { $set: { netflixid, title, image, synopsis, genre, type, released, largeimage, unogsdate, imdbid, download, imdbrating } },
    { new: true })
    .then(movieUpdated => {
      console.log(req.query.netflix_id)
      res.redirect(`/detail?netflix_id=${netflixid}`)
    })
    .catch(error => console.log(error));

})



module.exports = router;
