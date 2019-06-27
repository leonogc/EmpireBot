const mongoose = require('../database/index.js');

const GlobalMarketSchema = new mongoose.Schema({
    ownerDiscordId:{
        type: Number,
        required: true,
    },
    ownerDiscordUsername:{
        type: String,
        required: true,
    },
    buyerDiscordId:{
        type: Number,
    },
    buyerDiscordUsername:{
        type: String,
    },
    resource:{
        type: String,
        required: true,
    },
    quantity:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    active:{
        type: Boolean,
        required: true,
    },
});

const GlobalMarket = mongoose.model('GlobalMarket', GlobalMarketSchema);

module.exports = GlobalMarket;