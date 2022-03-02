const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
const {MessageEmbed} = require('discord.js')
const translate = require('translate-google')

module.exports = {

  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('[Fun] Woof'),

  async execute(client, interaction) {
    let link = await client.animal.getAsync("dog")
   let tradutor = await translate(link.fact, {to:'pt'});
   const embed = new MessageEmbed()
		.setImage(link.image)
		.setTitle(":dog: Woof")
		 .setColor("GREEN")
		.setDescription("Fato: " + tradutor);
   interaction.reply({embeds: [embed]})
  },

};