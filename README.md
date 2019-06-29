<h1 align = 'center'>EmpireBot </h1>

<p align='center'>
  <img alt='EmpireBot' src='https://i.imgur.com/tbzriFR.png'>
</p>

This is a Discord Bot for **Discord HackWeek 2019**. <br/>
Created by [@IgorKenzo](https://github.com/IgorKenzo) [@Luker64](https://github.com/Luker64) [@rfgvieira](https://github.com/rfgvieira) [@ZoeiroVader](https://github.com/ZoeiroVader)
<br/><br/>
  
To use this bot, join the EmpireBot Official Server
<br/>
[![Discord](https://img.shields.io/discord/594294774144565268.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/QuxASne)
<br/>
Or [invite it to your own server](https://discordapp.com/oauth2/authorize?client_id=592816206248149002&scope=bot&permissions=248896)


<br/>
EmpireBot is a game about Battles and Trades.
To start your new Empire, you need to choose your main resource. You can claim it every 5 minutes, or let your loyal Duke to collect it for you.<br/>
With your resources, you can sell it to the Merchant (the Bot), you can trade it with your friends or you can sell it on a global market. This last one is grouping everyone that plays together, where you can buy and sell choosing your price and quantity.<br/>
You can also recruit new soldiers to battle with you. You can invade the Bot's Castle or another player's Castle. In the end who wins take part of the other's resources.<br/>
And to get stronger you can expand your empire, being able to get more resources in 5 minutes and upgrading your life to fight.<br/>

**Now, join our [Discord Server](https://discord.gg/QuxASne) to start your new journey with lots of Gold and Glory**


## Commands

Every command must starts with ```/emp ```

### Info Commands
<br/>

<table>
            <thead>
                <th>
                    Command
                </th>
                <th>
                    Description
                </th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        start
                    </td>
                    <td>
                        Starts a new Empire
                    </td>
                </tr>
                <tr>
                    <td>
                        castle
                    </td>
                    <td>
                        Shows your resources, your money, your level and your attack power.
                    </td>
                </tr>
                <tr>
                    <td>
                        castle @nick
                    </td>
                    <td>
                        Shows another player's available loot and defense power.
                    </td>
                </tr>
                <tr>
                    <td>
                        expandempire
                    </td>
                    <td>
                        Shows necessary resources to expand your empire. If possible, asks if you really want to do it.
                    </td>
                </tr>
                <tr>
                    <td>
                        help
                    </td>
                    <td>
                        List all commands.
                    </td>
                </tr>
                <tr>
                    <td>
                        stats
                    </td>
                    <td>
                        List user statistics.
                    </td>
                </tr>
                <tr>
                    <td>
                        claim
                    </td>
                    <td>
                        Claim your mainly resource.
                    </td>
                </tr>
            </tbody>
        </table>
        
        
### Market Commands
<table>
            <thead>
                <th>
                    Command
                </th>
                <th>
                    Description
                </th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        buy (resource) (quantity)
                    </td>
                    <td>
                        Buy from merchant (Bot)
                    </td>
                </tr>
                <tr>
                    <td>
                        trade @nick (quantitySending) (resourceSending) (quantityReceiving) (resourceReceiving)
                    </td>
                    <td>
                        Starts a trade with another player.
                    </td>
                </tr>
                <tr>
                    <td>
                        gm show
                    </td>
                    <td>
                        Show offers in the global market 
                    </td>
                </tr>
                <tr>
                    <td>
                        gm show (resource)
                    </td>
                    <td>
                        Show offers of certain resource in the global market 
                    </td>
                </tr>
                <tr>
                    <td>
                        gm sell (resource) (quantity) (price)
                    </td>
                    <td>
                        Create a sell offer in the global market
                    </td>
                </tr>
                <tr>
                    <td>
                        gm buy (offerId)
                    </td>
                    <td>
                        Buy offer from the global market
                    </td>
                </tr>
                <tr>
                    <td>
                        market
                    </td>
                    <td>
                        Open the bot's store
                    </td>
                </tr>
                <tr>
                    <td>
                        sell (resource) (quantity)
                    </td>
                    <td>
                        Sell the resource to the merchant(Bot)
                    </td>
                </tr>                
            </tbody>
        </table>
        
### Battle Commands

  <table>
            <thead>
                <th>
                    Command
                </th>
                <th>
                    Description
                </th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        battle
                    </td>
                    <td>
                        Invades the bot's castle
                    </td>
                </tr>
                <tr>
                    <td>
                        battle @nick
                    </td>
                    <td>
                        Invades the user's castle
                    </td>
                </tr>
                <tr>
                    <td>
                        recruit
                    </td>
                    <td>
                        List of soldier avaliable to recruit
                    </td>
                </tr>
                <tr>
                    <td>
                        recruit (soldierType) (quantity)
                    </td>
                    <td>
                        recruit soldiers in exchange for resources
                    </td>
                </tr>
            </tbody>
        </table>
        
### Crafts
  <table>
      <thead>
          <th>
              Command
          </th>
          <th>
              Description
          </th>
      </thead>
      <tbody>
          <tr>
              <td>
                  craft
              </td>
              <td>
                  List of crafts
              </td>
          </tr>
          <tr>
              <td>
                  craft (resource) (quantity)
              </td>
              <td>
                  Craft an armament
              </td>
          </tr>
      </tbody>
  </table>
<br/>

## Screenshots

### Battle Screenshot
<p align='center'>
   <img alt='EmpireBot' src='https://i.imgur.com/eDhn7nW.png'>
</p>

## Contribute

You can contribute with pull requests or [join the EmpireBot Official Server](https://discord.gg/QuxASne)

## Technologies Used

- Node.JS
- Discord.js
- Canvas.js
- MongoDB
