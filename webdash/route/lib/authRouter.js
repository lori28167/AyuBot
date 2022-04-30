var express = require('express')
	, session = require('express-session')
	, app = express()
	, router = express.Router()
	, passport = require('passport')
	, Strategy = require('passport-discord').Strategy
	, refresh = require('passport-oauth2-refresh');




router.get("/login", passport.authenticate('discord', { prompt: "consent" }), function(req, res, next) {
	// if (req.isAuthenticated()) return next();

});
router.get("/login/bot", function(req, res) {
	passport.authenticate('discord', { disable_guild_select: true, guild_id: req.query.guild_id, scope: ["identify", "guilds", "bot"] })

	res.redirect("https://discord.com/api/oauth2/authorize?client_id=699016235228201010&permissions=8&redirect_uri=https%3A%2F%2Fayubot.tech%2Fauth%2Fcallback&response_type=code&scope=bot%20identify%20guilds&guild_id="+req.query.guild_id)
});
router.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), function(req, res, next) {
	var redirectTo = '/dashboard';
	if (req.session.reqUrl) {
		redirectTo = req.session.reqUrl;
		req.session.reqUrl = null;
	};
	res.redirect(redirectTo)
} // auth success
);
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


module.exports = router;