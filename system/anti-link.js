module.exports = (client,message) => {
	const msg = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm.exec(message.content)
	 
  if(msg) {
		if(message.member.permissions.has("MANAGE_SERVER")) return console.log("Permisso de gerenciar servidores");
		message.delete();
		message.channel.send(`${message.author} do not send links!`)
		console.log(message.content + " " + message.author.tag)
	} else {
	}
}