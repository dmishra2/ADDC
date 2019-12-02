import wd from "wd";
import basePage from './basePage';


const existingUserButton = "com.addc.utilityapp:id/existing_user";
const changeLangEnglishButton = "com.addc.utilityapp:id/change_to_english";
const changeLangArabicButton = "com.addc.utilityapp:id/change_to_arabic";
const logoIcon = "com.addc.utilityapp:id/landing_logo";
const heading = "com.addc.utilityapp:id/landing_title";
const headingDesc = "com.addc.utilityapp:id/landing_desc";
const subHeading = "com.addc.utilityapp:id/landing_pic_explore";
const subHeadingDesc = "com.addc.utilityapp:id/landing_pic_desp";
const changeLanglbl = "com.addc.utilityapp:id/change_language";

const newUserbtn = "com.addc.utilityapp:id/new_user";

export default class {

    constructor(driver, currentPlatform, deviceName) {
        this.driver = driver;
        this.currentPlatform = currentPlatform;
        this.deviceName = deviceName;
    }

    checkLogoIconDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', logoIcon);
    } 

    checkHeadingDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', heading);
    } 

    getHeading() {
        return basePage.getTextFromElement(this.driver, 'Id', heading);
    } 

    checkHeadingDescDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', headingDesc);
    } 

    getHeadingDesc() {
        return basePage.getTextFromElement(this.driver, 'Id', headingDesc);
    } 

    checkSubHeadingDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', subHeading);
    } 

    getSubHeading() {
        return basePage.getTextFromElement(this.driver, 'Id', subHeading);
    } 

    checkSubHeadingDescDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', subHeadingDesc);
    } 

    getSubHeadingDesc() {
        return basePage.getTextFromElement(this.driver, 'Id', subHeadingDesc);
    } 

    checkChangeLanglblDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', changeLanglbl);
    } 

    getChangeLanglbl() {
        return basePage.getTextFromElement(this.driver, 'Id', changeLanglbl);
    } 

    checkChangeLangEngButtonDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', changeLangEnglishButton);
    } 

    checkChangeLangArabicButtonDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', changeLangArabicButton);
    }

    checkExistingUserbtnDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', existingUserButton);
    } 

    checkNewUserbtnDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', newUserbtn);
    }

    clickChangeLangEnglishButton() {
        return basePage.waitForElementToAppear(this.driver, 'Id', changeLangEnglishButton).click();
    }   

    clickExistingUserButton() {
        return basePage.waitForElementToAppear(this.driver, 'Id', existingUserButton).click();
    }  
}