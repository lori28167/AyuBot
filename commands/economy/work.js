const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('[Economy] Trabalhe e ganhe dinheiro!'),
    
    async execute(client,interaction) {
			const user = await client.db.user.findOne({_id: interaction.user.id});
			const lang = client.lang[user.lang]
        client.db.user.findOne({_id: interaction.member.id}, function(e,d) {
				  
          if(!d) return interaction.reply(lang.work.error.text);
         var random = Math.floor(Math.random(500) * 5000)
         d.economy.coins += random;
         d.save();
				 var success = lang.work.success.text.replace("{money}", random)
         interaction.reply(success)
        })
      
        
    },
    
};