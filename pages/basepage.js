const { By, Key, until, Builder } = require('selenium-webdriver');
const { driver} = require('../config/hooks');



class basepage{

       

    constructor(){
        global.driver = driver;
        
    }
    
    go_to_url(site){
      driver.get(site);
    }

    async createUser(){

      var user = "Q";
          
        var n = 8 ;
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for( var i=0; i < n; i++ )
            user += possible.charAt(Math.floor(Math.random() * possible.length));
            user= user[0].toUpperCase() + user.substring(1);

          return user;

     }

     async takeScreenShot(){

      return await driver.takeScreenshot().then(function(referenceScreenShot) {
        
        world.attach(referenceScreenShot, "base64:image/png");

      });
    }
    
}

module.exports = basepage; 
