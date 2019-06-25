const castle = require('./castle.js');
const userController = require('./controllers/userController');

exports.selectCommand = (message, args) =>{
    if(args == 'hello'){
        castle.sendMessage(message);
    }
    else if(args == 'help'){
        castle.help(message);
    }
    //console.log(message);
    switch (args) {
        case 'help':
          //
          break;
        case 'start':
            user = { 
                name : message.author.username,
                discordId: message.author.id,
                money: 0,
                resource : args
            };
            userController.registerUser(user);
          //
          break;
        case 'stats':
          //
          break;
        case 'quest':
            //
            break;   
        case 'loot':
            //
            break;  
        case 'loot <user>':
            //
            break; 
        case 'sell <nick>':
            //
            break;
        case 'trade <nick> <resource> <qtd> <resource2> <qtd2>':
            //
            break;
        case 'ctrade <nick>':
            //
            break;
        case 'buy <resource>':
            //
            break;
        case 'market':
            //
            break;
        case 'sell <resource>':
            //
            break;
        case 'gsc <recurso> <preco>':
            //
            break;
        case 'recruit <type> <qtd>':
            //
            break;
        case 'plant <semente>':
            //
            break;
        case 'expandEmpire':
            //
            break;
        case 'castle':
            //
            break;
        case 'castle <nick>':
            //
            break;
        default:
          //Instruções executadas quando o valor da expressão é diferente de todos os cases
          break;
      }
}

