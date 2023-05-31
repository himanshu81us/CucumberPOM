const { By, Key, until, Builder } = require('selenium-webdriver');
const { driver} = require('../config/hooks');



class basepage{

       

    constructor(){
        global.driver = driver;
        
    }
    
    go_to_url(site){
      driver.get(site);
    }
    
}

module.exports = basepage; 
