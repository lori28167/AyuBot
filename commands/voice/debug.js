const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('voice')
		.setDescription('[Voice] Voice channel commands')
	  .addSubcommand(cmd => cmd.setName("debug").setDescription("[Debug] Olhar informações do canal de voz")),

	async execute(client, interaction) {
		if (interaction.options.getSubcommand() === "debug") {
			const voice = interaction.member.voice.channel;
			if (!voice) return interaction.reply({ content: "Entre em um canal de voz para ver algumas informações" });
      console.log(voice);
			interaction.reply({
				embeds: [{
					title: `${voice.name}: Debug`,
					description: "Informações desse canal de voz",
					fields: [{
						name: "ID",
						value: voice.id
					}, {
						name: "Limite de usuários",
						value: voice.userLimit?voice.userLimit:"Nenhum limite"
					}, {
						name: "Permissões",
						value: `\`\`\`${interaction.guild.channels.cache.get(voice.id).permissions.toArray()}\`\`\``
					}]
				}]
			})
		}
	},

};