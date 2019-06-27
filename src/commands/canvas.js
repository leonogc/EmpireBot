const Canvas = require('canvas');
const Discord = require("discord.js");
var inicio, vida1, vida2, fight, x = 0, n, critico = 150;
var vida1 = 300;
var vida2 = 300;
var golpes = [
    "socou",
    "chutou",
    "deu uma facada",
    "deu uma garrafada",
    "tacou a mãe",
    "fez comer salada",
    "deu uma barrigada",
    "amassou",
    "cuspiu na cara",
    "robou o alimento",
    "chamou de gordo",
    "chingou de magro",
    "deu uma caderada",
    "chamou um vegano",
    "deu leite desnatado",
    "falou q a mãe nasceu pelada",
    "mordeu",
    "deu um Tapão"
];

const { registerFont } = require('canvas');
// Fonts must be loaded from the filesystem
registerFont('./src/img/PressStart.ttf', { family: 'PressStart', weight: 'normal' });

exports.sendMessage = async(message, c, o) => {
    
    try{
        let cName = message.author.username;
        cName = cName.split('');
        for (const l of cName) {
            if (cName.length-1 > 2) {
                cName.pop();
            }
        }
        cName = cName.join('')
        //var member2 = msg.author.avatarURL;
        var oName = message.mentions.members.first().user.username;
        oName = oName.split('');
        for (const l of oName) {
            if (oName.length-1 > 2) {
                oName.pop();
            }
        }
        oName = oName.join('')
        
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

        //const avatar = await Canvas.loadImage('./src/img/shop2.png');
        // Move the image downwards vertically and constrain its height to 200, so it's a square
        
        
        const avatar1 = await Canvas.loadImage(message.author.avatarURL);
        ctx.drawImage(avatar1, 0, 0, 50, 50);

        const avatar2 = await Canvas.loadImage(message.mentions.members.first().user.avatarURL);
        ctx.drawImage(avatar2, 650, 0, 50, 50);
        // Writing text
        ctx.font = '32px PressStart';
        ctx.fillStyle = '#000';
        //ctx.strokeStyle = '#5f574f';
        ctx.lineWidth = 10;
        ctx.fillText(oName, 500, 40);
        ctx.fillText(cName, 68, 40);

        const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
        
        let embedq = new Discord.RichEmbed()
            .setImage(message.mentions.members.first().user.avatarURL)
            .setColor('#275BF0')
        const embed2 = {
            color: 0x0099ff,
            title: '⚔ Battle ⚔',
            author: {
                name: 'EmpireBot',
                icon_url: 'https://cdn.discordapp.com/attachments/592078256065478696/592875157052325899/empire3.png',
            },
            description: `Epic battle between ${message.author.username+" and "+message.mentions.members.first().user.username}`,
            fields: [
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                }
            ],
            timestamp: new Date(),
            footer: {
                text: 'Awesome battle',
                icon_url: 'https://cdn.discordapp.com/attachments/592078256065478696/592875157052325899/empire3.png',
            },
        };
        message.channel.send('⚔ Battle begin ⚔', {
            files: [{
                attachment: canvas.toBuffer(),
                name: 'file.jpg'
            }],
            embed: embed2
        }).then((msg)=> {
            console.log(msg.embeds[0])
            setTimeout(function(){
              msg.edit(embed2)
            }, 1000)
          })

       //message.channel.send(`⚔ Battle begin ⚔`, attachment, embed);
    }catch{
        message.channel.send(`⚔ Olokinho meo ⚔`);
    }
}

exports.help = (msg) => {
    msg.channel.send('help');
}