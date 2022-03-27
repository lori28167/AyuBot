const { ShardingManager, Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS], shards: 'auto' });
const manager = new ShardingManager('./index.js', {
  execArgv: ['--trace-warnings'],
  shardArgs: ['--ansi', '--color'],
  token: process.env.token,
  totalShards: "auto"
});

manager.on('shardCreate', shard => {
  shard.on("ready", () => {
    console.log(`[DEBUG/SHARD] Shard ${shard.id} connected to Discord's Gateway.`)
    // Sending the data to the shard.
    shard.send({ type: "shardId", data: { shardId: shard.id } });
    console.log("Deployed shard " + shard.id)
  });
});
manager.spawn()
  .then(shards => {

  })
  .catch(console.error);