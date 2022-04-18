module.exports = function(client,msg,set,time) {
	const message = msg;
	client.db.guild.findOne({_id:message.guild.id}, function(e,d) {
		if(!d) return;
		if(!d.system.antispam.check) return;
		if(d.system.antispam.config.blacklist === [] || !d.system.antispam.config.blacklist) return;
		if(d.system.antispam.config.blacklist.includes(message.channel.id)) return;
    for (let u of set) {
        
        if (u.id === msg.author.id) {
            if (u.times >= 4) {
                msg.reply(`HEY, DEVAGAR!`)
                msg.member.timeout(10000)

                u.time = Date.now()
                u.times = 0
            } else if ((Date.now() - u.time) <= time) {
                u.times++
                u.time = Date.now()
            } else {
                u.time = Date.now()
                u.times = 1
            }
        }
    }

    let userInSet = false
    set.forEach(u => { 
        if (u.id === msg.author.id) userInSet = true 
    })
    
    if (!userInSet) set.add({ id: msg.author.id, time: Date.now(), times: 1 })
 })
}