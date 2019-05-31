const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => {
  const rand = Math.floor(Math.random() * 2412);
  Movie.find()
    .limit(18)
    .skip(rand)

    .then(randomMovies => {
      console.log(randomMovies);
      res.render("index", { randomMovies });
    });
});

module.exports = router;
