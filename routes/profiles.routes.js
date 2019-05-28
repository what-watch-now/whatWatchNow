const express = require('express');
const passport = require("passport");
const router = express.Router();
const app = express();
const User = require("../models/User.model");



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


// function checkRoles(req, res, next) {
//   if (req.User && req.user.role == 'user') return 'user'
//   else if (req.user && req.user.role == 'admin') return 'admin'
//   else return
// }


// app.use((req, res, next) => {
//   app.locals.userLoged = { userLoged: checkRoles(req, res, next) }
//   console.log(checkRoles(req, res, next))
//   next();
// })




/* GET home page */
router.get('/user', ensureAuthenticated, (req, res, next) => {
  res.render('profiles/user');
});

router.get('/admin', [ensureAuthenticated, checkAdmin], (req, res, next) => {
  res.render('profiles/admin');
});


module.exports = router;
