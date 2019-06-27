const disc = require("discord.js");
const userController = require("../controllers/userController.js");

exports.tradeMessage = (message, args) => {
    
    const res = args.split(' ');
    const tradable = [`wood`,`stone`,`iron`,`food`,`sword`,`armor`,`bow`];
    const quantof = parseInt(res[2]);
    const quantwa = parseInt(res[4]);
    const offered = res[3];
    const wanted = res[5];
    // Create a reaction collector
    const filter = (reaction, user) => ['✅','❌'].includes(reaction.emoji.name) && user.id === message.mentions.members.first().user.id;

    if(!isNaN(quantof) && !isNaN(quantwa) && offered != undefined && wanted != undefined){
        if(tradable.includes(offered) && tradable.includes(wanted))
        {
            try{
                let embed = new disc.RichEmbed()
                .setAuthor(message.author.username)
                .setColor('#AF33aa')
                .setTitle(`Trade offer - ${message.author.username} wants to trade with ${message.mentions.members.first().user.username}`)
                .setThumbnail(message.mentions.members.first().user.avatarURL)
                .addBlankField(true)
                .addField(`${message.author.username} offers ${quantof} ${offered} for ${quantwa} ${wanted}`,`**React to confirm or deny.**`)
                .addBlankField(true)
                .setFooter('@EmpireBot')
                .setTimestamp();
                message.channel.send(embed)
                    .then(msg => {
                        msg.react('✅')
                        .then(()=>{
                            msg.react('❌');
                        });
                        ///// AWAIT Reactions
                        msg.awaitReactions(filter, { time: 15000 })
                            .then(collected => {
                                //console.log(`Collected ${collected.size} reactions`)
                                //console.log(collected);
                                const reaction = collected.first();

                                if (reaction.emoji.name === '✅') {
                                    acceptTrade(message,message.mentions.members.first().user.id,quantof,quantwa,offered,wanted);
                                } else {
                                    denyTrade(message);
                                }
                                
                            })
                            .catch( (err) => {
                                //message.reply('you reacted with neither a yes or no. Canceling the trade.');
                                console.log(err);
                                
                            });
                        //////
                    });
                        
            }
            catch(error){
                message.channel.send(`An error has ocurred, please check if you mentioned a person. For more info check /emp help`);
            }
        }
        else{message.channel.send(`You can't trade ${offered} or ${wanted}. Please check your spelling.`)}
    }
    else{
        message.channel.send(`An error has ocurred, please check if you wrote the command right. For more info check /emp help`);
    }

}

// /emp trade @JapaNegro#6079 30 wood 30 iron

async function acceptTrade(message,targetId,quantof,quantwa,offered,wanted){
    let userMain = await userController.findById(message.author.id);
    let guest = await userController.findById(targetId);

    changeValue(message,userMain,offered,quantof,'substract');
    changeValue(message,guest,wanted,quantwa,'substract') 

    userMain = await userController.findById(message.author.id);
    guest = await userController.findById(targetId)
    .then(() => {                
        changeValue(message,guest,offered,quantof,'add');
        changeValue(message,userMain,wanted,quantwa,'add');
    });
    
    message.reply(`${message.mentions.members.first().user.username} accepted your trade offer`);
}

function denyTrade(message){
    message.reply(`${message.mentions.members.first().user.username} rejected your trade offer`);
}

//operation -> add = add to user resources;  substract = substract the user resources
async function changeValue(msg,user,resource,quantity,operation){

    if(operation == 'add')
    {
        switch(resource)
        {
            case 'wood':
                    user.wood = user.wood+quantity;
                    resp = await userController.updateUser(user);;
                    if(resp){
                        return msg.channel.send(`${quantity} woods were added\n ${user.name}, you now have ${user.wood} woods` );
                    }
                    msg.channel.send(`Not enough ${resource}`);
                    throw new error("Not enough resource");
            break;   
            case 'stone':                           
                    user.stone = user.stone+quantity;
                    resp = await userController.updateUser(user);;
                    
                    if(resp){
                        return msg.channel.send(`${quantity} stones were added\n  ${user.name}, you now have ${user.stone} stones` );
                    }
                    return msg.channel.send(`Not enough ${resource}`);
            break;  
            case 'food':
                    user.food = user.food+quantity;
                    resp = await userController.updateUser(user);;
                    if(resp){
                        return msg.channel.send(`${quantity} food were added\n  ${user.name}, you now have ${user.food} foods` );
                    }
                    return msg.channel.send(`Not enough ${resource}`);
            break; 
            case 'iron':
                    user.iron = user.iron+quantity;
                    resp = await userController.updateUser(user);;
                    if(resp){
                        return msg.channel.send(`${quantity} irons were added\n  ${user.name}, you now have ${user.iron} irons` );
                    }
                    return msg.channel.send(`Not enough ${resource}`);
            break; 
            case 'sword':
                    user.sword = user.sword+quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        return msg.channel.send(`${quantity} swords were added\n  ${user.name}, you now have ${user.sword} swords` );
                    }
                    return msg.channel.send(`Not enough ${resource}`);
            break; 
            case 'bow':
                    user.bow = user.bow+quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        return msg.channel.send(`${quantity} bows were added\n  ${user.name}, you now have ${user.bow} bows` );
                    }
                    return msg.channel.send(`Not enough ${resource}`);
            break; 
            case 'armor':
                    user.armor = user.armor+quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        return msg.channel.send(`${quantity} armors were added\n  ${user.name}, you now have ${user.armor} armors` );
                    }
                    return msg.channel.send(`Not enough ${resource}`);
            break; 
            default:
                    msg.channel.send("Unable to find this resource ");
            break;
        }
    }
    else if(operation == 'substract'){
        switch(resource)
        {
            case 'wood':
                if(quantity<=user.wood)
                {
                    user.wood = user.wood-quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        msg.channel.send(`${quantity} woods were substracted\n  ${user.name}, you now have ${user.wood} woods` );
                    }
                }
                else
                {
                    return msg.channel.send(`Not enough ${resource}`);
                }
            break;   
            case 'stone':                           
                if(quantity<=user.stone)
                {
                    user.stone = user.stone-quantity;
                    resp = await userController.updateUser(user);
                    
                    if(resp){
                        msg.channel.send(`${quantity} stones were substracted\n  ${user.name}, you now have ${user.stone} stones` );
                    }
                }
                else
                {
                    return msg.channel.send(`Not enough ${resource}`);
                }
            break;  
            case 'food':
                if(quantity<=user.food)
                {
                    user.food = user.food-quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        msg.channel.send(`${quantity} food were substracted\n  ${user.name}, you now have ${user.food} foods` );
                    }
                }
                else
                {
                    return msg.channel.send(`Not enough ${resource}`);
                }
            break; 
            case 'iron':
                if(quantity<=user.iron)
                {
                    user.iron = user.iron-quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        msg.channel.send(`${quantity} irons were substracted\n  ${user.name}, you now have ${user.iron} irons` );
                    }
                }
                else
                {
                    return msg.channel.send(`Not enough ${resource}`);
                }
            break; 
            case 'sword':
                if(quantity<=user.sword)
                {
                    user.sword = user.sword-quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        msg.channel.send(`${quantity} swords were substracted\n  ${user.name}, you now have ${user.sword} swords` );
                    }
                }
                else
                {
                    return msg.channel.send(`Not enough ${resource}`);
                }
            break; 
            case 'bow':
                if(quantity<=user.bow)
                {
                    user.bow = user.bow-quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        msg.channel.send(`${quantity} bows were substracted\n  ${user.name}, you now have ${user.bow} bows` );
                    }
                }
                else
                {
                    return msg.channel.send(`Not enough ${resource}`);
                }
            break; 
            case 'armor':
                if(quantity<=user.armor)
                {
                    user.armor = user.armor-quantity;
                    resp = await userController.updateUser(user);
                    if(resp){
                        msg.channel.send(`${quantity} armors were substracted\n  ${user.name}, you now have ${user.armor} armors` );
                    }
                }
                else
                {
                    return msg.channel.send(`Not enough ${resource}`);
                }
            break; 
            default:
                    msg.channel.send("Unable to find this resource ");
            break;
        }
    }
    
}

