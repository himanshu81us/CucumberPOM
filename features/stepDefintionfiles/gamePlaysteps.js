
const { Given, When, Then, Status} = require("@cucumber/cucumber");
const { By, Key, until, Builder } = require('selenium-webdriver');
require('chromedriver');
const dotenv = require ('dotenv');
//let chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
//const { Before, After, driver ,AfterAll, BeforeAll} = require('../../config/hooks');
const basepage = require('../../pages/basepage')
const loginPage = require('../../pages/loginPage')
const lobbypage = require('../../pages/lobbypage')
const setchatName = require('../../pages/setchatName')
const inRoompage = require('../../pages/inRoompage')
const betHistorypage = require('../../pages/betHistorypage')
const logoutPage = require ('../../pages/logoutPage')

'use strict';

var userInitBalance;
var userAfterStakeBalance;
var userAfterGameBalance;
var GameID;
var gameWaitTime;


    

                dotenv.config({path: `./route/.env.${process.env.NODE_ENV}` });
                console.log("Desktop Sanity Test is running on ", process.env.NODE_ENV);
                var ENV = process.env.NODE_ENV;

               
                
            
                     Given('I have url to login {string}',{timeout:20*1000}, async function (string) {
                          
                        var site = "https://" + ENV + string;
                        loginPage.go_to_url(site);
                     });
            
            
                     When('I enter random user and password',{timeout:20*1000}, async function () {
                        loginPage.login();
                          
                           
                         // loginPage.AcceptTandC();
                           
                        

                     });
            
             
            
                     Then('my login to the site should be successfull', async function () {
                    // let result =  await loginPage.assertLobbyMenuDisplay();
                     let result = await lobbypage.isLobbyDisplayed();
                      assert(result, 'true');
                      
                                       
         

                     });

                     
              
                       When('I set the chatname of the user in room {string}',{timeout:20*1000}, async function (roomName) {
                        setchatName.registerChatNameInRoom(roomName);
                        
                       });
             
              
                       Then('chatname of the user is set', {timeout:20*1000}, async function () {
                        let result = await lobbypage.isLobbyDisplayed();
                        console.log("User is on the Lobby " +result);
                        assert(result, 'true');
                       });
              
              
                       When('I get balance of the user', {timeout:20*1000}, async function () {
                     
                       userInitBalance = await lobbypage.getBalance();
                      
                       });
              
                
              
                       Then('balance of the user should not be {string}', async function (string) {
                        console.log(userInitBalance);
                        assert(userInitBalance>string);
                       });
              
                
              
                       When('I Enter the room {string} during salesphase whilst the game timer values is less than {string}', async function (string1, string2) {
                        gameWaitTime = await inRoompage.checkGameIsInSalesphase(string1, string2);
                        await inRoompage.EnterRoom(string1)
                       });
              
                       Then('I see a welcome message pop up', async function () {
                        await inRoompage.acceptWelcomeMessage();
                       });
              
              
                       When('I accepted the welcome pop up and click buy button on TP', async function () {
                        inRoompage.MultiStakePurchaseTickets();
                       });
              
              
                       Then('tickets are purchased',{timeout:20*1000}, async function () {
                         const ticketspurchased = await inRoompage.assertTicketspurchased();
                         console.log(ticketspurchased);
                         console.log(ticketspurchased.includes("purchased"));
                         
                       });
              
                 
              
                       Then('Balance is deducted', {timeout:20*1000}, async function () {
                        userAfterStakeBalance = await lobbypage.getBalance();
                        console.log(userAfterStakeBalance);
                        assert(userAfterStakeBalance < userInitBalance);
                       
                         
                       });
              
                
              
                       When('the sales phase is closed and gameid is captured', async function () {
                        GameID = await inRoompage.captureGameID();
                        console.log(GameID);
                        await inRoompage.waitForSalesphaseToClose();
                      

                       });
              
               
              
                       Then('Ball calls are visible', async function () {
                        var gameStarted = await inRoompage.waitForBallCalls();
                        assert(gameStarted==true);
                       });
              
                 
              
                       Then('wait for win animation', async function () {
                         await inRoompage.waitForHouseWinAnimation();
                       });
              
                
              
                       Then('user balance is increased', async function () {
                         userAfterGameBalance = await lobbypage.getBalance();
                         console.log(userAfterGameBalance);
                         //assert(userAfterGameBalance>userAfterStakeBalance);
                       });
              
              
                       When('the bet history is opened with gameid', async function () {
                           await betHistorypage.openBetHistoryfromMenu();
                           await betHistorypage.enterValuesOnBH(GameID);

                       });
              
               
              
                       Then('Bet history page is displayed', async function () {
                         await betHistorypage.determineBHOutcome(GameID);
                       });
              
               
              
                       Then('user winnings are displayed on Bet history', async function () {
                         await betHistorypage.betHistoryContent(GameID);
                       });

                       When('user nevigate to the client and click on logout button', async function(){
                        await logoutPage.logout();

                       });

                       Then ('Then user is logged out', async function(){
                        await logoutPage.UserLoggedOut();
                       });

                  
              


                     

                        
            