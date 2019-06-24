const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Bot is online!');
});

client.on('message', message => {
    console.log(message);
})

client.login(token);
