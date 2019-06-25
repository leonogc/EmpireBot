const castle = require('./castle.js');
const msgHelp = require('./commands/help.js');
const userCommands = require('./commands/userCommands.js');

exports.selectCommand = (message, args, client) =>{
    if(args.startsWith('start')){
        if(args == 'start'){
            message.channel.send('Hello Warrior\nNow you need to choose your mainly resource:\n\nWood\nStone\nIron\nFood\n\nTo select yours use\n/emp start <resource>')
        }
        else{
            res = args.substr('start '.length).toLowerCase() ;
            resources = ['wood', 'stone', 'iron', 'food'];
            if(resources.includes(res)){
                userCommands.register(message, res);
            }
        }
    }
    if(args.startsWith('castle')){
        //console.log(message);
        //console.log(args);
        userCommands.enemyStats(message, args);
    }
    //console.log(message);
    switch (args) {
        case 'help':
            msgHelp.helpMessage(message, client);
          //
          break;
        case 'stats':
            userCommands.userStats(message);
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
        case 'gm <recurso> <preco>':
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

