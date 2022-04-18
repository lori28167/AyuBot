var express = require('express')
	, session = require('express-session')
	, app = express()
	, router = express.Router()
	, passport = require('passport');
const food = [{
	foodId: 1,
	name: "Hamburger",
	img: "https://vignette1.wikia.nocookie.net/ronaldmcdonald/images/c/c7/1955_Burger.png/revision/latest?cb=20151206183328",
	price: "Free",
  discount: null
}, {
	foodId: 1,
	name: "Hamburger",
	img: "https://vignette1.wikia.nocookie.net/ronaldmcdonald/images/c/c7/1955_Burger.png/revision/latest?cb=20151206183328",
	price: "Free",
  discount: null
},{
	foodId: 1,
	name: "Hamburger",
	img: "https://vignette1.wikia.nocookie.net/ronaldmcdonald/images/c/c7/1955_Burger.png/revision/latest?cb=20151206183328",
	price: "Free",
  discount: null
}]
router.get("/", (req, res) => {
	//console.log(req.client.user)
	res.render("delivery/index.ejs", {
		req, res, user: req.user, cli: req.client, food, message: req.flash('message')
	})
})

module.exports = router;