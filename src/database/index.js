const mongoose = require('mongoose');
const {mongouser, mongopass} = require('../../config.json');

mongoose.connect(`mongodb+srv://${mongouser}:${mongopass}@${String(mongouser).toLowerCase()}-wpd6r.mongodb.net/bot?retryWrites=true&w=majority`,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;