const globalMarketController = require('../controllers/globalMarketController.js');
const userController = require('../controllers/userController.js');
const discord = require("discord.js");

exports.GlobalMarket = async(message, args, client) =>{
    if(args == 'gm'){
        var embed = new discord.RichEmbed()
        .setAuthor(client.user.username,client.user.avatarURL)
        .setColor('ff0000')
        .setTitle('**Global Market**')
        .setURL()
        .setThumbnail('https://i.imgur.com/79ViU3x.png')
        .setDescription('Buy and sell resources\nIn the GLOBAL MARKET\n\n')
        .addBlankField()
        .addField('**To show offers**','Command: /emp show \n',true)
        .addField('**To show resource offers**','Command: /emp show <resource> \n Example: /emp show wood',true)
        .addField('**To sell**','Command: /emp gm sell <resource> <quantity> <price> \n Example: /emp gm sell stone 10 10',true)
        .addField('**To buy**','Command: /emp gm buy <resource> <quantity> <price> <username> \n Example: /emp buy stone 10 10 name',true)
        .setFooter('@EmpireBot')
        .setTimestamp(message.createdAt);

        return message.channel.send(embed);
    }
    args = args.split(' ');
    const gm = args.shift();
    if(args[0] == 'sell'){
        this.GlobalSell(message, args);
    } 
    else if(args[0] == 'buy'){
        this.GlobalBuy(message, args);
    }
    else if(args[0] == 'show'){
        this.GlobalShow(message,args, client);
    }

}

exports.GlobalSell = async(message, args) => {
    if(args.length == 1){
        return message.channel.send('Here you can sell your itens in a global market\nIf you want to sell type:\n```/emp gm sell <resource> <quantity> <price>```');
    }
    const types = ['wood', 'stone', 'iron', 'food', 'sword', 'bow', 'armor'];
    try{
        qtd = Number(args[2]);
        priceInf = Number(args[3]);
        res = String(args[1]).toLowerCase();
        if(!(isNaN(qtd)) && types.includes(res) && !(isNaN(priceInf)) ){
            if(String(args[4]).toLowerCase() == 'confirm'){
                let discordId = message.author.id;
                let user = await userController.findById(discordId);
                switch (res){
                    case 'wood':
                        if(user.wood >= qtd){
                            user.wood = user.wood - qtd;
                        }else{
                            message.channel.send("Not enough "+ res);
                        }
                        break;
                    case 'stone':
                        if(user.stone >= qtd){
                            user.stone = user.stone - qtd;
                        }else{
                            message.channel.send("Not enough "+ res);
                        }
                        break;
                    case 'iron':
                        if(user.iron >= qtd){
                            user.iron = user.iron - qtd;
                        }else{
                            message.channel.send("Not enough "+ res);
                        }
                        break;
                    case 'food':
                        if(user.food >= qtd){
                            user.food = user.food - qtd;
                        }else{
                            message.channel.send("Not enough "+ res);
                        }
                        break;
                    case 'sword':
                        if(user.sword >= qtd){
                            user.sword = user.sword - qtd;
                        }else{
                            message.channel.send("Not enough "+ res);
                        }
                        break;
                    case 'bow':
                        if(user.bow >= qtd){
                            user.bow = user.bow - qtd;
                        }else{
                            message.channel.send("Not enough "+ res);
                        }
                        break;
                    case 'armor':
                        if(user.armor >= qtd){
                            user.armor = user.armor - qtd;
                        }else{
                            message.channel.send("Not enough "+ res);
                        }
                        break;
                }
                resp = await userController.updateUser(user);
                if(!(resp)){
                    return message.channel.send('Try again later');
                }

                //Creating the Global Sell
                
                gmsell = {
                    ownerDiscordId : user.discordId,
                    ownerDiscordUsername : user.name,
                    buyerDiscordId : null,
                    buyerDiscordUsername : null,
                    resource: res,
                    quantity: qtd,
                    price: priceInf,
                    active: true,
                };
                resp = await globalMarketController.createOffer(gmsell);
                if(resp){
                    return message.channel.send('Offer Created!');
                }else{
                    return message.channel.send('Try Again Later');
                }
                
            }else{
                message.channel.send('Are you sure? This action cannot be undone!\nIf you are, use:\n```/emp gm sell <resource> <quantity> <price> confirm```');
            }
        }
    }catch{
        message.channel.send('Try again later');
    }
}

exports.GlobalShow = async (message, args, client) =>{
    if(args.length == 1){
        res = await globalMarketController.findTop10();

        //Embed
        var embed = new discord.RichEmbed()
        .setAuthor(client.user.username,client.user.avatarURL)
        .setColor('ff0000')
        .setTitle('**Global Market List**')
        .setURL()
        .setThumbnail('https://i.imgur.com/79ViU3x.png')
        .setDescription('Buy resources\nIn the GLOBAL MARKET\n\n')
        .addBlankField();

        res.forEach(offer => {
            embed.addField(offer.ownerDiscordUsername, `${offer.quantity}x of ${offer.resource}: ${offer.price}`, true);
        });

        embed.addBlankField()
        .addField('**To buy**','Command: /emp gm buy <resource> <quantity> <price> <username> \n Example: /emp buy stone 10 10 name',true)
        .setFooter('@EmpireBot')
        .setTimestamp(message.createdAt);
        return message.channel.send(embed);
    }
    if(args.length > 2){
        return message.channel.send('Command not valid, use /help or /emp gm for help');
    }
    const types = ['wood', 'stone', 'iron', 'food', 'sword', 'bow', 'armor'];
    if(!(types.includes(args[1]))){
        return message.channel.send('No resource found');
    }
    res = await globalMarketController.findTop10Category(args[1]);
    
    //Embed
    var embed = new discord.RichEmbed()
        .setAuthor(client.user.username,client.user.avatarURL)
        .setColor('ff0000')
        .setTitle('**Global Market List of ' + args[1].toLowerCase() + '**')
        .setURL()
        .setThumbnail('https://i.imgur.com/79ViU3x.png')
        .setDescription(`Buy ${args[1].toLowerCase()}\nIn the GLOBAL MARKET\n\n`)
        .addBlankField();
    
        res.forEach(offer => {
            embed.addField(offer.ownerDiscordUsername, `${offer.quantity}x of ${offer.resource}: ${offer.price}`, true);
        });
        embed.addBlankField()
        .addField('**To buy**','Command: /emp gm buy <resource> <quantity> <price> <username> \n Example: /emp buy stone 10 10 name',true)
        .setFooter('@EmpireBot')
        .setTimestamp(message.createdAt);
        return message.channel.send(embed);
}

exports.GlobalBuy = async (message, args) => {
    if(args.length == 1){
        return message.channel.send('To buy in the global market use:\n```/emp gm buy <resource> <quantity> <price> <username>```');
    }
    if(args.length != 5){
        return message.channel.send('To buy in the global market use:\n```/emp gm buy <resource> <quantity> <price> <username>```');
    }
    const types = ['wood', 'stone', 'iron', 'food', 'sword', 'bow', 'armor'];
    qtd = Number(args[2]);
    res = args[1].toLowerCase();
    priceInf = Number(args[3]);
    if(types.includes(res) && !(isNaN(qtd)) && !(isNaN(priceInf))){
        user  = userController.findById(message.author.id);
        if(!(user.money >= priceInf)){
            return message.channel.send(`You don't have enough money`);
        }
        //Realizar a Compra
    } 
    console.log(args);
}