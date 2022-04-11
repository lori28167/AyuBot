var express = require('express')
	, session = require('express-session')
	, app = express()
	, router = express.Router()
	, passport = require('passport');

router.get("/", (req, res) => {
	//console.log(req.client.user)
	res.render("index.ejs", {
		req, res, user: req.user, cli: req.client, message: req.flash('message')
	})
})

module.exports = router;