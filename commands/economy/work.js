const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('[Economy] Trabalhe e ganhe dinheiro!'),
    
    async execute(client,interaction) {
        client.db.user.findOne({_id: interaction.member.id}, function(e,d) {
          if(!d) return interaction.reply("[Database] Parece que você não foi registrado ainda, tente novamente o comando.");
         var random = Math.floor(Math.random(500) * 5000)
         d.economy.coins += random;
         d.save();
         interaction.reply(`:money_with_wings: | Você ganhou $${random}`)
        })
      
        
    },
    
};