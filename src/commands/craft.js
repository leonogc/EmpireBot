const usercontroller = require('../controllers/userController.js');
const discord = require('discord.js')

const resc = [1,1,1,1,1];
//Mapa da array
// Sword - Wood, Sword - Iron, Bow - Wood, Bow - Stone, Armor - Iron

exports.craftList = (msg,client) =>
{
    embed = new discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor('ff0000')
    .setTimestamp(msg.createdAt)
    .setThumbnail('https://i.imgur.com/ks4cSHV.png')
    .setDescription('List of crafts')
    .setFooter('@EmpireBot')
    .addField(':crossed_swords:  **Sword**', '**x** **'+ resc[0] +'** :evergreen_tree: **Wood** &  ' + '  **x** **' + resc[1] + '** :link: **Iron**')
    .addField(':bow_and_arrow:  **Bow**','**x** **'+ resc[2] +'** :evergreen_tree: **Wood** &  ' + '  **x** **' + resc[3] + '** :full_moon: **Stone**')
    .addField(':shield:  **Armor**','**x** **' + resc[4] + '** :link: **Iron**')
    .addBlankField()
    .addField('**Command**','/emp craft <resource> <quantity>')
    .addField('**Example**','/emp craft armor 2');
    ;

    msg.channel.send(embed);
}
exports.craft = async (msg,args) =>
{
    userc = await usercontroller.findById(msg.author.id);
    space =  args.split(" ");
    resource = space[1].toString();
        if(space.length == 3){    
            qtd =parseInt(space[2]);
            if(!isNaN(qtd))
            {
                switch(resource)
                {
                    case 'armor':
                        gsti = resc[4]*qtd;
                        if(userc.iron>=gsti)
                        {
                            userc.armor = userc.armor + qtd;
                            userc.iron = userc.iron - gsti;
                            resp = await usercontroller.updateUser(userc);
                            if(resp)
                            {
                                msg.channel.send("You spent " + gsti + " irons to craft " + qtd + " armors");
                            }
                        }
                        else
                        {
                            msg.channel.send("Not enough  iron, you need " + gsti + " irons" )
                        }
                    break;
                    case 'bow':
                        gsts = resc[3]*qtd;
                        gstw = resc[2]*qtd;
                        if(userc.stone >= gsts && userc.wood >= gstw)
                        {
                            userc.bow = userc.bow + qtd;
                            userc.stone = userc.stone - gsts;
                            userc.wood = userc.wood - gstw;
                            resp = await usercontroller.updateUser(userc);
                            if(resp)
                            {
                                msg.channel.send("You spent " + gsts + " stones and " + gstw + " woods to craft " + qtd + " bows");
                            }
                        }
                        else
                        {
                            msg.channel.send("Not enough wood or stone, you need " + gstw + " woods and " + gsts + " stones" )
                        }
                    break;
                    case 'sword':
                        gsti = resc[1]*qtd;
                        gstw = resc[0]*qtd;
                        if(userc.iron >= gsti && userc.wood >= gstw)
                        {
                            userc.sword = userc.sword + qtd;
                            userc.iron = userc.iron - gsti;
                            userc.wood = userc.wood - gstw;
                            resp = await usercontroller.updateUser(userc);
                            if(resp)
                            {
                                msg.channel.send("You spent " + gsti + " irons and " + gstw + " woods to craft " + qtd + " swords");
                            }
                        }
                        else
                        {
                            msg.channel.send("Not enough wood or iron, you need " + gstw + " woods and " + gsti + " irons" )
                        }
                    break;
                    default:
                        msg.channel.send("Unable to find this armament")
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
            msg.channel.send('Type the quantity of armament')
        }
}
