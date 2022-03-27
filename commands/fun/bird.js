const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
const translate = require('translate-google')

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('bird')
        .setDescription('[Fun] Chirp'),
    
    async execute(client,interaction) {
  let link = await client.animal.getAsync("bird", process.env.animal)
   let tradutor = await translate(link.fact, {to:'pt'});
   const embed = new MessageEmbed()
		.setImage(link.image)
		.setTitle(":bird: Chirp")
		 .setColor("GREEN")
		.setDescription("Fato: " + tradutor);
   interaction.reply({embeds: [embed]})
  
    },
    
};