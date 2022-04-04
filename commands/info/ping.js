const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong!'),
    
    async execute(client, interaction) {
       var ping = client.ws.ping;
			const user = await client.db.user.findOne({_id: interaction.user.id});
       const lang = client.lang[user.lang];
		   const text = lang.ping.text.replace("{ping}", ping)
       await interaction.reply(text);
        
    },
    
};