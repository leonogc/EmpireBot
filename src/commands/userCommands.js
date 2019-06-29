const userController = require('../controllers/userController.js');

exports.register = async (message, res) =>{
    exists = await userController.userExists(message.author.id);
    if(!(exists)){
        user = { 
            name : message.author.username,
            discordId: message.author.id,
            money: 0,
            resource : res,
            wood : 0,
            stone : 0,
            iron : 0,
            food : 0,
            warriors : 0,
            archers : 0,
            armor : 0,
            sword : 0,
            bow : 0,
            claimDate : null,
            empireLevel: 1,
            campaignLevel : 1,
            wins : 0,
            defeats : 0
        };
        userController.registerUser(user);
        message.channel.send(`${user.name} you choose ${user.resource}`);
    }else{
        message.channel.send(`You have already chosen your resource`);
    }
}

exports.userStats = async (message) => {
    user = await userController.findById(message.author.id);
    var nobattle=user.defeats+user.wins;
    if(user == null){
        message.channel.send('No User Found');
    }else{
        if(nobattle!=0)
        {
            var winrate=100*(user.wins/nobattle).toFixed(2);
        }
        else
        {
            var winrate=0;

        }
        message.channel.send(`**__${user.name}__**\nMainly Resource: ${user.resource}\nMoney: $${user.money/100}\nEmpire Level: ${user.empireLevel}\nCampaign Level ${user.campaignLevel}\n\n
        **Battle:**\n Wins: ${user.wins}\n Defeats: ${user.defeats}\n Winrate: ${ winrate}% `);

    }

}
exports.castle = async (message) => {
    user = await userController.findById(message.author.id);
    if(user == null){
        message.channel.send('No User Found');
    }
    else{
        let battleEmbed = {
            color: 0x0099ff,
            title: `${user.name}`,
            description: `
                    ${user.empireLevel == 1 ? 'A Young Emperor': user.empireLevel == 2 ? 'A Grandiose Emperor' : 'A Legendary Emperor'}\r
                    ⚒ Mainly Resource: ${user.resource}
                    \r 💰 Money: $${user.money/100}
                    \r 🏛 Empire Level: ${user.empireLevel}
                    \r 🚩 Campaign Level: ${user.campaignLevel}
            `,
            thumbnail: {
                url: `
                    ${user.empireLevel == 1 ? 'https://i.imgur.com/ykZvt2P.png': user.empireLevel == 2 ? 'https://i.imgur.com/2bFtdic.png' : 'https://i.imgur.com/uis7NjO.png'}
                `,
            },
            fields: [
                {
                    name: `Resourses:`,
                    value: `
                        🌲x${user.wood} 🔗x${user.iron} 🌕x${user.stone} 🍗x${user.food}
                    `,
                    inline: true,
                },
                {
                    name: `Armament:`,
                    value: `
                        🛡: x${user.armor}  ⚔: x${user.sword} 🏹: x${user.bow}
                    `,
                    inline: true,
                },
                {
                    name: `Army:`,
                    value: `
                        ⚔ Warriors: x${user.warriors}  🏹 Archers: x${user.archers} 
                    `,
                    inline: true,
                }
            ],
            timestamp: new Date(),
            footer: {
                text: '@EmpireBot',
                icon_url: 'https://i.imgur.com/tbzriFR.png',
            },
        };
        // message.channel.send(`
        //     **__${user.name}__**
        //         \nMainly Resource: ${user.resource}
        //         \nMoney: $${user.money/100}
        //         \nEmpire Level: ${user.empireLevel}
        //         \nCampaign Level ${user.campaignLevel}\n\n
        //     **Resources:**
        //         \nWood: ${user.wood}
        //         \nStone: ${user.stone}
        //         \nIron: ${user.iron}
        //         \nFood: ${user.food}\n\n
        //     **Armament:**
        //         \nArmor: ${user.armor}
        //         \nSword: ${user.sword}
        //         \nBow: ${user.bow}\n\n 
        //     **Army:**
        //         \nWarriors: ${user.warriors}
        //         \nArchers: ${user.archers}`);
        message.channel.send({
            embed: battleEmbed
        });

    }

}

exports.enemyStats = async (message, args) => {
    const ver = args.split(" ");
    if(ver.length != 1){
        if(args.includes('!')){
            discordId = (String(args).substring(String(args).indexOf('!')+1, String(args).length-1));    
        }
        else{
            discordId = (String(args).substring(String(args).indexOf('@')+1, String(args).length-1));
        }
    }
    else{
       discordId = message.author.id;
    }

    user = await userController.findById(discordId);
    if(user == null){
        return message.channel.send('No User Found');
    }else{
        let battleEmbed = {
            color: 0x0099ff,
            title: `${user.name}`,
            description: `
                    ${user.empireLevel == 1 ? 'A Young Emperor': user.empireLevel == 2 ? 'A Grandiose Emperor' : 'A Legendary Emperor'}\r
                    ⚒ Mainly Resource: ${user.resource}
                    \r 💰 Money: $${user.money/100}
                    \r 🏛 Empire Level: ${user.empireLevel}
                    \r 🚩 Campaign Level: ${user.campaignLevel}
            `,
            thumbnail: {
                url: `
                    ${user.empireLevel == 1 ? 'https://i.imgur.com/ykZvt2P.png': user.empireLevel == 2 ? 'https://i.imgur.com/2bFtdic.png' : 'https://i.imgur.com/uis7NjO.png'}
                `,
            },
            fields: [
                {
                    name: `Army:`,
                    value: `
                        ⚔ Warriors: x${user.warriors}  🏹 Archers: x${user.archers} 
                    `,
                    inline: true,
                },
                {
                    name: `Avaliable to loot:`,
                    value: `
                        🌲x${Math.floor(user.wood/10)} 🔗x${Math.floor(user.iron/10)} 🌕x${Math.floor(user.stone/10)} 🍗x${Math.floor(user.food/10)}
                    `,
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: '@EmpireBot',
                icon_url: 'https://i.imgur.com/tbzriFR.png',
            },
        };
        message.channel.send({
            embed: battleEmbed
        });
        message.channel.send(`
            **__${user.name}__**
                \nMainly Resource: ${user.resource}
                \nMoney: $${user.money/100}
                \nEmpire Level: ${user.empireLevel}
                \nCampaign Level ${user.campaignLevel}\n
            **Army:**
                \nWarriors: ${user.warriors}
                \nArchers: ${user.archers}\n\n
            **Availible to Loot:**
                \nWood: ${Math.floor(user.wood/10)}
                \nStone: ${Math.floor(user.stone/10)}
                \nIron: ${Math.floor(user.iron/10)}
                \nFood: ${Math.floor(user.food/10)}`);
    }
}

exports.claim = async (message) =>{
    user = await userController.findById(message.author.id);
    if(user == null){
        return message.channel.send('No User Found');
    }
    time_now = new Date().getTime();
    if(user.claimDate == null || user.claimDate == ""){
        resp = await userController.claimResource(user, time_now, 1);
        if(resp){
            return message.channel.send(`You've claimed your resource`);
        }else{
            return message.channel.send('Try again Later');
        }
    }else{
        oldClaim = Number(user.claimDate);
        diff = ((time_now - (new Date(Number(oldClaim)).getTime())) / 1000 / 60);
        times = Math.floor(diff/5);
        if(times <= 0){
            return message.channel.send(`You can't claim right now, wait 5 minutes`);
        }
        resp = await userController.claimResource(user, time_now, times);
        if(resp){
            return message.channel.send(`You're loyal Duke got your resources ${times} times while you were not here`);
        }else{
            return message.channel.send('Try again Later');
        }
    }
}

exports.expandEmpire = async (message,args) => {
    const discordId = message.author.id;
    user = await userController.findById(discordId);
    
    /* Resources consumed to upgrade
    1º - Money, Wood, Stone, Iron, Food.
    2º - Money, Wood, Stone, Iron, Food.

    Expand function: Math.pow(2,empireLevel) * 40;
    */

    if(user == null){
        message.channel.send('No User Found');
    }else{
        let {money, wood, stone, iron, food, empireLevel} = user;
        const resourceNeeded = [800,1600];   

        if(empireLevel < 3){
            if(compare(money,resourceNeeded[empireLevel-1]) && compare(wood,resourceNeeded[empireLevel-1]) && compare(stone,resourceNeeded[empireLevel-1]) && compare(iron,resourceNeeded[empireLevel-1]) && compare(food,resourceNeeded[empireLevel-1])){
                        
                user.money = ((money/100) - (resourceNeeded[empireLevel-1])*10)*100;
                user.wood -= resourceNeeded[empireLevel-1];
                user.stone -= resourceNeeded[empireLevel-1];
                user.iron -= resourceNeeded[empireLevel-1]; 
                user.food -= resourceNeeded[empireLevel-1];
                user.empireLevel += 1;
                userController.updateUser(user);
                message.channel.send(`${resourceNeeded[empireLevel-1]} resources and ${resourceNeeded[empireLevel-1]*10} golds consumed. Now your empire is level ${user.empireLevel}`);
                return;
            }
            message.channel.send(`Not enough resources. You need at least ${resourceNeeded[empireLevel-1]} of each to upgrade!`);
        }
        else{
            message.channel.send("You've reached max level.");
        }
    }
}

function compare(UserValue, MinValue){
    if(UserValue >= MinValue){
        return true;
    }
    else{
        return false;
    }
}