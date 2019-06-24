const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const castle = require('./src/castle.js')

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Bot is online!');
});

client.on('message', message => {
    if(message.content.startsWith(prefix)){
        castle.sendMessage(message);
        message.channel.send("Hello " + message.member.nickname);
        console.log(message);
    }
})

client.login(token);
