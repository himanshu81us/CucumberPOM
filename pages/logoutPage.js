const { By, Key, until } = require('selenium-webdriver');
const { driver} = require('../config/hooks');
const lobbypage = require ('./lobbypage');
const assert = require('assert');
var menuIcon_xpath = `//div[@class='icon menu']`;
var LogoutButton_xpath =`//button[@type='button']/span[text()='Log Out']`;
var LogoutConfirmButoon_xpath =`//button[@class='dialogButton confirmButton']/span[text()='Confirm']`;
var LoginButton_xpath = `//div[@class='icon login']`;




class logoutPage {

    async logout (){
        driver.sleep(5000);
        await driver.findElement(By.xpath(menuIcon_xpath)).click();
        driver.sleep(3000);
        await driver.findElement(By.xpath(LogoutButton_xpath)).click();
        driver.sleep(3000);
        await driver.findElement(By.xpath(LogoutConfirmButoon_xpath)).click();

}

async UserLoggedOut(){

    await driver.sleep(7000);

    const LoginButtonDisplay = await driver.findElement(By.xpath(LoginButton_xpath));
    
    return LoginButtonDisplay.isDisplayed;

}
}
    module.exports = new logoutPage();