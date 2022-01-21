const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('coins')
        .setDescription('[Economy] Veja a balança de moedas dos outros')
        .addUserOption(opt => opt.setName("user").setDescription("Selecione o usuário")),
    
    async execute(client,interaction) {
      const member = interaction.options.getMember("user") || interaction.member;
      //console.log(member )
      client.db.user.findOne({_id:member.id}, function(e,d) {
        if(!d) return interaction.reply({ content: "[ERRO] Usuário não é registrado", ephemeral: true});
        var coins = d.economy.coins;
        interaction.reply({ content: `:moneybag: | ${member} tem $${coins}`,ephemeral: true})
      });
    },
    
};