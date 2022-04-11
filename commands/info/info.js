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
				const user = await client.db.user.findOne({_id: interaction.user.id});
        const lang = client.lang[user.lang];
        if(!guild) return interaction.reply(lang.info.server.error.text);
        const embed = new MessageEmbed()
        .setTitle(`[INFO] ${interaction.guild.name}`)
        .addField(lang.info.server.field, guild.bio.toString())
        .setColor("RANDOM")
        .setThumbnail(guild.icon);
        interaction.reply({embeds: [embed]})
      }
    },
    
};