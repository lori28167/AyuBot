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
  }
});

const Guild = new Schema({
  _id: String,
  config: {
    welcome: {
     channel: String,
     message: Object
    },
    bye: {
      channel: String,
      message: Object
    }
  }
})
module.exports.guild = new mongo.model("guild", Guild)
module.exports.user = new mongo.model("user", User)