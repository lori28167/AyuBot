 const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('[Info] Informações do servidor  e do bot')
        .addSubcommand(cmd => cmd.setName("server").setDescription("[Info] Informações do servidor")),
    
    async execute(client, interaction) {
      if (interaction.options.getSubcommand() === 'server') {
        const guild = await client.db.guild.findOne({_id:interaction.guild.id});
        if(!guild) return interaction.reply("[Erro] Não achei o servidor em minha database, execute denovo!");
        const embed = new MessageEmbed()
        .setTitle(`[INFO] ${interaction.guild.name}`)
        .addField("Bio do servidor", guild.bio.toString())
        .setColor("RANDOM")
        .setThumbnail(guild.icon);
        interaction.reply({embeds: [embed]})
      }
    },
    
};