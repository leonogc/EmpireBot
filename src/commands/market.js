const discord = require("discord.js");
const userController = require('../controllers/userController.js');


const price=[100,100,100,100,100,100,100,100
            ,100,100,100,100,100,100]
        //Mapa da array
        /*[compra madeira, vende madeira, compra ferro, vende ferro, compra pedra, vende pedra, compra comida, vende comida
            compra espada, vende espada, compra arco, vende arco, compra armadura, vende armadura ]*/

exports.botMarket= async (msg,client) => 
    {
        userc = await userController.findById(msg.author.id);
        if(userc==null)
        {
            msg.channel.send('No User Found');
        }
        else 
        {
            console.log(userc);
            var embed = new discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setColor('ff0000')
            .setTitle('**Market**')
            .setURL()
            .setThumbnail('https://i.imgur.com/79ViU3x.png')
            .setDescription('Buy and sell resources\n\n'+ ':moneybag:  Balance: '+ userc.money/100 )
            .addBlankField()
            .addField(':evergreen_tree:  **Wood**',':inbox_tray: $' + price[0] + ' :outbox_tray: $' + price[1] )
            .addField(':link: **Iron**',':inbox_tray: $' + price[2] + ' :outbox_tray: $' +price[3] )
            .addField(':full_moon:  **Stone**',':inbox_tray: $'+ price[4] + ' :outbox_tray: $'+ price[5] )
            .addField(':poultry_leg:  **Food**',':inbox_tray: $' + price[6] + ' :outbox_tray: $' + price[7] )
            .addField(':crossed_swords:  **Sword**',':inbox_tray: $' + price[8] + ' :outbox_tray: $'+ price[9] )
            .addField(':bow_and_arrow:  **Bow**',':inbox_tray: $'+price[10]+ ' :outbox_tray: $'+price[11] )
            .addField(':shield:  **Armor**',':inbox_tray: $'+price[12]+ ' :outbox_tray: $'+price[13])
            .addBlankField()
            .addField('**Captions**',':inbox_tray: - Buy    :outbox_tray: - Sell ')
            .addField('**To buy**','Command: /emp buy <resource> <quantity> \n Example: /emp buy wood 12',true)
            .addField('**To sell**','Command: /emp sell <resource> <quantity> \n Example: /emp sell stone 3',true)
            .setFooter('@EmpireBot')
            .setTimestamp(msg.createdAt);

            msg.channel.send(embed);
        }
    }
exports.sellMarket = async (msg,args) =>
    {
        userc = await userController.findById(msg.author.id);
        money = userc.money/100;
        space =  args.split(" ");
        if(space.length>=2){
            resource = space[1].toString();
            if(space.length == 3){
                qtd =parseInt(space[2]);
                if(!isNaN(qtd)){
                    switch(resource)
                    {
                        case 'wood':
                            if(qtd<=userc.wood)
                            {
                                userc.wood = userc.wood-qtd;
                                userc.money = userc.money+((price[1]*qtd)* 100)   
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You sold "+ qtd + " woods");
                                    msg.channel.send("Now you have "+userc.wood+" wood and " + (userc.money/100)  + " golds" );
                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough "+ resource);
                            }
                        break;   
                        case 'stone':                           
                            if(qtd<=userc.stone)
                            {
                                userc.stone = userc.stone-qtd;
                                userc.money = userc.money+((price[3]*qtd)* 100)   
                                resp = await userController.updateUser(userc)
                                
                                if(resp){
                                msg.channel.send("You sold "+ qtd + " stones ");
                                msg.channel.send("Now you have "+userc.stone+" stones and " + (userc.money/100)  + " golds" );
                            }
                            }
                            else
                            {
                                msg.channel.send("Not enough "+ resource);
                            }
                        break;  
                        case 'food':
                            if(qtd<=userc.food)
                            {
                                userc.food = userc.food-qtd;
                                userc.money = userc.money+((price[5]*qtd)* 100)   
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You sold "+ qtd + " foods " );
                                    msg.channel.send("Now you have "+userc.food+" foods and " + (userc.money/100)  + " golds" );
                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough "+ resource);
                            }
                        break; 
                        case 'iron':
                            if(qtd<=userc.iron)
                            {
                                userc.iron = userc.iron-qtd;
                                userc.money = userc.money+((price[7]*qtd)* 100)   
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You sold "+ qtd + " irons " );
                                    msg.channel.send("Now you have "+userc.iron+" irons and " + (userc.money/100)  + " golds" );
                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough "+ resource);
                            }
                        break; 
                        case 'sword':
                            if(qtd<=userc.sword)
                            {
                                userc.sword = userc.sword-qtd;
                                userc.money = userc.money+((price[9]*qtd)* 100)   
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You bought "+ qtd + " swords " );
                                    msg.channel.send("Now you have "+userc.sword+" swords and " + (userc.money/100)  + " golds" );
                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough "+ resource);
                            }
                        break; 
                        case 'bow':
                            if(qtd<=userc.bow)
                            {
                                userc.bow = userc.bow-qtd;
                                userc.money = userc.money+((price[11]*qtd)* 100)   
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You sold "+ qtd + " bows " );
                                    msg.channel.send("Now you have "+userc.bow+" bows and " + (userc.money/100)  + " golds" );
                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough "+ resource);
                            }
                        break; 
                        case 'armor':
                            if(qtd<=userc.armor)
                            {
                                userc.armor = userc.armor-qtd;
                                userc.money = userc.money+((price[13]*qtd)* 100)   
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You sold "+ qtd + " armors " );
                                    msg.channel.send("Now you have "+userc.armor+" armors and " + (userc.money/100)  + " golds" );
                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough "+ resource);
                            }
                        break; 
                        default:
                                msg.channel.send("Unable to find this resource ");
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
                msg.channel.send("Type the quantity of resource");

            }
        }
        else
        {
            msg.channel.send("Type the resource");
        }
    }
    exports.buyMarket = async (msg,args) =>
    {
        userc = await userController.findById(msg.author.id);
        money = userc.money/100;
        space =  args.split(" ");
        if(space.length>=2){
            resource = space[1].toString();
            if(space.length == 3){
                qtd =parseInt(space[2]);
                if(!isNaN(qtd)){
                    switch(resource)
                    {
                        case 'wood':
                            value = (price[0]*qtd)*100
                            if(userc.money>=value)
                            {
                                userc.wood=userc.wood+qtd;
                                userc.money = userc.money-value  
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You bought "+ qtd + " woods " );
                                    msg.channel.send("Now you have "+userc.wood+" wood and " + (userc.money/100)  + " golds" );

                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough money, you need "+ (value/100) + " gold");
                            }
                        break;   
                        case 'stone':
                            value = (price[2]*qtd)*100
                            if(userc.money>=value)
                            {
                                userc.stone=userc.stone+qtd;
                                userc.money = userc.money-value   
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You bought "+ qtd + " stones ");
                                    msg.channel.send("Now you have "+userc.stone+" stones and " + (userc.money/100)  + " golds" );

                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough money, you need "+ (value/100) + " gold");
            
                            }
                        break;  
                        case 'food':
                            value = (price[4]*qtd)*100
                            if(userc.money>=value)
                            {
                                userc.food= userc.food + qtd;
                                userc.money = userc.money-(value)   
                                resp = await userController.updateUser(userc)
                                if(resp){
                                msg.channel.send("You bought "+ qtd + " foods ");
                                msg.channel.send("Now you have "+userc.food+" foods and " + (userc.money/100)  + " golds" );

                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough money, you need "+ (value/100) + " gold");
                            }
                        break; 
                        case 'iron':
                            value = (price[6]*qtd)*100
                            if(userc.money>=value)
                            {                         
                                userc.iron=userc.iron+qtd;
                                userc.money = userc.money-value
                                resp = await userController.updateUser(userc)
                                if(resp){
                                msg.channel.send("You bought "+ qtd + " irons ");
                                msg.channel.send("Now you have "+userc.iron+" irons and " + (userc.money/100) + " golds" );

                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough money, you need "+ (value/100) + " gold");
                            }
                        break; 
                        case 'sword':
                            value=(price[8]*qtd)*100;
                            if(userc.money>=value)
                            {
                                userc.sword=userc.sword+qtd;
                                userc.money = userc.money-value  
                                resp = await userController.updateUser(userc)
                                if(resp){
                                msg.channel.send("You bought "+ qtd + " swords ");
                                msg.channel.send("Now you have "+userc.sword+" swords and " + (userc.money/100)  + " golds" );

                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough money, you need "+ (value/100) + " gold");
                            }
                        break; 
                        case 'bow':
                            value=(price[10]*qtd)*100
                            if(userc.money>=value)
                            {
                                userc.bow=userc.bow+qtd;
                                userc.money = userc.money-value  
                                resp = await userController.updateUser(userc)
                                if(resp){
                                msg.channel.send("You bought "+ qtd + " bows ");
                                msg.channel.send("Now you have "+userc.bow+" bows and " + (userc.money/100)  + " golds" );

                                }
                            }
                            else
                            {
                                msg.channel.send("Not enough money, you need "+ (value/100) + " gold");
                            }
                        break; 
                        case 'armor':

                            value=(price[12]*qtd)*100
                            if(userc.money>=value)
                            {
                                userc.money = userc.money-value   
                                userc.armor=userc.armor+qtd;
                                resp = await userController.updateUser(userc)
                                if(resp){
                                    msg.channel.send("You bought "+ qtd + " armors  ");
                                    msg.channel.send("Now you have "+userc.armor+" armors and " + (userc.money/100)  + " golds" );

                                }

                            }
                            else
                            {
                                msg.channel.send("Not enough money, you need "+ (value/100) + " gold");
                            }
                        break; 
                        default:
                                msg.channel.send("Unable to find this resource ");
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
                msg.channel.send("Type the quantity of resource");

            }
        }
        else
        {
            msg.channel.send("Type the resource");
        }
    }
