const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  netflixid: String,
  title: String,
  image: String,
  synopsis: String,
  rating: String,
  type: String,
  released: String,
  runtime: String,
  largeimage: String,
  unogsdate: String,
  imdbid: String,
  download: String,
  imdbrating: String,
  genre: String
});
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
