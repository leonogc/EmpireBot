const disc = require("discord.js");

exports.helpMessage = (msg, client) => {
    const embed = new disc.RichEmbed()
    .setAuthor(client.users.values().next().value.username,client.users.values().next().value.avatarURL)
    .setTitle("Help")
    .setDescription(comms)
    .setColor("#F65A7D")
    .setFooter('@EmpireBot','https://i.imgur.com/tbzriFR.png')
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
                '**castle** - Shows your resources, your money, your level and your attack power\n '+
                '**castle <nick>** - Shows another player\'s available loot and defense power\n '+
                '**expandempire** - Shows necessary resources to expand your empire. If possible, asks if you really want to do it.\n '+
                '**help** - List all commands\n '+
                '**stats** - List user statistics\n'+
                '**claim** - Claim your mainly resource\n\n'+

                '```css\n'+
                '#Market ```\n'+
                '**buy <resource> <quantity>** - Buy from merchant (Bot)\n'+
                '**trade <nick> <quantity> <resource> <quantity2> <resource2>** -Starts a trade with another player \n'+
                '**gm show** - Show offers in the global market \n'+
                '**gm show <resource>** - Show offers of certain resource in the global market \n'+
                '**gm sell <resource> <quantity> <price>** - Sell offers in the global market \n'+
                '**gm buy <offerId>** -  Buy a offer from global market\n ' +
                '**market** - Opens the bot store\n '+
                '**sell <resource> <quantity>** - Sell the resource to the merchant (Bot)\n\n'+

                '```cs\n'+
                '#Battle ```\n'+
                '**battle** - Invades the bot\'s castle\n '+
                '**battle <user>** - Invades the user\'s castle\n '+
                '**recruit** - List of soldier avaliable to recruit\n '+
                '**recruit <type> <qtd>** - recruit soldiers in exchange for resources\n\n '+
                '```diff\n'+
                '#Craft ```\n'+
                '**craft** - List of crafts \n'+
                '**craft <resource> <quantity>** - Craft an armament\n';
                
               
               
               
               
