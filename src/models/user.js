const mongoose = require('../database/index.js');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    discordId:{
        type: Number,
        require: true,
    },
    resource:{
        type: String,
        require: true
    },
    money:{
        type: Number,
        require: true
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;