const userController = require('../controllers/userController.js');
const User = require('../models/user');

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
            soldiers : 0,
            archers : 0,
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
        message.channel.send(`${user.name}\nMainly Resource: ${user.resource}\nMoney: $${user.money/100}\n\n
        Resources:\nWood: ${user.wood}\nStone: ${user.stone}\nIron: ${user.iron}\nFood: ${user.food}\nSoldiers: ${user.soldiers}\nArchers: ${user.archers}`);
    }

}

exports.enemyStats = async (message, args) => {
    discordId = (String(args).substring(String(args).indexOf('!')+1, String(args).length-1));

    user = await userController.findById(discordId);
    if(user == null){
        message.channel.send('No User Found');
    }else{
        message.channel.send(`${user.name}\nMainly Resource: ${user.resource}\nMoney: $${user.money/100}\n\n
        Resources:\nWood: ${user.wood}\nStone: ${user.stone}\nIron: ${user.iron}\nFood: ${user.food}\nSoldiers: ${user.soldiers}\nArchers: ${user.archers}\n\n
        Availible to Loot:\nWood: ${Math.floor(user.wood/10)}\nStone: ${Math.floor(user.stone/10)}\nIron: ${Math.floor(user.iron/10)}\nFood: ${Math.floor(user.food/10)}`);
    }
}