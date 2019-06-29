const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const commands = require('./src/commands.js')

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Bot is online!');
    client.user.setActivity(`Battles and Trades on ${client.guilds.size} servers`, {type : "WATCHING"});
});

client.on('message', message => {
    if(message.content.startsWith(prefix)){
        const args = message.content.substr(prefix.length);
        commands.selectCommand(message, args, client);
    }
})

client.on('guildCreate', () => {
    client.user.setActivity(`Battles and Trades on ${client.guilds.size} servers`, {type : "WATCHING"});
})

client.on('guildDelete', () => {
    client.user.setActivity(`Battles and Trades on ${client.guilds.size} servers`, {type : "WATCHING"});
})

client.login(token);