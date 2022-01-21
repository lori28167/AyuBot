const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');
const { Permissions } = require('discord.js');

module.exports = {

  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('[Mod] Silencie o usuário')
    .addSubcommand(subcmd =>
          subcmd.setName("add").setDescription("[Mod] Adicionar um timeout no usuario").addUserOption(opt => opt.setName("user").setDescription("[Opção] Usuario que deseja silenciar").setRequired(true)).addStringOption(opt => opt.setName("tempo").setDescription("[Opção] Selecione o tempo de silenciamento").setRequired(true)).addStringOption(opt => opt.setName("motivo").setDescription("[Opção] Motivo do usuario ser silenciado")))
          .addSubcommand(subcmd =>
      subcmd.setName("remove").setDescription("[Mod] Remover um timeout do usuario").addUserOption(opt => opt.setName("user").setDescription("[Opção] Usuario que deseja retirar o silenciamento").setRequired(true))),

  async execute(client, interaction) {
    const member = interaction.options.getMember('user');
    const user = interaction.member;
    if (!user.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({content: `[ERRO] Você não pode usar esse comando apenas ADMINs e usuarios com permissão \`\`MODERATE_MEMBERS\`\`!`, ephemeral:true});
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({ content: `[ERRO] Eu não posso executar esse comando pois não tenho permissão \`\`MODERATE_MEMBERS\`\`!`, ephemeral: true });
    if(interaction.options.getSubcommand() === "add") {
    const tempo = ms(interaction.options.getString("tempo"));
    const time = new Date(Date.now() + tempo);
    const motivo = interaction.options.getString("motivo");
    var text = motivo;
    if(!member) return interaction.reply("[ERRO] Não consegui achar o usuário, verifique se está tudo correto.", {ephemeral:true});
    if(user.id === member.id) return message.reply("Não posso te silenciar");
    if(!motivo) text = "Sem motivo algum";
    if(!tempo) return interaction.reply("[ERRO] Coloque um tempo válido!", {ephemeral:true});
    member.timeout(tempo, text).then(inter => {
     interaction.reply(`:mute: | ${member.user.username} foi silenciado!\n:rolling_eyes: | Motivo: ${text}\n:timer: | Será retirado <t:${Math.floor(time.getTime() / 1000)}:R>`);
    }).catch(err => {
      interaction.reply(`[ERRO] Não consegui silenciar o usuario.`, {ephemeral:true})
    })
    } else if(interaction.options.getSubcommand() === "remove") {
    if(!member) return interaction.reply("[ERRO] Não consegui achar o usuário, verifique se está tudo correto.", {ephemeral:true});
    member.timeout("", "Timeout retirado por " + user.user.username).then(inter => {
     interaction.reply(`:loud_sound: | Silenciamento retirado com sucesso!\n:slight_smile: | Usuario: ${member.user.username}\n:police_officer: | Moderador: ${user.user.username}`);
    }).catch(err => {
      interaction.reply(`[ERRO] Não consegui retirar o silencio do usuario.`, {ephemeral:true})
    })
    }
  },

};