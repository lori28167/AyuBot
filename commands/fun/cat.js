// http://aws.random.cat/meow

const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
module.exports = {

  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('[Fun] Meow'),

  async execute(client, interaction) {
    axios.get("https://some-random-api.ml/img/cat")
    .then(res => {
      //console.log(res)
      interaction.reply({content: `Meow :cat:`, files: [{attachment: res.data.link}]});
    })
  },

};