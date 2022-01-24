const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('refresh')
        .setDescription(`[Config] Atualizar os dados do servidor`),
    
    async execute(client,interaction) {
        
      if (!user.permissions.has(Permissions.FLAGS.MANAGE_SERVER)) return interaction.reply({ content: `[ERRO] Você não pode usar esse comando apenas ADMINs e usuarios com permissão \`\`MANAGE_SERVER\`\`!`, ephemeral: true });
      client.db.guild.findOne({_id: interaction.guild.id}, function(e,d) {
        if(d) {
          
        }
      })
        
    },
    
};