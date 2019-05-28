const express = require('express');
const router = express.Router();


function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) return next();
  else res.redirect('/auth/login')
}

function checkAdmin(req, res, next) {

  if (req.user.role == 'admin') return next();
  // else res.redirect('/auth/login')
  else res.render("index", { msg: `Necesitas ser un admin para acceder aquí` })

}


// const checkRoles = (role) => (req, res, next) => req.user.role === role ? next() : res.render("index", { msg: `Necesitas ser un ${role} para acceder aquí` })



/* GET home page */
router.get('/user', ensureAuthenticated, (req, res, next) => {
  res.render('profiles/user');
});

router.get('/admin', ensureAuthenticated, checkAdmin, (req, res, next) => {
  res.render('profiles/admin');
});


module.exports = router;
