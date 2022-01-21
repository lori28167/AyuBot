const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
module.exports = {

  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('[Fun] Woof'),

  async execute(client, interaction) {
    axios.get("https://some-random-api.ml/img/dog")
    .then(res => {
      //console.log(res)
      interaction.reply({content: `Woof :dog:`, files: [{attachment: res.data.link}]});
    })
  },

};