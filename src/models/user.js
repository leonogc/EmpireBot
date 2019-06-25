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
    wood:{
        type: Number,
        require: true,
    },
    stone:{
        type: Number,
        require: true,
    },
    iron:{
        type: Number,
        require: true,
    },
    food:{
        type: Number,
        require: true,
    },
    soldiers:{
        type: Number,
        require: true,
    },
    archers:{
        type: Number,
        require: true,
    },
    claimDate:{
        type: String
    },
    empireLevel:{
        type: Number
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;