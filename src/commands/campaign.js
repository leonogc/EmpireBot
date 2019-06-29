const Canvas = require('canvas');
const Discord = require("discord.js");

const { registerFont } = require('canvas');

const botres= [100,75,100,125,15,20];
const botTitle = ['Noob','Beginner','','','Great','','','','',''];

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
        if(user != null)
        {   
            let cName = message.author.username;
            cNameS = cName.split('');
            for (const l of cNameS) {
                if (cNameS.length-1 > 2) {
                    cNameS.pop();
                }
            }
            cName4 = cNameS.join('')

            var el = user.empireLevel;
            var life = 150 * Math.pow(2,user.empireLevel);
            var lifeo = 100 + (user.campaignLevel-1) * 300;
            
            var woodb = botres[0] * user.campaignLevel;
            var ironb = botres[1] * user.campaignLevel;
            var foodb = botres[2] * user.campaignLevel;
            var stoneb = botres[3] * user.campaignLevel;
            var warriorb = botres[4] * user.campaignLevel;
            var archerb = botres[5] * user.campaignLevel;

            if(user.campaignLevel < 10)
            {
                var volta = "Be careful, EmpireBot will grow stronger. It feeds in anger. Be prepared!";
            } 
            else
            {
                var volta = "EmpireBot will recompose its army";
            }


            var dmg = calcDamage(user.archers,user.warriors,life);
            var dmgo = calcDamage(archerb,warriorb,lifeo);

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
            const oCastle = await Canvas.loadImage(`./src/img/castle${el}invert.png`);
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

            const avatar2 = await Canvas.loadImage(client.user.avatarURL);
            ctx.drawImage(avatar2, 650, 0, 50, 50);
            // Writing text
            ctx.font = '32px PressStart';
            ctx.fillStyle = '#000';
            //ctx.strokeStyle = '#5f574f';
            ctx.lineWidth = 10;
            ctx.fillText('Bot', 500, 40);
            ctx.fillText(cName4, 68, 40);
            //CC0000
            //FFFF00
            const battleEmbed = {
                color: 0x0099ff,
                title: '⚔ Battle ⚔',
                description: `
                        Epic battle between ${cName} and EmpireBot, the ${botTitle[user.campaignLevel-1]} 
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
                        name: `Empire Bot Army:`,
                        value: `
                            🏹X${archerb}  ⚔X${warriorb}  
                            \n ❤ Castle Life: ${lifeo}
                            \n 🏛 Empire level: ${el} 
                        `,
                        inline: true,
                    },
                    {
                        name: `Enemy resourses avaliable to loot`,
                        value: `
                            🌲x${woodb} 🔗x${ironb} 🌕x${stoneb} 🍗x${foodb}   
                        `,
                        inline: false,
                    }
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
            }).
            then(msg => 
            {
                setTimeout(async function() 
                {
                    if(dmg>dmgo)
                    {
                        user.wood = user.wood + woodb;
                        user.stone = user.stone + stoneb;
                        user.iron = user.iron + ironb;
                        user.food = user.food + foodb;  
                        user.campaignLevel++

                        var archer = Math.floor(Math.random()*(user.archers-(3*user.archers/4)));
                        var warrior = Math.floor(Math.random()*(user.warriors-(3*user.warriors/4)));


                        user.archers = (3*user.archers/4) + ((user.archers/4) - archer);
                        user.warriors = (3*user.warriors/4) + ((user.warriors/4) - warrior) ;

                        await userController.updateUser(user);


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
                                    name: `EmpireBot Army:`,
                                    value: `
                                        🏹X0  ⚔X0
                                        \n ❤ Castle Life: ${lifeo}
                                        \n 🏛 Empire level: ${el} 
                                    `,
                                    inline: true,
                                },
                                {
                                    name:"  **Results**", 
                                    value:`🏆  <@${message.author.id}> you Won! and got 🌲x${woodb} 🔗x${ironb} 🌕x${stoneb} 🍗x${foodb}.\n ${volta}`,
                                    inline:true
                                },
                                {
                                    name:"🚶🚶 **Returned troops**", 
                                    value:`Your brave soldiers returned, but, as in all battles there may be casualties, you lost ${archer} archers and ${warrior} warriors \n 
                                    Now you have ${user.archers} archers and ${user.warriors} warriors `,
                                    inline:false
                                }],
                                description:"Epic battle between " + cName + " and EmpireBot, the"+ botTitle[user.campaignLevel-1] +"\n ✅ Battle Finished",
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
                    }
                    else if(dmg<dmgo)
                    {
                        var archer = Math.floor(Math.random()*(user.archers-(3*user.archers/4)));
                        var warrior = Math.floor(Math.random()*(user.warriors-(3*user.warriors/4)));

                        user.archers = (3*user.archers/4) + ((user.archers/4) - archer);
                        user.warriors = (3*user.warriors/4) + ((user.warriors/4) - warrior) ;

                        await userController.updateUser(user);

                        var archero = Math.floor(Math.random()*(archerb-(archerb/2)));
                        var warrioro = Math.floor(Math.random()*(warriorb-(warriorb/2)));
                        
                        arcehrb = (archerb/2) + ((archerb/2) - archero);
                        warriorb = (warriorb/2) + ((warriorb/2) - warrioro);

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
                                    name: `EmpireBot Army:`,
                                    value: `
                                        🏹X${archerb}  ⚔X${warriorb}  
                                        \n ❤ Castle Life: ${Math.ceil(lifeo)}
                                        \n 🏛 Empire level: ${el} 
                                    `,
                                    inline: true,
                                },
                                {
                                    name:"Results", 
                                    value:`❌  <@${message.author.id}> you Lose! `,
                                    inline:false
                                },
                                {
                                    name:"🚶🚶 **Returned troops**", 
                                    value:`Your brave soldiers returned, but, as in all battles there may be casualties, you lost ${archer} archers and ${warrior} warriors \n 
                                    Now you have ${user.archers} archers and ${user.warriors} warriors `,
                                    inline:false
                                }],
                                description:"Epic battle between " + cName + " and EmpireBot, the"+ botTitle[user.campaignLevel-1] +"\n ✅ Battle Finished",
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

                    }
                }, 10000)
            }); 
        }
        else
        {
            message.channel.send(" <@"+message.author.id + "> , You isn't in the game\n Please type /emp start to join ")
        }
    }
    catch (e){
        message.channel.send(`⚔ Olokinho meo ⚔ ${e}`);
    }

}