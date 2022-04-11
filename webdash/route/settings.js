var express = require('express')
	, session = require('express-session')
	, app = express()
	, router = express.Router()
	, passport = require('passport');


router.get("/account", (req, res) => {
	res.render("dashboard/settings.ejs", {
		req, res, user: req.user, cli: req.client
	})
})

router.post("/account/delete", (req,res) => {
	req.db.user.findOneAndDelete({_id: req.user.id}, function(e,d) {
		// if(!d) return res.redirect("/settings/account");
		if(e) return console.log(e);
		// req.client.users.cache.get(req.user.id).send(`Você acabou de deletar sua conta na Ayu\nObrigada por usar o bot :)`).then(m => {}).catch(e => console.log(e));
		req.logout();
    res.redirect('/');
	})
})


module.exports = router;