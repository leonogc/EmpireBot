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