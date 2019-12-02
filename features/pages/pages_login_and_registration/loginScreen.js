import wd from "wd";
import basePage from '../pages_common/basePage';


const userIdTextBox = "com.addc.utilityapp:id/userName";
const passwordTextBox = "com.addc.utilityapp:id/passWord";
const loginButton = "com.addc.utilityapp:id/Login_button";
const heading = "com.addc.utilityapp:id/extisting_msg";
const forgotYourPasswordlnk = "com.addc.utilityapp:id/forgot_pass";



export default class {

    constructor(driver, currentPlatform, deviceName) {
        this.driver = driver;
        this.currentPlatform = currentPlatform;
        this.deviceName = deviceName;
    }

    checkHeadingDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', heading);
    } 

    getHeading() {
        return basePage.getTextFromElement(this.driver, 'Id', heading);
    } 

    checkForgotYourPasswordlnkDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', forgotYourPasswordlnk);
    } 

    getForgotYourPasswordlnktxt() {
        return basePage.getTextFromElement(this.driver, 'Id', forgotYourPasswordlnk);
    }

    checkUserNametxtboxDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', userIdTextBox);
    }

    checkPasswordtxtboxDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', forgotYourPasswordlnk);
    }

    checkLoginButtonDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', loginButton);
    }

    enterUserId(UserId) {
        return basePage.waitForElementToAppear(this.driver, 'Id', userIdTextBox).sendKeys(UserId);
    }   

    enterPassword(Password) {
        return basePage.waitForElementToAppear(this.driver, 'Id', passwordTextBox).sendKeys(Password);
    } 
    
    clickLoginButton() {
        return basePage.waitForElementToAppear(this.driver, 'Id', loginButton).click();
    } 
}