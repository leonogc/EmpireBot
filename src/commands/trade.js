const disc = require("discord.js");
const userController = require("../controllers/userController.js");

exports.tradeMessage = (message, args) => { //Called after /emp trade <mention> <quantity1> <resource1> <quantity2> <resource2>
    
    const res = args.split(' ');
    const tradable = [`wood`,`stone`,`iron`,`food`,`sword`,`armor`,`bow`];//List of tradable resources
    const quantof = parseInt(res[2]);//<quantity1>
    const quantwa = parseInt(res[4]);//<quantity2>
    const offered = res[3];//<resource1>
    const wanted = res[5];//<resource2>
    // Create a reaction filter
    const filter = (reaction, user) => ['✅','❌'].includes(reaction.emoji.name) && user.id === message.mentions.members.first().user.id;

    if(!isNaN(quantof) && !isNaN(quantwa) && offered != undefined && wanted != undefined){ //Checks if the values are correct
        if(tradable.includes(offered) && tradable.includes(wanted)) //See if the <resource1> <resource2> are in the tradable list
        {
            try{ //Send message
                let embed = new disc.RichEmbed()
                .setAuthor(message.author.username)
                .setColor('#AF33aa')
                .setTitle(`Trade offer - ${message.author.username} wants to trade with ${message.mentions.members.first().user.username}`)
                .setThumbnail(message.mentions.members.first().user.avatarURL)
                .addBlankField(true)
                .addField(`${message.author.username} offers ${quantof} ${offered} for ${quantwa} ${wanted}`,`**React to confirm or deny. You have 10 seconds**`)
                .addBlankField(true)
                .setFooter('@EmpireBot')
                .setTimestamp();
                message.channel.send(embed)
                    .then(msg => {
                        msg.react('✅')
                        .then(()=>{
                            msg.react('❌');
                        });
                        ///// AWAIT Reactions - it waits 10 sec to collect the reaction
                        msg.awaitReactions(filter, { time: 10000 })
                            .then(collected => {
                
                                const reaction = collected.first();

                                if (reaction.emoji.name === '✅') { //Accept
                                    acceptTrade(message,message.mentions.members.first().user.id,quantof,quantwa,offered,wanted);
                                } else { //Deny
                                    denyTrade(message);
                                }
                                
                            })
                            .catch( (err) => {
                                message.reply('you reacted with neither a yes or no. Canceling the trade.');
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

//Operation to accept the trade. 
async function acceptTrade(message,targetId,quantof,quantwa,offered,wanted){
    let userMain = await userController.findById(message.author.id); //Get who made the offer
    let guest = await userController.findById(targetId); //The one answering the offer

    var quantityResourceOf = await userController.findResQuant(userMain,offered); //Get the quantity of the resource offered
    quantityResourceOf = transformsToInt(quantityResourceOf); //Transforms the json object retrieved to int value
    
    var quantityResourceWa = await userController.findResQuant(guest,wanted);//Get the quantity of the resource wanted
    quantityResourceWa = transformsToInt(quantityResourceWa);//Transforms the json object retrieved to int value
    
    if(compareQuantity(userMain,offered,quantof) && compareQuantity(guest,wanted,quantwa)){ //Checks if the trade values are less then what they have
        await changeValue(message,userMain,offered,quantof,'substract'); //Subtract the traded resouces
        await changeValue(message,guest,wanted,quantwa,'substract'); //Subtract the traded resouces

        userMain = await userController.findById(message.author.id); //Find the user again to update it's resources
        guest = await userController.findById(targetId) //Find the user again to update it's resources
        .then(() => {                
            changeValue(message,guest,offered,quantof,'add'); //Add the traded resouces
            changeValue(message,userMain,wanted,quantwa,'add')//Add the traded resouces
            .then(()=>{
                message.reply(`${message.mentions.members.first().user.username} accepted your trade offer`);
            });
        });
    }
    else{
        message.channel.send(`One of you doesn't have enough resources.`);
        return;
    }   
}

//Message to deny the trade
function denyTrade(message){
    message.reply(`${message.mentions.members.first().user.username} rejected your trade offer`);
}

//Transforms the bd return to int
function transformsToInt(quantity){
    quantity = quantity.toString().substring(1,quantity.toString().length-1).trim(); //transforms this, e.g.-> { wood: 1233 } into this -> wood: 1233
    quantity = quantity.split(":"); //Get the previous string and split -> ['wood','1233']
    return parseInt(quantity[1].trim()); // returns the int value of the second position of the array
}

//Compare the quantity of resources
function compareQuantity(user,resource,tradeQuantity){
    switch(resource) //Checks what resource is being trade and see if the trade values are less then what the user has
    {
        case 'wood':
                UserValue = user.wood;
                if(UserValue >= tradeQuantity){
                    return true;
                }
                else{
                    return false;
                }
            break;
        case 'stone':
                UserValue = user.stone;
                if(UserValue >= tradeQuantity){
                    return true;
                }
                else{
                    return false;
                }
            break;
        case 'iron':
                UserValue = user.iron;
                if(UserValue >= tradeQuantity){
                    return true;
                }
                else{
                    return false;
                }
            break;
        case 'food':
                UserValue = user.food;
                if(UserValue >= tradeQuantity){
                    return true;
                }
                else{
                    return false;
                }
            break;
        case 'armor':
                UserValue = user.armor;
                if(UserValue >= tradeQuantity){
                    return true;
                }
                else{
                    return false;
                }
            break;
        case 'sword':
                UserValue = user.sword;
                if(UserValue >= tradeQuantity){
                    return true;
                }
                else{
                    return false;
                }
            break;
        case 'bow':
            UserValue = user.bow;
                if(UserValue >= tradeQuantity){
                    return true;
                }
                else{
                    return false;
                }
            break;
    }
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
                    return msg.channel.send(`Not enough ${resource}`);
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

