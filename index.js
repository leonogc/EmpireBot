const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const commands = require('./src/commands.js')

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Bot is online!');
});

client.on('message', message => {
    if(message.content.startsWith(prefix)){
        const args = message.content.substr(prefix.length);
        commands.selectCommand(message, args);
    }
})

client.login(token);
