const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const Jimp = require('jimp');
module.exports = {

	data: new SlashCommandBuilder()
		.setName('bal')
		.setDescription('[Economy] Veja a balança de moedas de outros de forma avançada')
		.addUserOption(opt => opt.setName("user").setDescription("Selecione o usuário")),

	async execute(client, interaction) {
		const member = interaction.options.getMember("user") || interaction.member;
		var img = await new Jimp(1080,1080, "#5865F2");
		var avatar = await Jimp.read(member.user.displayAvatarURL({size:4096, format:"jpg"}));
		var font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
		var mask = await Jimp.read(__dirname+"/assets/mask.png");
		mask.resize(360,360)
		avatar.resize(360,360)
		var x = 360, y =  270;
		avatar.mask(mask,0,0)
		img.print(font, 360 ,705, `${member.user.username}`); 
		img.composite(avatar,x,y)
	  var imgBuf = await img.getBufferAsync(Jimp.MIME_PNG);
		const attachment = new Discord.MessageAttachment(imgBuf, 'profile-image.png');

		interaction.reply({ content: "Comando em beta ainda.", files: [attachment] });
	}
}