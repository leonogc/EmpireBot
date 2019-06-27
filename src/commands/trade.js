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

///// AWAIT Reactions
/*msg.awaitReactions(filter, { time: 15000 })
                            .then(collected => {
                                //console.log(`Collected ${collected.size} reactions`)
                                //console.log(collected);
                                const reaction = collected.first();

                                if (reaction.emoji.name === '✅') {
                                    //acceptTrade(message,args);
                                    message.channel.send("sim");
                                } else {
                                    //denyTrade(message);
                                    message.channel.send("não");
                                }
                                
                            })
                            .catch( (err) => {
                                //message.reply('you reacted with neither a yes or no. Canceling the trade.');
                                console.log(err);
                                
                            });*/



/*const colector = msg.createReactionCollector(filter, {time: 15000});

                        colector.on('collect', r => {
                            console.log(r);
                            console.log("///////////////////////////\n\n");
                            const reaction = r.message.reactions;
                            console.log(reaction);
                            console.log("///////////////////////////");
                                
                                if (reaction.emoji.name === '✅') {
                                    //acceptTrade(message,args);
                                    message.channel.send("sim");
                                } else {
                                    //denyTrade(message);
                                    message.channel.send("não");
                                }
                        }); */

async function acceptTrade(message,targetId,quantof,quantwa,offered,wanted){
    userMain = await userController.findById(message.author.id);
    guest = await userController.findById(targetId);

     
    
    message.reply(`${message.mentions.members.first().user.username} accepted your trade offer`);
}

function denyTrade(message){
    message.reply(`${message.mentions.members.first().user.username} rejected your trade offer`);
}
/// /emp trade @EmpireBot#7392 30 iron 30 wood