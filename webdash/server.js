var express = require('express')
  , session = require('express-session')
  , router = express.Router()
  , app = express()
  , passport = require('passport')
  , Strategy = require('passport-discord').Strategy
  , refresh = require('passport-oauth2-refresh');
const db = require('../db.js')
const { Client, Collection, Intents } = require('discord.js');
// const { token } = require('./config/config');
var intents = new Intents([Intents.FLAGS.GUILDS])
const client = new Client({ intents });
client.login(process.env.token);

app.use(function(req, res, next) {
  req.client = client;
  req.db = db;
  next();
})
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

var scopes = ['identify', 'guilds'];
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

/*
cookie: {
        maxAge: 60000 * 60 * 24
            },
}
*/
app.use(session({
  secret: process.env.secretCookie,
  resave: true,
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Router
app.use("/", require('./route/home.js'));
app.use("/dashboard", isAuth, require('./route/dashboard.js'));
app.use("/auth", require('./route/lib/authRouter.js'));
app.use(function(req,res) {
  res.send(404)
  res.render("lib/errors/404.ejs",{
       req,res, user: req.user, cli:req.client
  })
})
app.use(function(req,res) {
  res.send(500)
  res.render("lib/errors/500.ejs",{
       req,res, user: req.user, cli:req.client
  })
})

function isAuth(req,res,next) {
 if(req.isAuthenticated()) return next();
 req.session.redirectUrl = req.originalUrl;
 //req.session.redirectTo = req.originalUrl;
 res.redirect("/auth/login");
}

app.listen(3000);