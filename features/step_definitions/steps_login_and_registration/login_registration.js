import { defineSupportCode } from "cucumber";
import Q from "q";
import wd from "wd";
import { assert, expect } from "chai";
import testData from "../../test-data";

defineSupportCode(({When, Then, And}) => {

  Then("User should see the Homescreen Page", async function () {
    await this.pages.homeScreen.clickChangeLangEnglishButton();
    await this.driver.sleep(5000);
    assert.isTrue(await this.pages.homeScreen.checkLogoIconDisplayed(), "Logo Icon is not Displayed");
    assert.isTrue(await this.pages.homeScreen.checkHeadingDisplayed(), "Welcome Heading is not Displayed");
    let copyText = await this.pages.homeScreen.getHeading();
    assert.equal(copyText, "Welcome to ADDC", "Heading is not correct");
  });

  Then("User should see {element} as {text} on {page}", async function (element,text,page) {
    let copyText;
    switch(page){
      case 'Homescreen Page' :
        switch (element){
          case 'headingDescription' :
            assert.isTrue(await this.pages.homeScreen.checkHeadingDescDisplayed(), "Welcome Heading is not Displayed");
            copyText = await this.pages.homeScreen.getHeadingDesc();
            assert.equal(copyText, testData[text], "Heading Desc is not correct");
            break;
          case 'subHeading' :
            assert.isTrue(await this.pages.homeScreen.checkSubHeadingDisplayed(), "Sub-Heading is not Displayed");
            copyText = await this.pages.homeScreen.getSubHeading();
            assert.equal(copyText, testData[text], "Sub-Heading is not correct");
            break;
          case 'subHeadingDescription' :
            assert.isTrue(await this.pages.homeScreen.checkSubHeadingDescDisplayed(), "Sub-Heading Description is not Displayed");
            copyText = await this.pages.homeScreen.getSubHeadingDesc();
            assert.equal(copyText, testData[text], "Sub-Heading Description is not correct");
            break;
          case 'changeLanguageLabel' :
            assert.isTrue(await this.pages.homeScreen.checkChangeLanglblDisplayed(), "Change Language Label is not Displayed");
            copyText = await this.pages.homeScreen.getChangeLanglbl();
            assert.equal(copyText, testData[text], "Change Language Label is not correct");
            break;
      } 
      break;
      case 'Login Page' :
        switch (element){
          case 'forgotYourPasswordLink' :
            assert.isTrue(await this.pages.loginScreen.checkForgotYourPasswordlnkDisplayed(), "Change Language Label is not Displayed");
            copyText = await this.pages.loginScreen.getForgotYourPasswordlnktxt();
            assert.equal(copyText, testData[text], "Forgot Your Password  Link text is not correct");
            break;
        }
      break;
      case 'My Account Page' :
        switch (element){
          case 'payNowButton' :
            assert.isTrue(await this.pages.myAccountScreen.checkPayNowButtonDisplayed(), "Pay Now Button is not Displayed");
            copyText = await this.pages.myAccountScreen.getPayNowButtontxt();
            assert.equal(copyText, testData[text], " Pay Now Button text is not correct");
            break;
          case 'outStandingBalanceHeading' :
            assert.isTrue(await this.pages.myAccountScreen.checkOutStandingBalanceHeadingDisplayed(), "Out Standing Balance Heading is not Displayed");
            copyText = await this.pages.myAccountScreen.getOutStandingBalanceHeadingtxt();
            assert.equal(copyText, testData[text], " Out Standing Balance Heading text is not correct");
            break;
          case 'outStandingBalanceCurrency' :
            assert.isTrue(await this.pages.myAccountScreen.checkOutStandingBalanceCurrencyDisplayed(), "Out Standing Balance Heading is not Displayed");
            copyText = await this.pages.myAccountScreen.getOutStandingBalanceCurrencytxt();
            assert.equal(copyText, testData[text], " Out Standing Balance Currency text is not correct");
            break;
          case 'outStandingBalanceValue' :
            assert.isTrue(await this.pages.myAccountScreen.checkOutStandingBalanceValueDisplayed(), "Out Standing Balance Heading is not Displayed");
            copyText = await this.pages.myAccountScreen.getOutStandingBalanceValuetxt();
            assert.equal(copyText, testData[text], " Out Standing Balance Value text is not correct");
            break;
        }
      break;
      case 'Menu Screen' :
        switch (element){
          case 'myProfileMenuButton' :
            assert.isTrue(await this.pages.menuScreen.checkMyProfileButtonDisplayed(), "My Profile Menu Button is not Displayed");
            copyText = await this.pages.menuScreen.getMyProfileButtontxt();
            assert.equal(copyText, testData[text], "My Profile Menu Button text is not correct");
            await this.driver.sleep(2000);
            break;
        }
      break;
      case 'My Profile Page' :
        switch (element){
          case 'editButton' :
            assert.isTrue(await this.pages.myProfileScreen.checkEditButtonDisplayed(), "Edit Button is not Displayed");
            copyText = await this.pages.myProfileScreen.getEditButtontxt();
            assert.equal(copyText, testData[text], "Edit Button text is not correct");
            break;
          case 'customerIdHeader' :
            assert.isTrue(await this.pages.myProfileScreen.checkCustomerIdHeaderDisplayed(), "Customer Id Header is not Displayed");
            copyText = await this.pages.myProfileScreen.getCustomerIdHeadertxt();
            assert.equal(copyText, testData[text], "Customer Id Header text is not correct");
            break;
          case 'myProfileDesc' :
            assert.isTrue(await this.pages.myProfileScreen.checkMyProfileDescDisplayed(), "My Profile Description is not Displayed");
            copyText = await this.pages.myProfileScreen.getMyProfileDesctxt();
            assert.equal(copyText, testData[text], "My Profile Description text is not correct");
            break;
          case 'fullNamelbl' :
            assert.isTrue(await this.pages.myProfileScreen.checkFullNamelblDisplayed(), "Full Name Label is not Displayed");
            copyText = await this.pages.myProfileScreen.getFullNamelbltxt();
            assert.equal(copyText, testData[text], "Full Name Label text is not correct");
            break;
          case 'fullNameValue' :
            assert.isTrue(await this.pages.myProfileScreen.checkFullNameValueDisplayed(), "Full Name Value is not Displayed");
            copyText = await this.pages.myProfileScreen.getFullNameValuetxt();
            assert.equal(copyText, testData[text], "Full Name Value text is not correct");
            break;
          case 'customerIdlbl' :
            assert.isTrue(await this.pages.myProfileScreen.checkCustomerIdlblDisplayed(), "Customer Id Label is not Displayed");
            copyText = await this.pages.myProfileScreen.getCustomerIdlbltxt();
            assert.equal(copyText, testData[text], "Customer Id Label text is not correct");
            break;
          case 'customerIdValue' :
            assert.isTrue(await this.pages.myProfileScreen.checkCustomerIdValueDisplayed(), "Customer Id Value is not Displayed");
            copyText = await this.pages.myProfileScreen.getCustomerIdValuetxt();
            assert.equal(copyText, testData[text], "Customer Id Value text is not correct");
            break;
          case 'userNamelbl' :
            assert.isTrue(await this.pages.myProfileScreen.checkUserNamelblDisplayed(), "User Name Label is not Displayed");
            copyText = await this.pages.myProfileScreen.getUserNamelbltxt();
            assert.equal(copyText, testData[text], "User Name Label text is not correct");
            break;
          case 'userNameValue' :
            assert.isTrue(await this.pages.myProfileScreen.checkUserNameValueDisplayed(), "User Name Value is not Displayed");
            copyText = await this.pages.myProfileScreen.getUserNameValuetxt();
            assert.equal(copyText, testData[text], "User Name Value text is not correct");
            break;
          case 'personalDetailslbl' :
            assert.isTrue(await this.pages.myProfileScreen.checkPersonalDetailslblDisplayed(), "Personal Details Label is not Displayed");
            copyText = await this.pages.myProfileScreen.getPersonalDetailslbltxt();
            assert.equal(copyText, testData[text], "Personal Details Label text is not correct");
            break;
          case 'userEmaillbl' :
            assert.isTrue(await this.pages.myProfileScreen.checkUserEmaillblDisplayed(), "User Email Label is not Displayed");
            copyText = await this.pages.myProfileScreen.getUserEmaillbltxt();
            assert.equal(copyText, testData[text], "User Email Label text is not correct");
            break;
          case 'userEmailValue' :
            assert.isTrue(await this.pages.myProfileScreen.checkUserEmailValueDisplayed(), "User Email Value is not Displayed");
            copyText = await this.pages.myProfileScreen.getUserEmailValuetxt();
            assert.equal(copyText, testData[text], "User Email Value text is not correct");
            break;
          case 'phoneNumberlbl' :
            assert.isTrue(await this.pages.myProfileScreen.checkPhoneNumberlblDisplayed(), "Phone Number Label is not Displayed");
            copyText = await this.pages.myProfileScreen.getPhoneNumberlbltxt();
            assert.equal(copyText, testData[text], "Phone Number Label text is not correct");
            break;
          case 'phoneNumberlblDesc' :
            assert.isTrue(await this.pages.myProfileScreen.checkPhoneNumberlblDescDisplayed(), "Phone Number Label Description is not Displayed");
            copyText = await this.pages.myProfileScreen.getPhoneNumberlblDesctxt();
            assert.equal(copyText, testData[text], "Phone Number Label Description text is not correct");
            break;
          case 'phoneNumberValue' :
            assert.isTrue(await this.pages.myProfileScreen.checkPhoneNumberValueDisplayed(), "Phone Number Value is not Displayed");
            copyText = await this.pages.myProfileScreen.getPhoneNumberValuetxt();
            assert.equal(copyText, testData[text], "Phone Number Value text is not correct");
            break;
          case 'preferredLanglbl' :
            assert.isTrue(await this.pages.myProfileScreen.checkPreferredLanglblDisplayed(), "Preferred Language Label is not Displayed");
            copyText = await this.pages.myProfileScreen.getPreferredLanglbltxt();
            assert.equal(copyText, testData[text], "Preferred Language Label text is not correct");
            break;
          case 'preferredLangValue' :
            assert.isTrue(await this.pages.myProfileScreen.checkPreferredLangValueDisplayed(), "Preferred Language Value is not Displayed");
            copyText = await this.pages.myProfileScreen.getPreferredLangValuetxt();
            assert.equal(copyText, testData[text], "Preferred Language Value text is not correct");
            break;
          case 'changePasswordButton' :
            assert.isTrue(await this.pages.myProfileScreen.checkChangePasswordButtonDisplayed(), "Change Password Button is not Displayed");
            copyText = await this.pages.myProfileScreen.getChangePasswordButtontxt();
            assert.equal(copyText, testData[text], "Change Password Button text is not correct");
            break;  
        }
      break;
      } 
  });

  Then("User must see {element} on {page}", async function (element,page) {
    switch(page){
      case 'Homescreen Page' :
        switch (element){
          case 'changeLangEngButton' :
            assert.isTrue(await this.pages.homeScreen.checkChangeLangEngButtonDisplayed(), "Change Language English  Button is not Displayed");
            break;
          case 'changeLangArabicButton' :
            assert.isTrue(await this.pages.homeScreen.checkChangeLangArabicButtonDisplayed(), "Change Language Arabic Button is not Displayed");
            break;
          case 'existingUserButton' :
            assert.isTrue(await this.pages.homeScreen.checkExistingUserbtnDisplayed(), "Existing User Button is not Displayed");
            break;
          case 'newUserButton' :
            assert.isTrue(await this.pages.homeScreen.checkNewUserbtnDisplayed(), "New User Button is not Displayed");
            break;
        }
      case 'Login Page' :
          switch (element){
            case 'userNametxtbox' :
                assert.isTrue(await this.pages.loginScreen.checkUserNametxtboxDisplayed(), "User Name Textbox is not Displayed");
                break;
            case 'passwordtxtbox' :
                assert.isTrue(await this.pages.loginScreen.checkPasswordtxtboxDisplayed(), "Password Textbox is not Displayed");
                break;
            case 'loginButton' :
                assert.isTrue(await this.pages.loginScreen.checkLoginButtonDisplayed(), "Login Button is not Displayed");
                break;   
          } 
    break;
      case 'My Account Page' :
        switch (element){
          case 'outStandingBalanceSection' :
            assert.isTrue(await this.pages.myAccountScreen.checkOutStandingBalanceSectionDisplayed(), "Outstanding Balance Section is not Displayed");
            break;
          case 'menuButton' :
            assert.isTrue(await this.pages.myAccountScreen.checkMenuButtonDisplayed(), "Menu Button is not Displayed");
            break;
        } 
    break; 
    case 'My Profile Page' :
        switch (element){
          case 'preferredLangSection' :
              assert.isTrue(await this.pages.myProfileScreen.checkPreferredLangSectionDisplayed(), "Preferred Language Section is not Displayed");
              break;
        }    
    }
    
  });

  When("User should be able to click existingUserButton on Homescreen Page", async function () {
    await this.pages.homeScreen.clickExistingUserButton();
    await this.driver.sleep(5000);
  });

  Then("User should see the Login Page", async function () {
    let copyText;
    assert.isTrue(await this.pages.homeScreen.checkLogoIconDisplayed(), "Logo Icon is not Displayed");
    assert.isTrue(await this.pages.homeScreen.checkHeadingDisplayed(), "Welcome Heading is not Displayed");
    copyText = await this.pages.homeScreen.getHeading();
    assert.equal(copyText, "Welcome to ADDC", "Heading is not correct");

    assert.isTrue(await this.pages.loginScreen.checkHeadingDisplayed(), "Welcome Heading is not Displayed");
    copyText = await this.pages.loginScreen.getHeading();
    assert.equal(copyText, "Existing user", "Heading is not correct");

  });

 
  Then('User enters {UserId} as User Id', async function (UserId) {
    await this.pages.loginScreen.enterUserId(testData[UserId]);
    await this.driver.sleep(2000);
  });

  Then("User enters {Password} as Password", async function (Password) {
    await this.pages.loginScreen.enterPassword(testData[Password]);
    await this.driver.sleep(2000);
  });

  Then("User should be able to click on the Login button on Login Page", async function () {
    await this.pages.loginScreen.clickLoginButton();
    await this.driver.sleep(5000);
  });


});