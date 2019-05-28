const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User.model");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Login
router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

// Signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  passport.authenticate("local-signup", (err, user, msg) => {
    if (err) {
      next(err);
      return
    }
    if (!user) {
      req.flash("error", msg.message);
      res.redirect("/auth/signup");
      //res.render("auth/signup", {message: msg.message});
      return;
    }
    req.login(user, (err) => {
      if (err) {
        next(err)
      } else {
        res.redirect("/");
      }
    })
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
