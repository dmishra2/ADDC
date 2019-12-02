@LoginPage
Feature: Login User Valid
Login for existing user

@loginUser
Scenario: ADDC User Login
    When User should see the Homescreen Page
    Then User should see headingDescription as headingDesc on Homescreen Page
    And User should see subHeading as subHeading on Homescreen Page
    And User should see subHeadingDescription as subHeadingDesc on Homescreen Page
    And User must see changeLanguageButton on Homescreen Page
    And User should see changeLanguageLabel as changeLanguageLabel on Homescreen Page
    And User must see existingUserButton on Homescreen Page
    And User must see newUserButton on Homescreen Page
    When User should be able to click existingUserButton on Homescreen Page
    Then User should see the Login Page
    And User must see userNametxtbox on Login Page
    And User must see passwordtxtbox on Login Page
    And User must see loginButton on Login Page
    And User should see forgotPasswordlnk as forgotPasswordlnktxt on Login Page
    Then User enters UserId as User Id
    And User enters Password as Password
    When User should be able to click on the Login button on Login Page
    Then User should see the My Account Page
    And User should see payNowButton as payNowButtonText on My Account Page
    And User must see outStandingBalanceSection on My Account Page
    And User should see outStandingBalanceHeading as outStandingBalanceHeadingtxt on My Account Page
    And User should see outStandingBalanceCurrency as outStandingBalanceCurrencytxt on My Account Page
    And User should see outStandingBalanceValue as outStandingBalanceValuetxt on My Account Page
    And User must see menuButton on My Account Page
    When User should be able to click on the Menu button on My Account Page
    Then  User should see the Menu
    And User should see myProfileMenuButton as myProfileMenuButtontxt on Menu Screen
    When User should be able to click on the My Profile Menu button on the Menu
    Then User should see the My Profile Page
    And User should see editButton as editButtontxt on My Profile Page
    And User should see customerIdHeader as customerIdHeadertxt on My Profile Page
    And User should see myProfileDesc as myProfileDesctxt on My Profile Page
    And User should see fullNamelbl as fullNamelbltxt on My Profile Page
    And User should see fullNameValue as fullNameValuetxt on My Profile Page
    And User should see customerIdlbl as customerIdlbltxt on My Profile Page
    And User should see customerIdValue as customerIdValuetxt on My Profile Page
    And User should see userNamelbl as userNamelbltxt on My Profile Page
    And User should see userNameValue as UserId on My Profile Page
    And User should see personalDetailslbl as personalDetailslbltxt on My Profile Page
    And User should see userEmaillbl as userEmaillbltxt on My Profile Page
    And User should see userEmailValue as userEmailValuetxt on My Profile Page
    And User should see phoneNumberlbl as phoneNumberlbltxt on My Profile Page
    And User should see phoneNumberlblDesc as phoneNumberlblDesctxt on My Profile Page
    And User should see phoneNumberValue as phoneNumberValuetxt on My Profile Page
    And User must see preferredLangSection on My Account Page
    And User should see preferredLanglbl as preferredLanglbltxt on My Profile Page
    And User should see preferredLangValue as preferredLangValuetxt on My Profile Page
    And User should see changePasswordButton as changePasswordButtontxt on My Profile Page