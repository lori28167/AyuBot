const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong!'),
    
    async execute(client, interaction) {
       var ping = client.ws.ping;
       var text = `Meu ping atual é ${ping}MS`
       if(ping > 999) return text = `Meu ping atual é +999MS`;

       await interaction.reply({content: text});
        
    },
    
};