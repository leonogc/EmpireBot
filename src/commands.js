const castle = require('./castle.js');
/*Teste*/
exports.selectCommand = (message, args) =>{
    if(args == 'hello'){
        castle.sendMessage(message);
    }
    else if(args == 'help'){
        castle.help(message);
    }
    console.log(message);
}