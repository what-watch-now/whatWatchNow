const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const netflixSchema = new Schema({
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
  imdbrating: String
});
const Netflix = mongoose.model("Netflix", netflixSchema);
module.exports = Netflix;
