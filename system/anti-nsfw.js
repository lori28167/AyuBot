const axios = require('axios')
const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs')
module.exports = async (client, message) => {
	const bot = client;
	console.log(message.attachments)
	if (message.attachments.first()) {
		if(message.attachments.first().contentType.startsWith("video")) return console.log("Video");
		const pic = await axios.get(`${message.attachments.first().url}`, {
			responseType: 'arraybuffer',
		})
		const model = await nsfw.load() // To load a local model, nsfw.load('file://./path/to/model/')
		// Image must be in tf.tensor3d format
		// you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
		const image = await tf.node.decodeImage(pic.data, 3)
		const predictions = await model.classify(image)
		image.dispose() // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
		const info = predictions[0]
		console.log(predictions)
		if (info.probability > 0.9 && info.className === "Porn" || info.className === "Hentai") {
			if (message.channel.nsfw) return;
		client.channels.cache.get("709397060079583305").send(`${message.author.tag} Enviou ${info.className} em ${message.channel.name}`)
			message.delete();
		}
	}
}