const { By, Key, until } = require('selenium-webdriver');
const { driver} = require('../config/hooks');
const lobbypage = require ('./lobbypage');
const assert = require('assert');

var HamburgerMenu_xpath = `//div[@data-test-id='topBarItemMenu']`;
var MenuBetHistoryicon_css = `span.icon.sideMenuBetHistory`;
var gameIdCheckBox_xpath = '//td[@class="userOptionsSubHeader"]/input[@name="selectByGamePlayID"]';
const gameIdCheckBox_css = `td.userOptionsSubHeader input[name="selectByGamePlayID"][value="true"]`;
var gameId_xpath = '//input[@name="gamePlayID"]';
var submitButton_xpath = '//input[@value="Submit"]';
const outcomeStatus_xpath = '//tr[@class="userTableData"]/td[@class="userOptionsMainText"][4]';
const betHistoryTable_css = `body.iframeBody`;



class betHistorypage{

    async openBetHistoryfromMenu(){

        const originalWindow = await driver.getWindowHandle();
        assert((await driver.getAllWindowHandles()).length === 1);

        await driver.sleep(15000);
        await driver.findElement(By.xpath(HamburgerMenu_xpath)).click();
        await driver.wait(until.elementLocated(By.css(MenuBetHistoryicon_css)), 6000);
        await driver.findElement(By.css(MenuBetHistoryicon_css)).click();
        driver.sleep(20000);
       
        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            10000
          );

          const windows = await driver.getAllWindowHandles();
          windows.forEach(async handle => {
            if (handle !== originalWindow) {
              await driver.switchTo().window(handle);
            }
          });
          await driver.sleep(20000);
          await driver.switchTo().frame('gameHistoryIFrame');
    }

    async enterValuesOnBH(GameID){

         await driver.sleep(20000);
        await driver.findElement(By.css(gameIdCheckBox_css), 10000).click();
        await driver.findElement(By.xpath(gameId_xpath), 5000).sendKeys(GameID);
        await driver.findElement(By.xpath(submitButton_xpath), 5000).click();
    }
   
    async determineBHOutcome(GameID){

        
    const gamePlayedId_xpath = `//a[@class="historyLink" and contains(text(), "${GameID}")]`;
    
    await driver.wait(until.elementLocated(By.xpath(gamePlayedId_xpath))).isDisplayed();
    const pendingStatus = 'Pending';
    let outcomeStatus = pendingStatus;
  
    while (outcomeStatus === pendingStatus || !outcomeStatus) {
      await driver.findElement(By.xpath(submitButton_xpath)).click();
      const statusElement = await driver.findElement(By.xpath(outcomeStatus_xpath));
      const statusText = await statusElement.getText();
      outcomeStatus = statusText;
      console.log('Outcome status is ' + outcomeStatus);
      await driver.sleep(10000);
    }

    }

    async betHistoryContent(GameID){

        const gamePlayedId_xpath = `//a[@class="historyLink" and contains(text(), "${GameID}")]`;

        await driver.findElement(By.xpath(gamePlayedId_xpath)).click();
        await driver.switchTo().frame('transactionIFrame');
        const bHContentElement  = await driver.findElement(By.css(betHistoryTable_css));
         const bHContent = await bHContentElement.getText();
         return bHContent;

        

        }

}

module.exports = new betHistorypage();