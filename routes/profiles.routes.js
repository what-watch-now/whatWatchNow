const express = require('express');
const passport = require("passport");
const router = express.Router();
const app = express();
const User = require("../models/User.model");
const Movie = require("../models/Movie.model")



function ensureAuthenticated(req, res, next) {
  // console.log(req.user)
  if (req.isAuthenticated()) return next();
  else res.redirect('/auth/login')
}

function checkAdmin(req, res, next) {
  if (req.user.role == 'admin') return next();
  // else res.redirect('/auth/login')
  else res.render("index", { msg: `Necesitas ser un admin para acceder aquí` })
}



// User profile
router.get('/user', ensureAuthenticated, (req, res, next) => {

  User.findById(req.user._id)
    .populate('favList')
    .then(user => {
      res.render('profiles/user', user);
    })
})

// Admin profile
router.get('/admin', [ensureAuthenticated, checkAdmin], (req, res, next) => {
  res.render('profiles/admin');
})



// update favourites
router.get('/update-favourite', (req, res, next) => {

  Movie.findOne({ netflixid: req.query.movieID })
    .then(theMovie => {

      if (!req.user.favList.includes(theMovie._id)) {
        console.log('Guardando favorito')
        User.findByIdAndUpdate({ _id: req.user._id }, { $push: { favList: theMovie._id } }, { new: true })
          .then(userUpdated => {
            console.log(userUpdated)
            // TODO: Preguntar a Gabi wtf es esto.
            res.json({ msg: 'OK' })
          })
          .catch(error => console.log(error))

      } else {
        console.log('Borrando favorito')
        User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { favList: theMovie._id } }, { new: true })
          .then(userUpdated => {
            console.log(userUpdated)
            // TODO: Preguntar a Gabi wtf es esto.
            res.json({ msg: 'OK' })
          })
          .catch(error => console.log(error))
      }
    })

    .catch(error => console.log(error))
})





module.exports = router;
