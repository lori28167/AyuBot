module.exports = (io, client, db) => {
	io.sockets.on("connection", async socket => {
		socket.on("welcomeUpdate", async (welcome) => {
			const guild = await db.guild.findOne({ _id: welcome.guild });
			guild.config.welcome.channel = welcome.channel;
			guild.config.welcome.message = welcome.message;
			guild.save();
			console.log(welcome)
			socket.emit("welcomeUpdateClient", { bio: message.value, guild: welcome.guild })
		})
		socket.on("guildSettings", async (info) => {
			const guild = await db.guild.findOne({ _id: info.guild });
			guild.bio = info.bio;
			guild.save();
			socket.emit("guildSettingsClient", { bio: message.value, guild: info.guild })
		})
		socket.on("leaveUpdate", async (welcome) => {
			const guild = await db.guild.findOne({ _id: welcome.guild });
			guild.config.bye.channel = welcome.channel;
			guild.config.bye.message = welcome.message;
			guild.save();
			socket.emit("leaveUpdateClient", { bio: message.value, guild: welcome.guild })
			console.log(welcome)
		})
		console.log("[Socket] Connected");

		/*const memberCount = await client.shard
			.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
		const guildCount = await ;*/
		const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
		];
		const results = await Promise.all(promises);

		const guildCount = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
		const memberCount = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
		
		socket.emit("guildUpdate", { guildCount, userCount: memberCount, ping: client.ws.ping });
		setInterval(() => {
			socket.emit("guildUpdate", { guildCount: guildCount, userCount: memberCount, ping: client.ws.ping });
			// console.log("Updated");
		}, 1000)
	})
}