const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => {
  const rand = Math.floor(Math.random() * 4);
  Movie.find()
    .limit(3)
    .skip(rand)

    .then(randomMovies => {
      console.log(randomMovies);
      res.render("index", { randomMovies });
    });
});

module.exports = router;
