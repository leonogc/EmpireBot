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
        .addField('**To buy**','Command: /emp gm buy <offerId>\n Example: /emp gm buy 1',true)
        .setFooter('@EmpireBot','https://i.imgur.com/tbzriFR.png')
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
        return message.channel.send('<@' + message.author.id + '>, Here you can sell your itens in a global market\nIf you want to sell type:\n```/emp gm sell <resource> <quantity> <price>```');
    }
    const types = ['wood', 'stone', 'iron', 'food', 'sword', 'bow', 'armor'];
    try{
        args[3] = args[3].replace(',','.');
        qtd = Number(args[2]);
        priceInf = Number(args[3]);
        res = String(args[1]).toLowerCase();
        if(!(isNaN(qtd)) && types.includes(res) && !(isNaN(priceInf)) ){
            if(String(args[4]).toLowerCase() == 'confirm'){
                priceInf = priceInf*100;
                let discordId = message.author.id;
                let user = await userController.findById(discordId);
                switch (res){
                    case 'wood':
                        if(user.wood >= qtd){
                            user.wood = user.wood - qtd;
                        }else{
                            return message.channel.send("<@" + message.author.id + ">, Not enough "+ res);
                        }
                        break;
                    case 'stone':
                        if(user.stone >= qtd){
                            user.stone = user.stone - qtd;
                        }else{
                            return message.channel.send("<@" + message.author.id + ">, Not enough "+ res);
                        }
                        break;
                    case 'iron':
                        if(user.iron >= qtd){
                            user.iron = user.iron - qtd;
                        }else{
                            return message.channel.send("<@" + message.author.id + ">, Not enough "+ res);
                        }
                        break;
                    case 'food':
                        if(user.food >= qtd){
                            user.food = user.food - qtd;
                        }else{
                            return message.channel.send("<@" + message.author.id + ">, Not enough "+ res);
                        }
                        break;
                    case 'sword':
                        if(user.sword >= qtd){
                            user.sword = user.sword - qtd;
                        }else{
                            return message.channel.send("<@" + message.author.id + ">, Not enough "+ res);
                        }
                        break;
                    case 'bow':
                        if(user.bow >= qtd){
                            user.bow = user.bow - qtd;
                        }else{
                            return message.channel.send("<@" + message.author.id + ">, Not enough "+ res);
                        }
                        break;
                    case 'armor':
                        if(user.armor >= qtd){
                            user.armor = user.armor - qtd;
                        }else{
                            return message.channel.send("<@" + message.author.id + ">, Not enough "+ res);
                        }
                        break;
                }
                resp = await userController.updateUser(user);
                if(!(resp)){
                    return message.channel.send(`<@${message.author.id}>, Try again later`);
                }

                //Creating the Global Sell
                const lastOffer = await globalMarketController.findLastId();
                let newOfferId;
                if(lastOffer == null){
                    newOfferId = 0;
                }else{
                    newOfferId = lastOffer.offerId +1;
                }
                
                gmsell = {
                    offerId : newOfferId,
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
                    return message.channel.send(`<@${message.author.id}>, Offer Created!`);
                }else{
                    return message.channel.send(`<@${message.author.id}>, Try Again Later`);
                }
                
            }else{
                message.channel.send('<@' + message.author.id + '>, Are you sure? This action cannot be undone!\nIf you are, use:\n```/emp gm sell <resource> <quantity> <price> confirm```');
            }
        }else{
            message.channel.send(`<@${message.author.id}>, Resource, Price or Quantity is not correct`);
        }
    }catch{
        message.channel.send(`<@${message.author.id}>, Try again later`);
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
        .addBlankField()
        .setFooter('@EmpireBot','https://i.imgur.com/tbzriFR.png');

        res.forEach(offer => {
            embed.addField(`Id: ${offer.offerId} : ${offer.ownerDiscordUsername}`, `${offer.quantity}x of ${offer.resource}: ${offer.price/100} golds`, true);
        });

        embed.addBlankField()
        .addField('**To buy**','Command: /emp gm buy <offerId>\n Example: /emp gm buy 1',true)
        .setFooter('@EmpireBot')
        .setTimestamp(message.createdAt);
        return message.channel.send(embed);
    }
    if(args.length > 2){
        return message.channel.send('<@' + message.author.id + '> Command not valid, use /help or /emp gm for help');
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
        .addBlankField()
        .setFooter('@EmpireBot','https://i.imgur.com/tbzriFR.png');
    
        res.forEach(offer => {
            embed.addField(`Id: ${offer.offerId} : ${offer.ownerDiscordUsername}`, `${offer.quantity}x of ${offer.resource}: ${offer.price/100} golds`, true);
        });
        embed.addBlankField()
        .addField('**To buy**','Command: /emp gm buy <offerId>\n Example: /emp gm buy 1',true)
        .setFooter('@EmpireBot')
        .setTimestamp(message.createdAt);
        return message.channel.send(embed);
}

exports.GlobalBuy = async (message, args) => {
    try{
        if(args.length == 1){
            return message.channel.send('<@' + message.author.id + '> To buy in the global market use:\n```/emp gm buy <resource> <quantity> <price> <username>```');
        }
        if(args.length != 2){
            return message.channel.send('<@' + message.author.id + '> To buy in the global market use:\n```/emp gm buy <offerId>```');
        }
        offerId = Number(args[1]);
        if(isNaN(offerId)){
            return message.channel.send(`<@${message.author.id}>, Offer Id not found`);
        }
        offer = await globalMarketController.findOffer(offerId);
        
        if(offer != null){
            priceInf = Number(offer.price);
            let user  = await userController.findById(message.author.id);
            if(!(user.money >= priceInf)){
                return message.channel.send(`<@${message.author.id}>, you don't have enough money`);
            }
            //Realizar a Compra
            let ownerUser = await userController.findById(offer.ownerDiscordId);
            
            user.money = user.money - offer.price;
            switch(offer.resource){
                case 'wood':
                    user.wood = user.wood + offer.quantity;
                    break;
                case 'stone':
                    user.stone = user.stone + offer.quantity;
                    break;
                case 'iron':
                    user.iron = user.iron + offer.quantity;
                    break;
                case 'food':
                    user.food = user.food + offer.quantity;
                    break;
                case 'sword':
                    user.sword = user.sword + offer.quantity;
                    break;
                case 'bow':
                    user.wood = user.wood + offer.quantity;
                    break;
                case 'armor':
                    user.armor = user.armor + offer.quantity;
                    break;
            }

            if(ownerUser.discordId == user.discordId){
                user.money = user.money + offer.price;
                resp = userController.updateUser(user);
                if(!(resp)){
                    return message.channel.send(`<@${message.author.id}>, an Error ocurred, try again later`);
                }
                offer.active = false;
                offer.buyerDiscordId = user.discordId;
                offer.buyerDiscordUsername = user.username;
                resp = globalMarketController.updateOffer(offer);
                if(!(resp)){
                    return message.channel.send(`<@${message.author.id}>, an Error ocurred, try again later`);
                }
                return message.channel.send(`<@${message.author.id}> you got your ${offer.quantity}x ${offer.resource} back from the global market`);
            }

            ownerUser.money = ownerUser.money + offer.price;

            resp = userController.updateUser(user);
            if(!(resp)){
                return message.channel.send(`<@${message.author.id}>, an Error ocurred, try again later`);
            }
            resp = userController.updateUser(ownerUser);
            if(!(resp)){
                return message.channel.send(`<@${message.author.id}>, an Error ocurred, try again later`);
            }
            offer.active = false;
            offer.buyerDiscordId = user.discordId;
            offer.buyerDiscordUsername = user.username;
            resp = globalMarketController.updateOffer(offer);
            if(!(resp)){
                return message.channel.send(`<@${message.author.id}>, an Error ocurred, try again later`);
            }
            return message.channel.send(`<@${message.author.id}> bought ${offer.quantity}x ${offer.resource} from ${offer.ownerDiscordUsername} for ${offer.price/100} golds`);
        } 
        else{
            return message.channel.send(`<@${message.author.id}>, Offer Id not found`);
        }
    }
    catch(e)
    {
        message.channel.send(`An error has ocurred, please check if you mentioned a person. For more info check /emp help`); 
    }
}