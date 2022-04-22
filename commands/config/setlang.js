const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('setlang')
		.setDescription('[Config] alterar linguagem do bot para você')
		.addStringOption(option =>
			option.setName('lang')
				.setDescription('Linguagem')
				.setRequired(true)
				.addChoice('English', 'en-us')
				.addChoice('Português Brasileiro', 'pt-br')
										),

	async execute(client, interaction) {
		const user = await client.db.user.findOne({ _id: interaction.user.id });
		if (!user) return;
		const lang = client.lang[user.lang]
    user.lang = interaction.options.getString('lang');
		user.save();
		interaction.reply(lang.setlang.success.text)
	},

};