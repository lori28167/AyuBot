var express = require('express')
  , session = require('express-session')
  , app = express()
  , router = express.Router()
  , passport = require('passport');
  
router.get("/", (req,res) => {
  console.log(req.client.user)
 res.render("dashboard/index.ejs", {
   req,res, user: req.user, cli:req.client
 })
})

router.get("/guild/:id", (req,res) => {
  res.render("dashboard/guild.ejs", {
    req,res, user: req.user, cli:req.client
  })
})

module.exports = router;