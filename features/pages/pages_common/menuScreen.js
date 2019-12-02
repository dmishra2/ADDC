import wd from "wd";
import basePage from './basePage';


const menuHeading = "com.addc.utilityapp:id/actionBarTitle";
const myProfileMenuButton = "//android.widget.RelativeLayout[2]/android.widget.ImageView";
const myProfileMenuButtontxt = "//android.widget.RelativeLayout[2]/android.widget.TextView";


export default class {

    constructor(driver, currentPlatform, deviceName) {
        this.driver = driver;
        this.currentPlatform = currentPlatform;
        this.deviceName = deviceName;
    }

    checkMenuHeading() {
        return basePage.isElementDisplayed(this.driver, 'Id', menuHeading);
    } 

    getMenuHeading() {
        return basePage.getTextFromElement(this.driver, 'Id', menuHeading);
    } 

    checkMyProfileButtonDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'XPath', myProfileMenuButton);
    } 

    getMyProfileButtontxt() {
        return basePage.getTextFromElement(this.driver, 'XPath', myProfileMenuButtontxt);
    }

    
    clickMyProfileMenuButton() {
        return basePage.waitForElementToAppear(this.driver, 'XPath', myProfileMenuButton).click();
    } 
}