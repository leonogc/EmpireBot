const Canvas = require('canvas');
const Discord = require("discord.js");

const { registerFont } = require('canvas');
const userController = require('../controllers/userController')
// Fonts must be loaded from the filesystem
registerFont('./src/img/PressStart.ttf', { family: 'PressStart', weight: 'normal' });

exports.sendMessage = async(message, c, o) => {
    calcDamage = (qtdA, qtdW, oCastleLife)=>{
        atkA = qtdA * 2;
        atkW = qtdW * 4;
        dps = atkA + atkW;
        return oCastleLife / dps
    }

        
}

exports.help = (msg) => {
    msg.channel.send('help');
}

battle = async()=>{
    try{
        let cName = message.author.username;
        cNameS = cName.split('');
        for (const l of cNameS) {
            if (cNameS.length-1 > 2) {
                cNameS.pop();
            }
        }
        cName4 = cNameS.join('')
        //var member2 = msg.author.avatarURL;
        var oName = message.mentions.members.first().user.username;
        oNameS = oName.split('');
        for (const l of oNameS) {
            if (oNameS.length-1 > 2) {
                oNameS.pop();
            }
        }
        oName4 = oNameS.join('')
        
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
        
        const cCastle = await Canvas.loadImage(`./src/img/castle${c}.png`);
        const oCastle = await Canvas.loadImage(`./src/img/castle${o}invert.png`);
        ctx.drawImage(cCastle, 30, 60, 140, 140);
        ctx.drawImage(oCastle, 540, 60, 140, 140);        
        
        const avatar1 = await Canvas.loadImage(message.author.avatarURL);
        ctx.drawImage(avatar1, 0, 0, 50, 50);

        const avatar2 = await Canvas.loadImage(message.mentions.members.first().user.avatarURL);
        ctx.drawImage(avatar2, 650, 0, 50, 50);
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
                        🏹X86  ⚔X85 
                        \n ❤ Castle Life: 300
                        \n 🏛 Empire level: 1 
                    `,
                    inline: true,
                },
                {
                    name: `<@!196037126914179072> Army:`,
                    value: `
                        🏹x86  ⚔x85 
                        \n ❤ Castle Life: 300
                        \n 🏛 Empire level: 1 
                    `,
                    inline: true,
                },
                {
                    name: `Enemy resourses`,
                    value: `
                        🌲x19  🔗x90 🌕x78 🍗x3560   
                    `,
                    inline: false,
                },
                {   
                    name: "Results",
                    value: `
                        🏆  You Won! and got 🌲x9  🔗x9 🌕x7 🍗x3  
                    `,
                    inline: false,
                }
            ],
            timestamp: new Date(),
            footer: {
                text: 'Awesome battle',
                icon_url: 'https://cdn.discordapp.com/attachments/592078256065478696/592875157052325899/empire3.png',
            },
        };

        message.channel.send('⚔ Battle Results ⚔', {
            files: [{
                attachment: canvas.toBuffer(),
                name: 'battle.jpg'
            }],
            embed: battleEmbed
        })

       //message.channel.send(`⚔ Battle begin ⚔`, attachment, embed);
    }catch (e){
        message.channel.send(`⚔ Olokinho meo ⚔${e}`);
    }

}