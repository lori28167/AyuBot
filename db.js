const mongo = require('mongoose');
mongo.connect(process.env.db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(connect => console.log("[MONGODB] Connected")).catch(err => console.error("[MONGODB] Erro " + err.stack));

const Schema = mongo.Schema;

const User = new Schema({
	_id: String,
	about: String,
	economy: {
		coins: Number
	},
	lang: { type: String, default: "pt-br", required: true }
});

const Guild = new Schema({
	_id: String,
	name: String,
	icon: String,
	bio: String,
	verified: Boolean,
	config: {
		welcome: {
			channel: String,
			message: String
		},
		bye: {
			channel: String,
			message: String
		},
		system: {
			antispam: {
				config: {
					blacklist: Array
				},
				check: {
					default: false,
					type: Boolean,
					required: true
				}
			},
			antilink: {
				default: false,
				type: Boolean,
				required: true
			}
		}
	}
})
module.exports.guild = new mongo.model("guild", Guild)
module.exports.user = new mongo.model("user", User)