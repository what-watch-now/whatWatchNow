const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");


// Api Detail
router.get("/edit", (req, res, next) => {
  Movie.findOne({ netflixid: req.query.netflix_id })
    .then(theMovie => {
      console.log('respuesta del get', theMovie)

      res.json(theMovie)
    })
    .catch(error => console.log(error));

})


module.exports = router;
