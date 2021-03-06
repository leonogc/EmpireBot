const msgHelp = require('./commands/help.js');
const userCommands = require('./commands/userCommands.js');

const trade = require('./commands/trade.js');
const globalMarketCommands = require('./commands/globalMarketCommands.js');
const canvas =require('./commands/canvas.js')
const market = require('./commands/market.js');
const craft = require('./commands/craft.js');
const recruit = require('./commands/recruit.js');
const campaign = require('./commands/campaign.js');

exports.selectCommand = (message, args, client) =>{ 
    if(args.startsWith('battle') && args.includes(" ") && args.length>7){
        canvas.battle(message,client)
    }
    else if(args.startsWith('start')){
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
    else if(args.startsWith('castle') && args.includes(" ") && args.length>7){
        userCommands.enemyStats(message, args);
    }
    else if(args.startsWith('buy'))
    {
        market.buyMarket(message,args)
    }
    else if(args.startsWith('sell'))
    {
        market.sellMarket(message,args)
    }
    else if(args.startsWith('gm')){
        globalMarketCommands.GlobalMarket(message, args, client);
    }
    else if(args.startsWith('craft') && args.includes(" ") && args.length>6)
    {
        craft.craft(message,args)
    } 
    else if(args.startsWith('recruit') && args.includes(" ") && args.length>8)
    {
        recruit.recruit(message,args);
    }
    else if(args.startsWith('trade'))
    {
        trade.tradeMessage(message,args);
    }
    else{
        switch (args) {
            case 'help':
                msgHelp.helpMessage(message, client);
              break;
            case 'stats':
                userCommands.userStats(message);
              break;   
            case 'craft':
                craft.craftList(message,client);
                break;
            case 'castle':
                userCommands.castle(message);
                break;
            case 'market':
                market.botMarket(message,client);
                break;
            case 'recruit':
                recruit.recruitList(message,client);
                break;
            case 'expandempire':
                userCommands.expandEmpire(message,args);
                break;
            case 'claim':
                userCommands.claim(message);
                break;
            case 'battle':
                campaign.battle(message,client);
                break;
            default:
                    msgHelp.CNRMessage(message);
              //Instruções executadas quando o valor da expressão é diferente de todos os cases
              break;
        }
    }
}

