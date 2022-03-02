const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
module.exports = {

  data: new SlashCommandBuilder()
    .setName('simpcard')
    .setDescription('[Fun] Simp card')
    .addUserOption(option => option.setName('simp').setDescription('Selecione o Simp').setRequired(true)),
  async execute(client,interaction) {
    const user = interaction.options.getUser('simp');
      interaction.reply({files: [{attachment: "https://some-random-api.ml/canvas/simpcard?avatar="+user.displayAvatarURL({format: "png", size:4096}), name: "simpcard.png"}]});
  },

};