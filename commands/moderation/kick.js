const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {

  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('[Mod] Expulsar usuarios')
    .addUserOption(opt => opt.setName("user").setDescription("[Opção] Usuario que deseja expulsar").setRequired(true))
    .addStringOption(opt => opt.setName("motivo").setDescription("[Opção] Coloque um motivo pelo qual está expulsando o usuario")),

  async execute(client,interaction) {
    const member = interaction.options.getMember('user');
    const user = interaction.member;
    if (!user.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({ content: `[ERRO] Você não pode usar esse comando apenas ADMINs e usuarios com permissão \`\`KICK_MEMBERS\`\`!`, ephemeral: true });
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({ content: `[ERRO] Eu não posso executar esse comando pois não tenho permissão \`\`KICK_MEMBERS\`\`!`, ephemeral: true });
    if(user.id === member.id) return message.reply("Não posso te expulsar");
    const motivo = interaction.options.getString("motivo");
    var text = motivo;
    if (!member) return interaction.reply("[ERRO] Não consegui achar o usuário, verifique se está tudo correto.", { ephemeral: true });
    if (!motivo) text = "Sem motivo algum";
    member.kick({ reason: text }).then(user => {
     interaction.reply(`:name_badge:  | ${member.user.username} foi expulso com sucesso!`);
    }).catch(err => {
      interaction.reply("[ERRO] Não consegui expulsar o usuário")
    })
  },

};