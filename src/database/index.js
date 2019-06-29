const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const mongouser = process.env.MONGOUSER;
const mongopass = process.env.MONGOPASS;

mongoose.connect(`mongodb+srv://${mongouser}:${mongopass}@${String(mongouser).toLowerCase()}-wpd6r.mongodb.net/bot?retryWrites=true&w=majority`,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;