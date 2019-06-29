const discord = require("discord.js");
const usercontroller = require('../controllers/userController.js');

const arm = [2,1,7,1,1,5]
//Mapa da Array
// Warrior - Armor, Warrior - Sword, Warrior - Food, Archer - Armor, Archer - Bow, Archer - Food
exports.recruitList = (msg,client) =>
{
    if(usercontroller.userExists(msg.author.id))
    {
        embed = new discord.RichEmbed()
        .setAuthor(client.user.username,client.user.avatarURL)
        .setColor('ff0000')
        .setTimestamp(msg.createdAt)
        .setThumbnail('https://i.imgur.com/Z7Aqq4D.png')
        .setDescription('Recruit soldiers to expand your army')
        .setFooter('@EmpireBot','https://i.imgur.com/tbzriFR.png')
        .addField('🤺  **Warrior**', '**x** **'+ arm[0] +'** :shield: **Armor** &  ' + '  **x** **' + arm[1] + '** :crossed_swords: **Sword**\n & **x** **' + arm[2] +'** 🍗 **Food**')
        .addField('😐🏹 **Archer**','**x** **'+ arm[3] +'** :shield: **Armor** &  ' + '  **x** **' + arm[4] + '** :bow_and_arrow: **Bow**\n & **x** **'+ arm[5] +'** 🍗 **Food**')
        .addBlankField()
        .addField('**Troop damage**','🤺 **Warrior** - 4 \n 😐🏹 **Archer** - 2 ')
        .addBlankField()
        .addField('**Command**','/emp recruit <soldier> <quantity>',true)
        .addField('**Example**','/emp recruit warrior 2');

        msg.channel.send(embed);
    }
    else
    {
        message.channel.send(" <@"+msg.author.id + "> , You isn't in the game\n Please type /emp start to join ")
    }
        
    
}

exports.recruit = async (msg,args) =>
{ 
    if(usercontroller.userExists(msg.author.id))
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
                        gstf = arm[2]*qtd;
                        if(userc.armor >= gsta && userc.sword >= gsts && userc.food >= gstf){
                            userc.armor=userc.armor-gsta;
                            userc.sword = userc.sword - gsts;
                            userc.food = userc.food - gstf;
                            userc.warriors = userc.warriors + qtd;
                            resp = await usercontroller.updateUser(userc);
                            if(resp)
                            {
                                msg.channel.send("You spent " + gsta + " armors, " + gstf +" foods and "+gsts + " swords to recruit " + qtd + " warrior(s)");
                                msg.channel.send("Now you have "+userc.warriors+" warriors, " + userc.food  + " foods, "+userc.sword+" swords and " + userc.armor+ " armors");
                            }
                        }
                        else
                        {
                            msg.channel.send("Not enough armor, food or sword, you need " + gsta + " armors, "+ gstf + " foods and " + gsts + " swords" );
                            
                        }
                    break;
                    case 'archer':
                        gsta = arm[3]*qtd;
                        gstb = arm[4]*qtd;
                        gstf = arm[5]*qtd;
                        if(userc.armor >= gsta && userc.bow >= gstb && userc.food >= gstf){
                            userc.armor=userc.armor - gsta;
                            userc.bow = userc.bow - gstb;
                            userc.food = userc.food - gstf;
                            userc.archers = userc.archers + qtd;
                            resp = await usercontroller.updateUser(userc);
                            if(resp)
                            {
                                msg.channel.send("You spent " + gsta + " armors, " + gstf +" foods and " + gstb + " bows to recruit " + qtd + " archer(s)");
                                msg.channel.send("Now you have "+userc.archers+" archers, " + userc.food + " foods, "+userc.bow+" bows and " + + userc.armor+ " armors");
                            }
                        }
                        else
                        {
                            msg.channel.send("Not enough armor, food or bow, you need " + gsta + " armors, "+ gstf + " foods and " + gstb + " bows" );
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
    else
    {
        message.channel.send(" <@"+msg.author.id + "> , You isn't in the game\n Please type /emp start to join ")
    }
   
}
