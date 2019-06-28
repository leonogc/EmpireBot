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
            campaignLevel : 1
        };
        userController.registerUser(user);
        message.channel.send(`${user.name} you choose ${user.resource}`);
    }else{
        message.channel.send(`You have already chosen your resource`);
    }
}

exports.userStats = async (message) => {
    user = await userController.findById(message.author.id);
    if(user == null){
        message.channel.send('No User Found');
    }else{
        message.channel.send(`**__${user.name}__**\nMainly Resource: ${user.resource}\nMoney: $${user.money/100}\nEmpire Level: ${user.empireLevel}\n\n
        **Resources:**\nWood: ${user.wood}\nStone: ${user.stone}\nIron: ${user.iron}\nFood: ${user.food}\n\n
        **Armament**\nArmor: ${user.armor}\nSword: ${user.sword}\nBow: ${user.bow}\n\n
        **Army**\nWarriors: ${user.warriors}\nArchers: ${user.archers}`);
    }

}

exports.enemyStats = async (message, args) => {
    const ver = args.split(" ");
    //console.log(ver);
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
    //console.log(discordId);

    user = await userController.findById(discordId);
    if(user == null){
        return message.channel.send('No User Found');
    }else{
        message.channel.send(`**__${user.name}__**\nMainly Resource: ${user.resource}\nMoney: $${user.money/100}\nEmpire Level: ${user.empireLevel}\n\n
        **Resources:**\nWood: ${user.wood}\nStone: ${user.stone}\nIron: ${user.iron}\nFood: ${user.food}\n\n
        **Armament:**\nArmor: ${user.armor}\nSword: ${user.sword}\nBow: ${user.bow}\n\n
        **Army:**\nWarriors: ${user.warriors}\nArchers: ${user.archers}\n\n
        **Availible to Loot:**\nWood: ${Math.floor(user.wood/10)}\nStone: ${Math.floor(user.stone/10)}\nIron: ${Math.floor(user.iron/10)}\nFood: ${Math.floor(user.food/10)}`);
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
        const resourceNeeded = [160,320];   
        //console.log(empireLevel);
        
        if(empireLevel < 3){
            if(compare(money,resourceNeeded[empireLevel-1]) && compare(wood,resourceNeeded[empireLevel-1]) && compare(stone,resourceNeeded[empireLevel-1]) && compare(iron,resourceNeeded[empireLevel-1]) && compare(food,resourceNeeded[empireLevel-1])){
                        
                user.money = ((money/100) - resourceNeeded[empireLevel-1])*100;
                user.wood -= resourceNeeded[empireLevel-1];
                user.stone -= resourceNeeded[empireLevel-1];
                user.iron -= resourceNeeded[empireLevel-1]; 
                user.food -= resourceNeeded[empireLevel-1];
                user.empireLevel += 1;
                userController.updateUser(user);
                message.channel.send(`${resourceNeeded[empireLevel-1]} resources consumed. Now your empire is level ${user.empireLevel}`);
                return;
            }
            message.channel.send(`Not enough resources. You need at least ${resourceNeeded[empireLevel-1]} of each to upgrade!`);
        }
        else{
            message.channel.send("You've reached the max level.");
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