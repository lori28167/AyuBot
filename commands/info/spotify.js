const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {

	data: new SlashCommandBuilder()
		.setName('spotify')
		.setDescription('[Info] Veja qual música o {usuário} está escutando')
		.addUserOption(opt => opt.setName("user").setDescription("Literalmente o usuário.")),

	async execute(client, interaction) {

		const member = interaction.options.getMember("user") || interaction.member;
		if (!member.presence.activities[0]) return interaction.reply("Você não tem nenhuma atividade rolando!");
		member.presence.activities.forEach(async presence => {
			if (presence.name !== 'Spotify') return;
				//interaction.reply("Usuário não está escutando Spotify.\n`Caso tiver, certifique se ele está usando Status Personalizado, ou se ele está no modo offline.`");
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: presence.details, url: "https://open.spotify.com/track/" + presence.syncId })
				.setDescription(presence.state)
				.addField("Album", presence.assets.largeText, true)
				.addField("Escutando", "<t:" + Math.floor(presence.createdTimestamp / 1000) + ":R>", true)
				.setColor("GREEN")
				.setThumbnail("https://i.scdn.co/image/" + presence.assets.largeImage.slice(8))
				;

			if (["Eminence Front", "Never Too Much", "Just Got Paid"].includes(presence.details) && ["The Who", "Luther Vandross", "Sigala, Ella Eyre, Meghan Trainor, French Montana"].includes(presence.state)) { embed.setFooter({text: "♥️ • Música curtida pelos desenvolvedores"}) }
			await interaction.reply({ embeds: [embed] });
		})
	},

};