const { ShardingManager, Client, Intents } = require('discord.js');
const client = new Client({ intents: [] });
const manager = new ShardingManager('./index.js', {
  execArgv: ['--trace-warnings'],
  shardArgs: ['--ansi', '--color'],
  token: process.env.token,
  totalShards: 2
});

manager.on('shardCreate', shard => {
  shard.on("ready", () => {
    console.log(`[DEBUG/SHARD] Shard ${shard.id} connected to Discord's Gateway.`)
		require('./webdash/server')
    shard.send({ type: "shardId", data: { shardId: shard.id } });
    console.log("Deployed shard " + shard.id)
  });
});

manager.spawn()
	.then(shards => {
		shards.forEach(shard => {
			shard.on('message', message => {
				console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
			});
		});
	})
	.catch(console.error);