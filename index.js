const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config/config');
require('./webdash/server')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
client.db = require('./db.js')
client.once('ready', () => {
  console.log('Connected !')
});

const cmd_folders = fs.readdirSync('./commands');
for (const f of cmd_folders) {

  const cmd_files = fs.readdirSync(`./commands/${f}`).filter(file => file.endsWith('.js'));

  for (const file of cmd_files) {

    const cmd = require(`./commands/${f}/${file}`);
    client.commands.set(cmd.data.name, cmd);

  }

}

client.on('interactionCreate', async interaction => {

  if (!interaction.isCommand()) return;
  var user = await client.db.user.findOne({ _id: interaction.member.id });
  var guild = await client.db.guild.findOne({ _id: interaction.guild.id });
  if (!guild) {
    new client.db.guild({
      _id: interaction.guild.id,
      config: {
        welcome: {
          channel: "",
          message: "Bem vindo(a) {user.username} ao servidor!"
        },
        bye: {
          channel: "",
          message: "{user.username} saiu do servidor."
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


client.login(token);