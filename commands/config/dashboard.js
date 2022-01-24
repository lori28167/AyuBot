const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('dashboard')
        .setDescription(`Veja a dashboard do seu servidor`),
    
    async execute(client,interaction) {
        
        await interaction.reply("Ei, quer ver minha dashboard?\nhttps://ayubot.tech/dashboard/guild/" + interaction.guild.id);
        
    },
    
};