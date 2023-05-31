const { By, Key, until } = require('selenium-webdriver');
const { driver} = require('../config/hooks');
const basepage = require ('./basepage');
const assert = require('assert');



var cashBalance_css = `div.balanceBoxControl.topBarItem.open p:first-child span.value`;
var LobbyElementPage_xpath = `//div[@id='lobbyContent']`



class lobbypage {

    constructor(){
        
       
        
    }


    
    isLobbyDisplayed = async function() {
      await driver.sleep(15000);
     return driver.findElement(By.xpath(LobbyElementPage_xpath)).isDisplayed();;
     
  }

    async getBalance(){
        const HeaderBalanceLocator =  await driver.findElement(By.css(cashBalance_css));
        var balance = await HeaderBalanceLocator.getText();
        balance = balance.replace(/\D/g,'');
        return balance;
       }
       async getPlayersCount(roomName) {

        var playerCount_xpath = `//div[contains(.,"${roomName}")]/following-sibling::div[@class="body brand"]//p[@class='players']/span[@class='value']`;
        
        const countElement = await driver.findElement(By.xpath(playerCount_xpath));
        const countText = await countElement.getText();
        return parseInt(countText);
      }

      async getNextGameTimer(roomName){
       
        const nextGameTime_xpath = `//div[contains(.,"${roomName}")]/following-sibling::div[@class="body brand"]//p[contains(@class,"line2")][1]`;

        const timerElement = await driver.findElement(By.xpath(nextGameTime_xpath));
        const timerText = await timerElement.getText();
        return timerText.trim();

      }

    

}

module.exports = new lobbypage();