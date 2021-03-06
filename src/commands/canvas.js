const Canvas = require('canvas');
const Discord = require("discord.js");

const { registerFont } = require('canvas');
const userController = require('../controllers/userController')
// Fonts must be loaded from the filesystem
registerFont('./src/img/PressStart.ttf', { family: 'PressStart', weight: 'normal' });

calcDamage = (qtdA, qtdW, oCastleLife)=>{
    atkA = qtdA * 2;
    atkW = qtdW * 4;
    dps = atkA + atkW;
    return oCastleLife + dps
}
exports.battle = async(message,client) => {
    try{
        var user = await userController.findById(message.author.id);
        var usero = await userController.findById(message.mentions.members.first().user.id)
       
        if(user != null)
        {   
            if(message.mentions.members.first().user.id != client.user.id)
            {
                if(usero != null)
                {  
                    if(user.discordId != usero.discordId)
                    {
                        let cName = message.author.username;
                        cNameS = cName.split('');
                        
                        cName4 = cName.substring(0,4)
                         //var member2 = msg.author.avatarURL;
                        var oName = message.mentions.members.first().user.username;
                        oNameS = oName.split('');
                        for (const l of oNameS) {
                            if (oNameS.length-1 > 2) {
                                oNameS.pop();
                            }
                        }
                        oName4 = oName.substring(0,4);
                        var el = user.empireLevel;
                        var elo = usero.empireLevel;
                        var life = 150 * Math.pow(2,user.empireLevel);
                        var lifeo = 150 * Math.pow(2,usero.empireLevel);
                        
                        var woodo = Math.floor(usero.wood/10);
                        var irono = Math.floor(usero.iron/10);
                        var foodo = Math.floor(usero.food/10);
                        var stoneo = Math.floor(usero.stone/10);
                        var wood = Math.floor(user.wood/10);
                        var iron = Math.floor(user.iron/10);
                        var food = Math.floor(user.food/10);
                        var stone = Math.floor(user.stone/10);

                        var dmg = calcDamage(user.archers,user.warriors,life);
                        var dmgo = calcDamage(usero.archers,usero.warriors,lifeo);

                        const canvas = Canvas.createCanvas(700, 250);
                        const ctx = canvas.getContext('2d');
                        // let embed = new Discord.RichEmbed()
                        //     .setImage(message.member.avatarURL)
                        //     .setColor('#275BF0')
                        // message.channel.send(embed)

                        const background = await Canvas.loadImage('./src/img/battle.png');
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                        ctx.strokeStyle = '#74037b';
                        ctx.strokeRect(0, 0, canvas.width, canvas.height);
                        
                        const cCastle = await Canvas.loadImage(`./src/img/castle${el}.png`);
                        const oCastle = await Canvas.loadImage(`./src/img/castle${elo}invert.png`);
                        ctx.drawImage(cCastle, 30, 60, 140, 140);
                        ctx.drawImage(oCastle, 540, 60, 140, 140);        
                        
                        if(message.author.avatarURL!=null)
                        {
                            const avatar1 = await Canvas.loadImage(message.author.avatarURL);
                            ctx.drawImage(avatar1, 0, 0, 50, 50);
                        }
                        else
                        {
                            const avatar1 = await Canvas.loadImage('https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png');
                            ctx.drawImage(avatar1, 0, 0, 50, 50);
                        }
                        
                        if(message.mentions.members.first().user.avatarURL!=null)
                        {
                            const avatar2 = await Canvas.loadImage(message.mentions.members.first().user.avatarURL);
                            ctx.drawImage(avatar2, 650, 0, 50, 50);
                        }
                        else
                        {                      
                              const avatar2 = await Canvas.loadImage('https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png');
                              ctx.drawImage(avatar2, 650, 0, 50, 50);
                        }

                        // Writing text
                        ctx.font = '32px PressStart';
                        ctx.fillStyle = '#000';
                        //ctx.strokeStyle = '#5f574f';
                        ctx.lineWidth = 10;
                        ctx.fillText(oName4, 500, 40);
                        ctx.fillText(cName4, 68, 40);
                        //CC0000
                        //FFFF00
                        const battleEmbed = {
                            color: 0x0099ff,
                            title: '⚔ Battle ⚔',
                            description: `
                                    Epic battle between ${cName+" and "+oName}
                                    \n ▶ Preparing army...
                                `,
                            fields: [
                                {
                                    name: `${cName} Army:`,
                                    value: `
                                        🏹X${user.archers}  ⚔X${user.warriors} 
                                        \n ❤ Castle Life: ${life}
                                        \n 🏛 Empire level: ${el} 
                                    `,
                                    inline: true,
                                },
                                {
                                    name: `${oName} Army:`,
                                    value: `
                                        🏹X${usero.archers}  ⚔X${usero.warriors}  
                                        \n ❤ Castle Life: ${lifeo}
                                        \n 🏛 Empire level: ${elo} 
                                    `,
                                    inline: true,
                                },
                                {
                                    name: `Enemy resourses avaliable to loot`,
                                    value: `
                                        🌲x${woodo} 🔗x${irono} 🌕x${stoneo} 🍗x${foodo}   
                                    `,
                                    inline: false,
                                }
                                // {   
                                //     name: "Results",
                                //     value: `
                                //         🏆  You Won! and got 🌲x9  🔗x9 🌕x7 🍗x3  
                                //     `,
                                //     inline: false,
                                // }
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: '@EmpireBot',
                                icon_url: 'https://i.imgur.com/tbzriFR.png',
                            },
                        };

                        message.channel.send({
                            files: [{
                                attachment: canvas.toBuffer(),
                                name: 'battle.jpg'
                            }],
                            embed: battleEmbed
                        }).then(msg => 
                            {
                                setTimeout(async function() 
                                {
                                    if(dmg>dmgo)
                                    {
                                        user.wood = user.wood + woodo;
                                        user.stone = user.stone + stoneo;
                                        user.iron = user.iron + irono;
                                        user.food = user.food + foodo;  
                                        user.wins++;

                                        usero.wood = usero.wood - woodo;
                                        usero.stone = usero.stone - stoneo;
                                        usero.iron = usero.iron - irono;
                                        usero.food = usero.food - foodo;
                                        usero.defeats++;

                                        var archer = Math.floor(Math.random()*(user.archers-(user.archers/2)));
                                        var warrior = Math.floor(Math.random()*(user.warriors-(user.warriors/2)));

                                        var archero = Math.floor(Math.random()*(usero.archers-(usero.archers/2)));
                                        var warrioro = Math.floor(Math.random()*(usero.warriors-(usero.warriors/2)));

                                        user.archers = (user.archers/2) + ((user.archers/2) - archer);
                                        user.warriors = (user.warriors/2) + ((user.warriors/2) - warrior) ;

                                        usero.archers = (usero.archers/2) + ((usero.archers/2) - archero) ;
                                        usero.warriors = (usero.warriors/2) + ((usero.warriors/2) - warrioro) ;

                                        await userController.updateUser(user);
                                        await userController.updateUser(usero);

                                        lifeo = 0;
                                        life = Math.random() * (life - 1) + 1;

                                        let embed= new Discord.RichEmbed(
                                            {
                                                title:battleEmbed.title,
                                                timestamp: battleEmbed.timestamp,
                                                footer: battleEmbed.footer,
                                                fields:[{
                                                    name: `${cName} Army:`,
                                                    value: `
                                                        🏹X${user.archers}  ⚔X${user.warriors} 
                                                        \n ❤ Castle Life: ${Math.ceil(life)}
                                                        \n 🏛 Empire level: ${el} 
                                                    `,
                                                    inline: true,
                                                },
                                                {
                                                    name: `${oName} Army:`,
                                                    value: `
                                                        🏹X${usero.archers}  ⚔X${usero.warriors}  
                                                        \n ❤ Castle Life: ${lifeo}
                                                        \n 🏛 Empire level: ${elo} 
                                                    `,
                                                    inline: true,
                                                },
                                                {
                                                    name:"  **Results**", 
                                                    value:`🏆  <@${message.author.id}> Won! and got 🌲x${woodo} 🔗x${irono} 🌕x${stoneo} 🍗x${foodo}\n  `,
                                                    inline:true
                                                },
                                                {
                                                    name:"🚶🚶 **Returned troops**", 
                                                    value:`Your brave soldiers returned, but, as in all battles there may be casualties, you lost ${archer} archers and ${warrior} warriors \n 
                                                    Now you have ${user.archers} archers and ${user.warriors} warriors `,
                                                    inline:false
                                                }],
                                                description:"Epic battle between " + cName + " and "+ oName +"\n ✅ Battle Finished",
                                                color:0x00ff00,

                                            }
                                        );
                                        msg.edit(
                                        {
                                            files: [{
                                                attachment: canvas.toBuffer(),
                                                name: 'battle.jpg'
                                            }],
                                            embed: embed
                                        });

                                        msg.channel.send("<@"+ message.mentions.members.first().user.id + "> You was attacked and lost " + archero  + " archers and " + warrioro + " warriors\n Now your army have " 
                                        + usero.archers + " archers and " + usero.warriors + " warriors");

                                        

                                    


                                    }
                                    else if(dmg<dmgo)
                                    {
                                        user.wood = user.wood - wood;
                                        user.stone = user.stone - stone;
                                        user.iron = user.iron - iron;
                                        user.food = user.food - food;  
                                        usero.defeats++;

                                        usero.wood = usero.wood + wood;
                                        usero.stone = usero.stone + stone;
                                        usero.iron = usero.iron + iron;
                                        usero.food = usero.food + food;
                                        usero.wins++;

                                        var archer = Math.floor(Math.random()*(user.archers-(user.archers/2)));
                                        var warrior = Math.floor(Math.random()*(user.warriors-(user.warriors/2)));

                                        var archero = Math.floor(Math.random()*(usero.archers-(usero.archers/2)));
                                        var warrioro = Math.floor(Math.random()*(usero.warriors-(usero.warriors/2)));

                                        user.archers = (user.archers/2) + ((user.archers/2) - archer);
                                        user.warriors = (user.warriors/2) + ((user.warriors/2) - warrior) ;

                                        usero.archers = (usero.archers/2) + ((usero.archers/2) - archero) ;
                                        usero.warriors = (usero.warriors/2) + ((usero.warriors/2) - warrioro) ;

                                        await userController.updateUser(user);
                                        await userController.updateUser(usero);

                                        life = 0;
                                        lifeo = Math.random() * (lifeo - 1) + 1;

                                        let embed= new Discord.RichEmbed(
                                            {
                                                title:battleEmbed.title,
                                                timestamp: battleEmbed.timestamp,
                                                footer: battleEmbed.footer,
                                                fields:[{
                                                    name: `${cName} Army:`,
                                                    value: `
                                                        🏹X${user.archers}  ⚔X${user.warriors} 
                                                        \n ❤ Castle Life: ${life}
                                                        \n 🏛 Empire level: ${el} 
                                                    `,
                                                    inline: true,
                                                },
                                                {
                                                    name: `${oName} Army:`,
                                                    value: `
                                                        🏹X${usero.archers}  ⚔X${usero.warriors}  
                                                        \n ❤ Castle Life: ${Math.ceil(lifeo)}
                                                        \n 🏛 Empire level: ${elo} 
                                                    `,
                                                    inline: true,
                                                },
                                                {
                                                    name:"Results", 
                                                    value:`❌  <@${message.author.id}> Lose! and lost 🌲x${wood} 🔗x${iron} 🌕x${stone} 🍗x${food}\n`,
                                                    inline:false
                                                },
                                                {
                                                    name:"🚶🚶 **Returned troops**", 
                                                    value:`Your brave soldiers returned, but, as in all battles there may be casualties, you lost ${archer} archers and ${warrior} warriors \n 
                                                    Now you have ${user.archers} archers and ${user.warriors} warriors `,
                                                    inline:false
                                                }],
                                                description:"Epic battle between " + cName + " and "+ oName +"\n ✅ Battle Finished",
                                                color:0xff0000,

                                            }
                                        );
                                        msg.edit(
                                        {
                                            files: [{
                                                attachment: canvas.toBuffer(),
                                                name: 'battle.jpg'
                                            }],
                                            embed: embed
                                        });

                                        msg.channel.send("<@"+ message.mentions.members.first().user.id + "> You was attacked and lost " + archero + " archers and " + warrioro + " warriors\n Now your army have " 
                                        + usero.archers + " archers and " + usero.warriors + " warriors");
                                    }
                                    else if (dmg==dmgo)
                                    {
                                    


                                        var archer = Math.floor(Math.random()*(user.archers-(user.archers/2)));
                                        var warrior = Math.floor(Math.random()*(user.warriors-(user.warriors/2)));

                                        var archero = Math.floor(Math.random()*(usero.archers-(usero.archers/2)));
                                        var warrioro = Math.floor(Math.random()*(usero.warriors-(usero.warriors/2)));

                                        user.archers = (user.archers/2) + ((user.archers/2) - archer);
                                        user.warriors = (user.warriors/2) + ((user.warriors/2) - warrior) ;

                                        usero.archers = (usero.archers/2) + ((usero.archers/2) - archero) ;
                                        usero.warriors = (usero.warriors/2) + ((usero.warriors/2) - warrioro) ;

                                        await userController.updateUser(user);
                                        await userController.updateUser(usero);

                                        let embed= new Discord.RichEmbed(
                                            {
                                                title:battleEmbed.title,
                                                timestamp: battleEmbed.timestamp,
                                                footer: battleEmbed.footer,
                                                fields:[ 
                                                {
                                                    name: `${cName} Army:`,
                                                    value: `
                                                        🏹X${user.archers}  ⚔X${user.warriors} 
                                                        \n ❤ Castle Life: 0
                                                        \n 🏛 Empire level: ${el} 
                                                    `,
                                                    inline: true,
                                                },
                                                {
                                                    name: `${oName} Army:`,
                                                    value: `
                                                        🏹X${usero.archers}  ⚔X${usero.warriors}  
                                                        \n ❤ Castle Life: 0
                                                        \n 🏛 Empire level: ${elo} 
                                                    `,
                                                    inline: true,
                                                },
                                                {
                                                    name:"Results", 
                                                    value:`🤝  Tie! Nodoby earned resource\n`,
                                                    inline:false
                                                },
                                                {
                                                    name:"🚶🚶 **Returned troops**", 
                                                    value:`Your brave soldiers returned, but, as in all battles there may be casualties, you lost ${archer} archers and ${warrior} warriors \n 
                                                    Now you have ${user.archers} archers and ${user.warriors} warriors `,
                                                    inline:false
                                                }],
                                                description:"Epic battle between " + cName + " and "+ oName +"\n ✅ Battle Finished",
                                                color:0xffffff,

                                            }
                                        );
                                        msg.edit( 
                                        {
                                            files: [{
                                                attachment: canvas.toBuffer(),
                                                name: 'battle.jpg'
                                            }],
                                            embed: embed
                                        });

                                        msg.channel.send("<@"+message.mentions.members.first().user.id + "> You was attacked and lost " + archero + " archers and " + warrioro + " warriors\n Now your army have " 
                                        + usero.archers + " archers and " + usero.warriors + " warriors");
                                    }
                                }, 10000)}); 
                                
                    }
                    else
                    {
                        message.channel.send("You cannot attack yourself")
                    }  
                }
                else
                {
                    message.channel.send("Mentioned user not found or isn't in the game")
                }
            }
            else
            {
                message.channel.send("To battle with Empire bot type /emp battle")
            }
        }
        else
        {
            message.channel.send(" <@"+message.author.id + "> , You isn't in the game\n Please type /emp start to join ")
        }
    }
    catch (e){
        message.channel.send(`An error has ocurred, please check if you mentioned a person. For more info check /emp help`);    
    }

}