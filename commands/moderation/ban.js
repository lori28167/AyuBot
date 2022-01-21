const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {

  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('[Mod] Banir usuarios')
    .addSubcommand(subcmd => subcmd.setName("add").setDescription("Aplicar banimento no usuario").addUserOption(opt => opt.setName("user").setDescription("[Opção] Usuario que deseja banir").setRequired(true)).addStringOption(opt => opt.setName("motivo").setDescription("[Opção] Coloque um motivo pelo qual está banindo o usuario"))),
    //.addSubcommand(subcmd => subcmd.setName("remove").setDescription("Retirar banimento no usuario").addStringOption(opt => opt.setName("user_id").setDescription("[Opção] Id do usuário banido").setRequired(true))),

  async execute(client,interaction) {
    if (interaction.options.getSubcommand() === "add") {
      const member = interaction.options.getMember('user');
      const user = interaction.member;
      if (!user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: `[ERRO] Você não pode usar esse comando apenas ADMINs e usuarios com permissão \`\`BAN_MEMBERS\`\`!`, ephemeral: true });
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: `[ERRO] Eu não posso executar esse comando pois não tenho permissão \`\`BAN_MEMBERS\`\`!`, ephemeral: true });
      if (user.id === member.id) return message.reply("Não posso te banir");
      const motivo = interaction.options.getString("motivo");
      var text = motivo;
      if (!member) return interaction.reply("[ERRO] Não consegui achar o usuário, verifique se está tudo correto.", { ephemeral: true });
      if (!motivo) text = "Sem motivo algum";
      member.ban({ reason: text }).then(user => {
        interaction.reply(`:name_badge:  | ${member.user.username} foi banido com sucesso!`);
      }).catch(err => {
        interaction.reply("[ERRO] Não consegui banir o usuário")
      })
    } else if (interaction.options.getSubcommand() === "remove") {
      interaction.reply("Em breve")
      /*const userid = interaction.options.getString('user_id');
      const member = interaction.guild.members.cache.get(userid);
      const user = interaction.member;
      if (!user.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: `[ERRO] Você não pode usar esse comando apenas ADMINs e usuarios com permissão \`\`BAN_MEMBERS\`\`!`, ephemeral: true });
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: `[ERRO] Eu não posso executar esse comando pois não tenho permissão \`\`BAN_MEMBERS\`\`!`, ephemeral: true });
      if (user.id === userid) return message.reply("Não posso te desbanir");
      if (!member) return interaction.reply("[ERRO] Não consegui achar o usuário, verifique se está tudo correto.", { ephemeral: true });

      member.unban().then(user => {
        interaction.reply(`:slight_smile: | ${member.user.username} foi desbanido com sucesso!`);
      }).catch(err => {
        interaction.reply("[ERRO] Não consegui desbanir o usuário")
      })*/
    }
  },

};