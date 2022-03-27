const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config/config');
const client = new Client({ intents: ["GUILDS","GUILD_MEMBERS"], shards: 'auto'});
const app = require('express')();
const alex = require('alexflipnote.js');
const alexclient = new alex();
const animality = require('animality');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES], shards: 'auto'});
client.animal = animality


// Client 2
bot.on("ready", () => {
	console.log("Heartbeat online")
})
bot.on("messageCreate", (message) => {
	if(message.author.bot) return;
	if(message.content === "!welcome") {
		client.emit("guildMemberAdd",message.member);
		client.emit("guildMemberRemove", message.member);
	}
	if(message.content === "!ping") {
		message.reply("Batimentos da Ayu está entre " + Math.floor(Math.random(client.ws.ping) / 1000) + "/" + client.ws.ping)
	}
})

bot.login(process.env.client2)

client.commands = new Collection();
client.db = require('./db.js')
client.alex = alexclient;
/*app.client = client;*/
module.exports = client;
require('./webdash/server');

client.once('ready', () => {
  console.log('Connected !')

});
client.on("debug", (debug) => {
	console.log(debug)
})
const cmd_folders = fs.readdirSync('./commands');
for (const f of cmd_folders) {

  const cmd_files = fs.readdirSync(`./commands/${f}`).filter(file => file.endsWith('.js'));

  for (const file of cmd_files) {

    const cmd = require(`./commands/${f}/${file}`);
    client.commands.set(cmd.data.name, cmd);

  }

}

client.on("guildMemberAdd", function(member) {
	var g = member.guild;
	client.db.guild.findOne({_id:g.id}, function(e,d) {
	  //console.log(member)
		if(!d) return;
		const saved = d.config.welcome.message
		.replace(/{user.username}/g, member.user.username)
		.replace(/{@user}/g, `<@${member.id}>`)
		const message = JSON.parse(saved)
		const channel = g.channels.cache.get(d.config.welcome.channel);
		if(!channel) return;
		//.replace("{user.username}", member.username)
		channel.send(message)
	})
})
client.on("guildMemberRemove", function(member) {
	var g = member.guild;
	client.db.guild.findOne({_id:g.id}, function(e,d) {
	  //console.log(member)
		if(!d) return;
		const saved = d.config.bye.message
		.replace(/{user.username}/g, member.user.username)
		const message = JSON.parse(saved)
		const channel = g.channels.cache.get(d.config.bye.channel);
		if(!channel) return;
		//.replace("{user.username}", member.username)
		channel.send(message)
	})
})

client.on('interactionCreate', async interaction => {

  if (!interaction.isCommand()) return;
  var user = await client.db.user.findOne({ _id: interaction.member.id });
  var guild = await client.db.guild.findOne({ _id: interaction.guild.id });
  if (!guild) {
    new client.db.guild({
      _id: interaction.guild.id,
      name: interaction.guild.name,
      icon: interaction.guild.icon?interaction.guild.iconURL({size: 4096}):"https://cdn.discordapp.com/embed/avatars/0.png",
      bio: "Um servidor :D",
      verified:false,
      config: {
        welcome: {
          channel: "",
          message: "{\"content\":\"Bem vindo(a) {user.username} ao servidor!\"}"
        },
        bye: {
          channel: "",
          message: "{\"content\":\"{user.username} saiu do servidor.\"}"
        }
      }
    }).save()
  }
  if (!user) {
    new client.db.user({
      _id: interaction.member.id,
      about: "Olá, parece que ainda não tenho um sobre mim!",
      economy: {
        coins: 500
      }
    }).save();
    //interaction.reply({content:"[Database] Você foi registrado, parabéns!",ephemeral:true})
  }
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;

  try {

    await cmd.execute(client, interaction);

  } catch (e) {

    console.error(e);
    await interaction.reply({ content: 'Oops ! Something went wrong.', ephemeral: true });

  }
});


client.login(process.env.token);