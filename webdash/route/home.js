var express = require('express')
  , session = require('express-session')
  , app = express()
  , router = express.Router()
  , passport = require('passport');

router.get("/", (req,res) => {
  if(!req.isAuthenticated()) {
    res.send("Login rn")
  } else {
    res.send(req.user.username)
  }
})

module.exports = router;