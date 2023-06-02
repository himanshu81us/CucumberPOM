var basepage = require ('./basepage');
const { driver} = require('../config/hooks');
const { By, Key, until} = require('selenium-webdriver');
const loginPage = require('./loginPage');
const {user} = require('../config/hooks');



var ChatName_xpath = `//input[@name='chatname']`
var submitButton_xpath =`//button[@id='setdisplayname-btn-submit']`
var SchedulePage_xpath =`//div[@class='scheduleTabs']`
var SchedulePageClose_xpath = `//div[@class='closeButtonContainer']//div[@class='icon closeButton']`
var ScheduleIcon_xpath = `//div[@class='icon schedule']`
const confirmButton_xpath = `//button[@class='dialogButton confirmButton']`;

var headerLobbyIcon_xpath = `//*[@id="topBar"]/nav[1]/div[2]/span`



class setchatName  {

  
async registerChatNameSchedulePage(){
    

driver.sleep(15000);
await driver.findElement(By.xpath(ScheduleIcon_xpath)).click();
driver.sleep(3000);
await driver.findElement(By.xpath(ChatName_xpath)).sendKeys(user);
await driver.findElement(By.xpath(submitButton_xpath)).click();
await driver.findElement(By.xpath(SchedulePage_xpath)).isDisplayed();

}

async scheduleClose(){
    driver.sleep(20000);
    driver.wait(until.elementLocated(By.xpath(SchedulePageClose_xpath)),200000);
   await driver.findElement(By.xpath(SchedulePageClose_xpath)).click();
   
}

async registerChatNameInRoom(roomName){
    var EnterRoomcss = `button[data-test-room-name="${roomName}"]`
    var EnterchatNamecss = '#setdisplayname-input-chatname';
    await driver.findElement(By.css(EnterRoomcss)).click();
    driver.sleep(3000);
   
    await driver.findElement(By.css(EnterchatNamecss)).sendKeys(user);
    await driver.findElement(By.xpath("//button[@id='setdisplayname-btn-submit']")).click();
    driver.sleep(3000);
   // await driver.findElement(By.xpath(headerLobbyIcon_xpath)).click();
  

}

async clickLobbyIcon(){
    driver.sleep(3000);
    await driver.findElement(By.xpath(headerLobbyIcon_xpath)).click();
    const confirmbuttonElement = await driver.findElement(By.xpath(confirmButton_xpath)).isDisplayed();

    if(confirmbuttonElement == true){
        await driver.findElement(By.xpath(confirmButton_xpath)).click();
    }
    else{
        console.log("I am able to navigate back to Lobby")
    }
}


}

module.exports =  new setchatName();