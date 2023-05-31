const {setDefaultTimeout, BeforeAll, Before, After, Status, AfterAll} = require("@cucumber/cucumber");
const { Builder } = require('selenium-webdriver');
 require('chromedriver');
const dotenv = require ('dotenv');
let chrome = require('selenium-webdriver/chrome');

var user = "Q";
          
var n = 8 ;
var possible = "abcdefghijklmnopqrstuvwxyz";

for( var i=0; i < n; i++ )
     user += possible.charAt(Math.floor(Math.random() * possible.length));
     user= user[0].toUpperCase() + user.substring(1);

                             
 

var options = new chrome.Options();

//options.addArguments("--headless");
//options.addArguments("--disable-gpu");
//options.addArguments("--no-sandbox");
options.excludeSwitches("enable-logging");
options.addArguments("--window-size=1400,600");

var driver =new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

            driver.manage().window().maximize();
            driver.manage().setTimeouts( { implicit: 15000 } );  
            setDefaultTimeout(1000 * 1000);

          
             

After( async function (BrandedRoom) {
    var world = this;
    if (BrandedRoom.result.status === Status.FAILED) {

        return await driver.takeScreenshot().then(function(screenShot, error) {
            if (!error) {
                world.attach(screenShot, "base64:image/png");
            }
        });
    }else{
       
        return await driver.takeScreenshot().then(function(passedScreenShot) {
        
            world.attach(passedScreenShot, "base64:image/png");
    });

    }
});



AfterAll({timeout:20*1000}, async function  () {
// await driver.close();
//    await driver.quit();
   
});







                       module.exports = {
                        
                        driver,
                        BeforeAll,
                        After,
                        AfterAll,
                        Before,
                        user
                      

                       };