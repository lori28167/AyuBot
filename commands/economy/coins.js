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
				var lang = client.lang(d.lang);
        if(!d) return interaction.reply({ content: lang.bal.error.text, ephemeral: true});
        var coins = d.economy.coins;
				var money = lang.bal.success.text.replace("{member}", member.user.tag).replace("{money}", coins)
        interaction.reply({ content: money,ephemeral: true})
      });
    },
    
};