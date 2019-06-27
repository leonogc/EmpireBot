const discord = require("discord.js");
const usercontroller = require('../controllers/userController.js');

const arm = [1,1,1,1]
//Mapa da Array
// Warrior - Armor, Warrior - 
exports.recruitList = (msg,client) =>
{
    embed = new discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor('ff0000')
    .setTimestamp(msg.createdAt)
    .setThumbnail('https://i.imgur.com/Z7Aqq4D.png')
    .setDescription('Recruit soldiers to expand your army')
    .setFooter('@EmpireBot')
    .addField('🤺  **Warrior**', '**x** **'+ arm[0] +'** :shield: **Armor** &  ' + '  **x** **' + arm[1] + '** :crossed_swords: **Sword**')
    .addField('😐🏹 **Archer**','**x** **'+ arm[2] +'** :shield: **Armor** &  ' + '  **x** **' + arm[3] + '** :bow_and_arrow: **Bow**')
    .addBlankField()
    .addField('**Command**','/emp recruit <soldier> <quantity>')
    .addField('**Example**','/emp recruit warrior 2');

    msg.channel.send(embed);
}

exports.recruit = async (msg,args) =>
{
    userc = await usercontroller.findById(msg.author.id);
    lower = args.toLowerCase();
    space =  lower.split(" ");
    soldier = space[1].toString();
        if(space.length == 3){    
            qtd =parseInt(space[2]);
            if(!isNaN(qtd))
            {
                switch(soldier)
                {
                    case 'warrior':
                        gsta = arm[0]*qtd;
                        gsts = arm[1]*qtd;
                        if(userc.armor >= gsta && userc.sword >= gsts){
                            userc.armor=userc.armor-gsta;
                            userc.sword = userc.sword - gsts;
                            userc.warriors = userc.warriors + qtd;
                            resp = await usercontroller.updateUser(userc);
                            if(resp)
                            {
                                msg.channel.send("You spent " + gsta + " armors and " + gsts + " swords to recruit " + qtd + " warrior(s)");
                                msg.channel.send("Now you have "+userc.warriors+" warriors, "+userc.sword+" swords and " + userc.armor+ " armors");
                            }
                        }
                        else
                        {
                            msg.channel.send("Not enough armor or sword, you need " + gsta + " armors and " + gsts + " swords" )
                            
                        }
                    break;
                    case 'archer':
                        gsta = arm[2]*qtd;
                        gstb = arm[3]*qtd;
                        if(userc.armor >= gsta && userc.bow >= gstb){
                            userc.armor=userc.armor - gsta;
                            userc.bow = userc.bow - gstb;
                            userc.archers = userc.archers + qtd;
                            resp = await usercontroller.updateUser(userc);
                            if(resp)
                            {
                                msg.channel.send("You spent " + gsta + " armors and " + gstb + " bows to recruit " + qtd + " archer(s)");
                                msg.channel.send("Now you have "+userc.archers+" archers, "+userc.bow+" bows and " + userc.armor+ " armors");
                            }
                        }
                        else
                        {
                            msg.channel.send("Not enough armor or bow, you need " + gsta + " armors and " + gstb + " bows" );
                        }
                    break;
                    default:
                        msg.channel.send("Unable to find this soldier type");
                    break;
                }
            }
            else
            {
                msg.channel.send("Type a number");
            }
        }
        else
        {
            msg.channel.send('Type the quantity of soldiers')
        }
}
