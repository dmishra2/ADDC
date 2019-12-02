import wd from "wd";
import basePage from '../pages_common/basePage';


const myAccountHeading = "com.addc.utilityapp:id/actionBarTitle";
const payNowButton = "com.addc.utilityapp:id/actionBarText";
const outStandingBalanceHeading = "com.addc.utilityapp:id/balance_text";
const outStandingBalanceCurrency = "com.addc.utilityapp:id/currency";
const outStandingBalanceValue = "com.addc.utilityapp:id/balance_amount";
const outStandingBalanceSection = "com.addc.utilityapp:id/outstanding_balance";
const menuButton = "com.addc.utilityapp:id/btn_slide";


export default class {

    constructor(driver, currentPlatform, deviceName) {
        this.driver = driver;
        this.currentPlatform = currentPlatform;
        this.deviceName = deviceName;
    }

    checkMyAccountHeading() {
        return basePage.isElementDisplayed(this.driver, 'Id', myAccountHeading);
    } 

    getMyAccountHeading() {
        return basePage.getTextFromElement(this.driver, 'Id', myAccountHeading);
    } 

    checkPayNowButtonDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', payNowButton);
    } 

    getPayNowButtontxt() {
        return basePage.getTextFromElement(this.driver, 'Id', payNowButton);
    }

    checkOutStandingBalanceHeadingDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', outStandingBalanceHeading);
    }

    getOutStandingBalanceHeadingtxt() {
        return basePage.getTextFromElement(this.driver, 'Id', outStandingBalanceHeading);
    }

    checkOutStandingBalanceCurrencyDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', outStandingBalanceCurrency);
    }

    getOutStandingBalanceCurrencytxt() {
        return basePage.getTextFromElement(this.driver, 'Id', outStandingBalanceCurrency);
    }

    checkOutStandingBalanceValueDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', outStandingBalanceValue);
    }

    getOutStandingBalanceValuetxt() {
        return basePage.getTextFromElement(this.driver, 'Id', outStandingBalanceValue);
    }

    checkOutStandingBalanceSectionDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', outStandingBalanceSection);
    }

    checkMenuButtonDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', menuButton);
    }
    clickMenuButton() {
        return basePage.waitForElementToAppear(this.driver, 'Id', menuButton).click();
    } 
}