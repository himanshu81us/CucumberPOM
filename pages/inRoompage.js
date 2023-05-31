const { By, Key, until } = require('selenium-webdriver');
const { driver} = require('../config/hooks');
const lobbypage = require ('./lobbypage');
const assert = require('assert');

const confirmButton_xpath = `//button[@class='dialogButton confirmButton']`;
const roomBuyButton_css = `#bingoTicketPurchaser div.button.buyButton button`;
const dialogOkButton_xpath = `//button[@data-test-id='confirm']`;
const gameID_css =`div.gameID div.value`;
const salesClose_xpath = `//div[@data-test-id='salesClosedButton']`;
const ballCallPanel_id = `ballCallPanel`;
const postPurchasePopUp_css = `.postPurchaseModalInfo`;


const roomCountDownValue = `//div[@id="countdownValue"]`;



class inRoompage{

    async checkGameIsInSalesphase(roomName, gameTimer){

      var pc;
      var nxT;

        do {
         await driver.sleep(20000);
          pc = await lobbypage.getPlayersCount(roomName);
          nxT = await lobbypage.getNextGameTimer(roomName);
         console.log(nxT);
         console.log(pc);

         if (pc > 0) {
           console.log("Players Count=" +pc)
         }
     
         if (nxT < "00:02:00") {
           console.log("Next Game Timer=" +nxT)
         }
       } while (pc > 0 && nxT < gameTimer);
       
       nxT = nxT.replace(':', '');
       
       return nxT;

   }

    async EnterRoom(roomName){
          const lobby_play_roomName_xpath = `//div[@class="roomName" and contains(text(),"${roomName}")]`;

          const roomElement = await driver.findElement(By.xpath(lobby_play_roomName_xpath));
          await roomElement.click();
   }

    async acceptWelcomeMessage(){
          await driver.sleep(15000);
          const welcomeMessage = await driver.findElement(By.xpath(confirmButton_xpath));
          await driver.wait(until.elementLocated(By.xpath(confirmButton_xpath)),12000);
          await welcomeMessage.click();

}

async MultiStakePurchaseTickets(){
          await driver.findElement(By.css(roomBuyButton_css)).click();
          await driver.findElement(By.xpath(confirmButton_xpath)).click();
   
}

async standard90PurchaseTickets(){

}

async assertTicketspurchased(){

          await driver.sleep(7000);
          const ppmPOPup = await driver.findElement(By.css(postPurchasePopUp_css));
          const ppmPOPupText = await ppmPOPup.getText();
          await driver.findElement(By.xpath(dialogOkButton_xpath)).click();
          return ppmPOPupText;

}

async captureGameID(){
  
          await driver.sleep(15000);
          const gameIDelement = await driver.findElement(By.css(gameID_css));
          const GameID = await gameIDelement.getText();   
          return GameID;
}

async waitForSalesphaseToClose(){

          const gameCountDownElement = await driver.findElement(By.xpath(roomCountDownValue));
          const gameCountValue = await gameCountDownElement.getText();
          var gameStartTime = gameCountValue.replace(':','');
          console.log(gameStartTime);
          var gT = 20;
          gameStartTime = parseInt(gameStartTime)+parseInt(gT);
          gameStartTime = gameStartTime*1000;
          console.log(gameStartTime)
          await driver.sleep(gameStartTime);

          //await driver.wait(until.elementLocated(By.xpath(salesClose_xpath)), 20000);

}

async waitForBallCalls(){

          return  await driver.findElement(By.id(ballCallPanel_id)).isDisplayed();

}

async waitForHouseWinAnimation(){
          var WinText = 'House';
          const bingoWinAnimation_xpath = `//div[@id="bingoWinAnimation"]/div[text()= "${WinText}"]`
          await driver.wait(until.elementsLocated(By.xpath(bingoWinAnimation_xpath)), 700000);
          driver.sleep(30000);

} 


async waitForLineAndHouseWinAnimation(){
          var WinText = 'Line';
          const bingoWinAnimation_xpath = `//div[@id="bingoWinAnimation"]/div[text()= "${WinText}"]`
          await driver.wait(until.elementsLocated(By.xpath(bingoWinAnimation_xpath)), 700000);
          WinText = 'House';
          bingoWinAnimation_xpath = `//div[@id="bingoWinAnimation"]/div[text()= "${WinText}"]`
          await driver.wait(until.elementsLocated(By.xpath(bingoWinAnimation_xpath)), 700000);
}

}

module.exports = new inRoompage();