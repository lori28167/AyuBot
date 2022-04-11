var express = require('express')
	, session = require('express-session')
	, app = express()
	, router = express.Router()
	, passport = require('passport');
const hcaptcha = require('express-hcaptcha');
const { Permissions } = require('discord.js')
router.get("/", async (req, res) => {
	console.log(!req.user.guilds.filter(e => e.permissions === 2147483647))
	var guild = [];
	res.render("dashboard/index.ejs", {
		req, res, user: req.user, cli: req.client, perms: Permissions, guild, message: req.flash('message')
	})
})

router.get("/guild/:id", async (req, res) => {
	if (req.client.guilds.cache.get(req.params.id)) {
		const guild = await req.db.guild.findOne({ _id: req.params.id });

		res.render("dashboard/guild.ejs", {
			req, res, user: req.user, message: req.flash('message'), cli: req.client, guild, hctoken: process.env.hcaptcha, perms: Permissions
		})
	} else {
		res.redirect(`https://discord.com/api/oauth2/authorize?client_id=699016235228201010&permissions=1099512146022&redirect_uri=https%3A%2F%2Fayubot.tech%2Fauth%2Fcallback&response_type=code&scope=bot%20identify%20guilds%20applications.commands&guild_id=${req.params.id}&disable_guild_select=true`)
	}
})

router.post("/guild/:id/settings", async (req, res, next) => {
	console.log(req.hcaptcha)
	const guild = await req.db.guild.findOne({ _id: req.params.id });
	guild.bio = req.body.bio;
	guild.save()
	req.flash("message", "Configuração salva!");
	res.redirect(".")

})
router.get("/guild/:id/refresh-data", async (req, res) => {
	const client = req.client;
	const guild = await req.db.guild.findOne({ _id: req.params.id });
	guild.name = client.guilds.cache.get(req.params.id).name;
	guild.icon = client.guilds.cache.get(req.params.id).icon ? client.guilds.cache.get(req.params.id).iconURL({ size: 4096 }) : "https://cdn.discordapp.com/embed/avatars/0.png?size=4096";
	guild.save()

	req.flash("message", "Dados atualizado!");
	res.redirect(".")
})
router.get("/guild/:id/delete", async (req, res) => {
	const client = req.client;
	const guild = await req.db.guild.findOneAndDelete({ _id: req.params.id });

	req.flash("message", "Servidor excluido");
	res.redirect("/dashboard")
})
router.get("/settings", function(req, res) {
	res.render("dashboard/settings.ejs", {
		req, res, user: req.user, cli: req.client
	})
})
/*router.post("/guild/:id/welcome", async function(req,res) {
	const client = req.client;
	const guild = await req.db.guild.findOne({_id:req.params.id});
	guild.config.welcome.channel = req.body.channel;
	guild.config.welcome.message = req.body.message;
	guild.save();
	res.redirect(".")
})
router.post("/guild/:id/exit", async function(req,res) {
	const client = req.client;
	const guild = await req.db.guild.findOne({_id:req.params.id});
	guild.config.bye.channel = req.body.channel;
	guild.config.bye.message = req.body.message;
	guild.save();
	res.redirect(".")
})*/
module.exports = router;