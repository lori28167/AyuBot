var express = require('express')
  , session = require('express-session')
  , app = express()
  , router = express.Router()
  , passport = require('passport')
  , Strategy = require('passport-discord').Strategy
  , refresh = require('passport-oauth2-refresh');
  
router.get("/login", passport.authenticate('discord'));
router.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/') } // auth success
);
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;