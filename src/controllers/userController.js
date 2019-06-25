const User = require('../models/user');

exports.registerUser = async(user) => {
    try{
        const userRegistered = User.create(user);
        await userRegistered;

        console.log('Sucesso!');
        console.log(userRegistered);
        return;
    }catch(err){
        return console.log('Error:' + err);
    }
}