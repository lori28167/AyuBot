const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
module.exports = {

  data: new SlashCommandBuilder()
    .setName('wasted')
    .setDescription('[Fun] GTA 5 \"Wasted\" meme')
    .addUserOption(option => option.setName('user').setDescription('Selecione o Simp').setRequired(true)),
  async execute(client, interaction) {
    const user = interaction.options.getUser('user');
      interaction.reply({files: [{attachment: "https://some-random-api.ml/canvas/wasted?avatar="+user.displayAvatarURL({format: "png", size:4096}), name: "wasted.png"}]});
  },

};