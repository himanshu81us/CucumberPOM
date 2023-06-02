
Feature: MultiStake Variant

    Feature Description A user should be able to enter AOTG room and purchase tickets 


Scenario Outline: GamePlay

    Given I have url to login "<siteUrl>"
    When I enter random user and password
    Then my login to the site should be successfull
    When I set the chatname of the user in room "<variant>"
    Then chatname of the user is set
    When I get balance of the user
    Then balance of the user should not be "0"
    When I Enter the room "<variant>" during salesphase whilst the game timer values is less than "00:01:20"
    Then I see a welcome message pop up
    When I accepted the welcome pop up and click buy button on TP
    Then tickets are purchased
    And Balance is deducted
    When the sales phase is closed and gameid is captured
    Then Ball calls are visible
    Then wait for win animation
    And user balance is increased
    When the bet history is opened with gameid
    Then Bet history page is displayed
    And user winnings are displayed on Bet history 
    When user nevigate to the client and click on logout button 
    Then user is logged out

    Examples:
    | siteUrl | variant  | 
    |-skybingo.virtuefusion.com/bingo/lobby|Clover Rollover Bingo|
    #|.play.meccabingo.com/bingo/lobby|Loose Women|
   # |-skybingo.virtuefusion.com/bingo/lobby|Mystical Bingo|
      |.play.meccabingo.com/bingo/lobby|Emoji Bingo|
   
   

 
   

