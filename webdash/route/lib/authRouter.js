var express = require('express')
  , session = require('express-session')
  , app = express()
  , router = express.Router()
  , passport = require('passport')
  , Strategy = require('passport-discord').Strategy
  , refresh = require('passport-oauth2-refresh');
router.get("/login", passport.authenticate('discord', {prompt:"none"}), function(req, res, next) {

});
router.get('/callback', function(req, res,next) {
    passport.authenticate('discord', function(err, user, info) {
      // This is the default destination upon successful login.
      var redirectUrl = '/';

      if (!user) { return res.redirect('/'); }
      if (req.session.redirectUrl) {
        redirectUrl = req.session.redirectUrl;
        req.session.redirectUrl = null;
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
      });
			
      res.redirect(redirectUrl);
    })(req, res, next);
  } // auth success
);
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;