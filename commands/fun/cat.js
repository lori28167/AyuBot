 // http://aws.random.cat/meow

const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
const {MessageEmbed} = require('discord.js')
const translate = require('translate-google')

module.exports = {

  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('[Fun] Meow'),

  async execute(client, interaction) {
   let link = await client.animal.getAsync("cat", process.env.animal)
   let tradutor = await translate(link.fact, {to:'pt'});
   const embed = new MessageEmbed()
		.setImage(link.image)
		.setTitle(":cat: Meow")
		 .setColor("GREEN")
		.setDescription("Fato: " + tradutor);
   interaction.reply({embeds: [embed]})
  
  },

};