const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Example command'),
    
    async execute(client,interaction) {
        
        await interaction.reply(`Hello ${interaction.member}, welcome to Discord Bot Test!`);
        
    },
    
};