 const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('[Info] Informações do servidor e do bot')
        .addSubcommand(cmd => cmd.setName("server").setDescription("[Info] Informações do servidor")),
    
    async execute(client, interaction) {
      if (interaction.options.getSubcommand() === 'server') {
        const guild = await client.db.guild.findOne({_id:interaction.guild.id});
				const user = await client.db.user.findOne({_id: interaction.user.id});
        const lang = client.lang[user.lang];
				const g = client.guilds.cache.get(guild._id)
        if(!guild) return interaction.reply(lang.info.server.error.text);
        const embed = new MessageEmbed()
        .setTitle(`[INFO] ${interaction.guild.name}`)
			  .setColor("RANDOM")
        .setThumbnail(guild.icon);
				lang.info.server.field.forEach(field => {
					// const field = JSON.stringify(f);
					const value = field.value.replace("{description}", guild.bio.toString()).replace("{date}",`<t:${Math.floor(g.createdTimestamp/1000)}:F>`);
        embed.addField(field.name, value)
				});
				//.addField(, `<t:${Math.floor(g.createdTimestamp/1000)}:F>`)
        
        interaction.reply({embeds: [embed]})
      }
    },
    
};