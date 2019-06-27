const GlobalMarket = require("../models/globalMarket");

exports.findTop10 = async () => {
    try {
        return await GlobalMarket.find()
        .limit(10)
        .sort({ price: 1 })
    } catch (err) {
        return console.log(err);
    }
};

exports.findTop10Category = async (res) => {
    try {
        condition = {resource : res};
        return await GlobalMarket.find(condition)
        .limit(10)
        .sort({ price: 1 })
    } catch (err) {
        return console.log(err);
    }
};

exports.createOffer = async (globalMarket) => {
    try {
        const offerCreated = GlobalMarket.create(globalMarket);
        await offerCreated;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

exports.updateOffer = async (globalMarket) =>{
    try{
        condition = {_id : globalMarket.id};
        resp = await GlobalMarket.updateOne(condition, globalMarket);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

exports.findOffer = async (globalId) => {
    try{
        condition = {_id : globalId};
        return await GlobalMarket.findOne(condition);
    }catch(err){
        console.log(err);
    }
}
