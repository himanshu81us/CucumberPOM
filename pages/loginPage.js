const { By, Key, until, Builder } = require('selenium-webdriver');
const basepage = require ('./basepage');
const {user} = require('../config/hooks');
//const { elementIsVisible } = require('selenium-webdriver/lib/until');
const assert = require('assert');


     

     var username_xpath = `//input[@id='username']`;
     var password_xpath= `//input[@id='password']`;
     var LoginButton_xpath = `//button[@id='login']`;
     var TnC_Button_xpath = `//button[@class='dialogButton confirmButton']`;
     var HamburgerMenu_xpath = `//div[@data-test-id='topBarItemMenu']`;
     var AcceptTandC;
     var HamburgerMenuDisplay ;
    

 class loginPage extends basepage{

  async login(){
    

     driver.sleep(5000);
     driver.findElement(By.xpath(username_xpath)).sendKeys(user);
     await driver.findElement(By.xpath(password_xpath)).sendKeys(user);
     driver.sleep(3000);
     await driver.findElement(By.xpath(LoginButton_xpath)).click();

   //  AcceptTandC =  await driver.findElement(By.xpath(TnC_Button_xpath)).isDisplayed();
   //  console.log(AcceptTandC);

   //   if(AcceptTandC == true){
   //   await driver.findElement(By.xpath(TnC_Button_xpath)).click();
   //   console.log("Accepted Terms and Conditions");
   //  await  driver.sleep(3000); 
   //   }
     
   //   else{
   //      console.log("User logged in");
   //   }
   //  return AcceptTandC ;
     //driver.findElement(By.xpath("//div[@data-test-id='topBarItemMenu']")).isDisplayed();
    
} 
    
  async AcceptTandC(){

  await driver.findElement(By.xpath(TnC_Button_xpath)).click();
   
  //await driver.findElement(By.xpath("//div[@data-test-id='topBarItemMenu']")).click();
  console.log("The user that logged on Desktop client is ", user);

}

// async VerifyLogin(text){

//    // HamburgerMenuDisplay = await driver.findElement(By.xpath("//div[@data-test-id='topBarItemMenu']")).isDisplayed();
//    // assert(HamburgerMenuDisplay, "true");
//    // console.log("I am on the lobby");
       
// }
  
assertLobbyMenuDisplay = async function() {
    await driver.sleep(15000);
   return driver.findElement(By.xpath(HamburgerMenu_xpath)).isDisplayed();
   
}
    
}
module.exports = new loginPage();

//LOGIN PAGE
