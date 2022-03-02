const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
module.exports = {

  data: new SlashCommandBuilder()
    .setName('triggered')
    .setDescription('[Fun] Por que ta brabo?')
    .addUserOption(option => option.setName('user').setDescription('Selecione o Simp').setRequired(true)),
  async execute(client, interaction) {
    const user = interaction.options.getUser('user');
      interaction.reply({files: [{attachment: "https://some-random-api.ml/canvas/triggered?avatar="+user.displayAvatarURL({format: "png", size:4096}), name: "triggered.gif"}]});
  },

};