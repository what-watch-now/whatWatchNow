require("dotenv").config()

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("./config/mongoose.config");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

const passport = require('passport');
const User = require('./models/User.model');
const LocalStrategy = require('passport-local').Strategy;





const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

hbs.registerHelper("ifUndefined", (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});


// default value for title local
app.locals.title = "template of irongenerator";




// Enable authentication using session + passport
app.use(
  session({
    secret: "peliculita y manta",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
require("./passport")(app);




// function ensureAuthenticated(req, res, next) {
//   // console.log(req.user)
//   if (req.isAuthenticated()) return next();
//   else res.redirect('/auth/login')
// }

function checkRoles(user) {
  if (user && user.role == 'user') return 'user'
  else if (user && user.role == 'admin') return 'admin'
  else return 'noLog'
}


hbs.registerHelper('if_eq', function (a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
})


app.use((req, res, next) => {
  // console.log(req.user)
  console.log(checkRoles(req.user))
  app.locals.thisUser = { userLoged: checkRoles(req.user) }
  next();
})




const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const movies = require("./routes/movies.routes");
app.use("/", movies);

const profiles = require("./routes/profiles.routes")
app.use("/", profiles)

const api = require("./routes/api.routes")
app.use("/admin", api)


module.exports = app;
