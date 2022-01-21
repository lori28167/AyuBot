var express = require('express')
  , session = require('express-session')
  , app = express()
  , router = express.Router()
  , passport = require('passport')
  , Strategy = require('passport-discord').Strategy
  , refresh = require('passport-oauth2-refresh');
const db = require('../db.js')

app.use(express.static("webdash/public"))
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

// Oauth2
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = ['identify'];
var prompt = 'none';

var dcstrat = new Strategy({
  clientID: process.env.id,
  clientSecret: process.env.secret,
  callbackURL: process.env.url,
  scope: scopes,
  prompt: prompt
}, function(accessToken, refreshToken, profile, done) {
  profile.refreshToken = refreshToken;
  process.nextTick(function() {
    return done(null, profile);
  });
});

passport.use(dcstrat);
refresh.use(dcstrat);

app.use(session({
  secret: process.env.secretCookie,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// Router

app.use("/", require('./route/home.js'));
app.use("/auth", require('./route/lib/authRouter.js'));

app.listen(3000);