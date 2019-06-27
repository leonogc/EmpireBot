const User = require('../models/user');

exports.registerUser = async(user) => {
    try{
        const userRegistered = User.create(user);
        await userRegistered;

        //console.log('Sucesso!');
        //console.log(userRegistered);
        return;
    }catch(err){
        return console.log('Error:' + err);
    }
}

exports.userExists = async(discordId) => {
    try{
        const user = await this.findById(discordId)
        if(user != null){
            return true;
        }
        else{
            return false;
        }        
    }catch(err){
        return console.log(err);
    }
}

exports.findById = async (discordId) => {
    try{
        return await User.findOne({'discordId' : discordId});
    }catch (err){
        return console.log(err);
    }
}

exports.claimResource = async (user, time_now, times) => {
    try{
        resourceLevel = [10,15,20];
        condition = { _id : user.id};
        user.claimDate = time_now;
        switch(user.resource){
            case 'wood':
                user.wood = user.wood + (resourceLevel[(user.empireLevel-1)]*times);
                //
                break;
            case 'stone':
                user.stone = user.stone + (resourceLevel[(user.empireLevel-1)]*times);
                //
                break;
            case 'iron':
                user.iron = user.iron + (resourceLevel[(user.empireLevel-1)]*times);
                //
                break;
            case 'food':
                user.food = user.food + (resourceLevel[(user.empireLevel-1)]*times);
                //
                break;
        }
        resp = await User.updateOne(condition, user);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

exports.updateUser = async (user) =>{
    try{
        condition = { _id: user.id};
        resp = await User.updateOne(condition, user);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

exports.findResQuant = async(user, resource) => {
    try{
        condition = { _id: user.id};
        switch(resource)
        {
            case 'wood':
                projection = {_id:0,wood:1};
                break;
            case 'stone':
                projection = {_id:0,stone:1};
                break;
            case 'iron':
                projection = {_id:0,iron:1};
                break;
            case 'food':
                projection = {_id:0,food:1};
                break;
            case 'armor':
                projection = {_id:0,armor:1};
                break;
            case 'sword':
                projection = {_id:0,sword:1};
                break;
            case 'bow':
                projection = {_id:0,bow:1};
                break;
        }
        return await User.findOne(condition, projection);
    }catch(err){
        console.log(err);
        return false;
    }
}