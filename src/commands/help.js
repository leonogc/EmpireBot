const disc = require("discord.js");

exports.helpMessage = (msg, client) => {
    const embed = new disc.RichEmbed()
    .setAuthor(client.users.values().next().value.username,client.users.values().next().value.avatarURL)
    .setTitle("Help")
    .setDescription(comms)
    .setColor("#F65A7D")
    .setFooter('@EmpireBot')
    .setTimestamp(msg.createdAt);

    msg.channel.send(embed);
}

//Command Not Recognized -> CNR
exports.CNRMessage = (message) =>{
    message.channel.send(":x: Command Not Recognized!");
}


const comms =   '```fix\n'+
                '#Info ```\n'+
                '**start** - Starts a new Empire\n '+
                '**castle** - Shows your resources and your attack and defense power\n '+
                '**castle <nick>** - Shows another player\'s available loot and attack and defense power\n '+
                '**expandempire** - Shows necessary resources to expand your empire. If possible, asks if you really want to do it.\n '+
                '**help** - List all commands\n '+
                '**stats** - List user statistics\n\n'+

                '```css\n'+
                '#Market ```\n'+
                '**buy <resource> <quantity>** - Buy from merchant (Bot)\n'+
                '**trade <nick> <quantity> <resource> <quantity2> <resource2>** -Starts a trade with another player \n'+
                '**gm <resource> <price>** -  Adds a product in the global market\n ' +
                '**market** - Opens the bot store\n '+
                '**sell <resource> <quantity>** - sell the resource to the merchant\n\n'+

                '```cs\n'+
                '#Inquisition ```\n'+
                '**battle** - Invades the bot\'s castle\n '+
                '**battle <user>** - Invades the user\'s castle\n '+
                '**quest** - List of active quests\n '+
                '**recruit <type> <qtd>** - recruit soldiers in exchange for resources\n '+
                '```diff\n'+
                '#Craft ```\n'+
                '**craft <resource> <quantity>** - Craft a armament\n'+
                '**craft** - Display a list of crafts \n';
               
               
               
               
