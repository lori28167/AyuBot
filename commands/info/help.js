const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('[Info] Quer ajuda?'),
    
    async execute(client, interaction) {
      const embed = new MessageEmbed()
      .setTitle("❓ • Ajuda")
      .setDescription("Precisa de ajuda? Entre no meu [servidor do Discord](https://discord.gg/BzJn5Je)!\nComandos:")
      .addField("<:emoji_4:700116823542202378> • Moderação","`ban,kick,timeout`",true)
      .addField("<:emoji_5:700116865116012615> • Diversão","`bird, cat, dog, simp, triggered, wasted`",true)
      .addField("<:nikkk:739995169671217203> • Economia","`coins, work`",true)
      .addField("<:emoji_7:700117276434759800> • Configurações","`dashboard`",true)
      .addField(":info: • Informações", "`help, info <server>, ping`", true)
      .setColor("RANDOM");
      interaction.reply({embeds: [embed], ephemeral:true});
    },
    
};