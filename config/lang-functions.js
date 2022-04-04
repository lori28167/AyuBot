const lang = require('./lang.json');
const client = require('../index.js')

var json = lang.replace("{ping}", client.ws.ping);

console.log(json
				)
module.exports = json;