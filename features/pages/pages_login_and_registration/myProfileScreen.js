import wd from "wd";
import basePage from '../pages_common/basePage';


const myProfileHeading = "com.addc.utilityapp:id/actionBarTitle";
const editButton = "com.addc.utilityapp:id/actionBarText";
const customerIdHeadertxt = "com.addc.utilityapp:id/customer_id_header";
const myProfileDesc = "com.addc.utilityapp:id/myprof_desc";
const fullNamelbl = "com.addc.utilityapp:id/customer_name_lbl";
const fullNameValue = "com.addc.utilityapp:id/customer_name";
const customerIdlbl = "com.addc.utilityapp:id/customer_id_lbl";
const customerIdValue = "com.addc.utilityapp:id/customer_id";
const userNamelbl = "com.addc.utilityapp:id/usernametxt";
const userNameValue = "com.addc.utilityapp:id/usernameval";
const personalDetailslbl = "com.addc.utilityapp:id/personal_detls_lbl";
const userEmaillbl = "com.addc.utilityapp:id/email_lbl";
const userEmailValue = "com.addc.utilityapp:id/customer_email";
const phoneNumberlbl = "com.addc.utilityapp:id/phone_lbl";
const phoneNumberlblDesc = "com.addc.utilityapp:id/phone_lbl_desc";
const phoneNumberValue = "com.addc.utilityapp:id/customer_phone_number";
const preferredLangSection = "com.addc.utilityapp:id/myprofile_row_language";
const preferredLanglbl = "com.addc.utilityapp:id/customer_language_selected_to_sendbill";
const preferredLangValue = "com.addc.utilityapp:id/customer_selected_language_for_bill";
const changePasswordButton = "com.addc.utilityapp:id/change_pswd";


export default class {

    constructor(driver, currentPlatform, deviceName) {
        this.driver = driver;
        this.currentPlatform = currentPlatform;
        this.deviceName = deviceName;
    }

    checkMyProfileHeading() {
        return basePage.isElementDisplayed(this.driver, 'Id', myProfileHeading);
    } 

    getMyProfileHeading() {
        return basePage.getTextFromElement(this.driver, 'Id', myProfileHeading);
    } 

    checkEditButtonDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', editButton);
    } 

    getEditButtontxt() {
        return basePage.getTextFromElement(this.driver, 'Id', editButton);
    }

    checkCustomerIdHeaderDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', customerIdHeadertxt);
    }

    getCustomerIdHeadertxt() {
        return basePage.getTextFromElement(this.driver, 'Id', customerIdHeadertxt);
    }

    checkMyProfileDescDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', myProfileDesc);
    }

    getMyProfileDesctxt() {
        return basePage.getTextFromElement(this.driver, 'Id', myProfileDesc);
    }

    checkFullNamelblDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', fullNamelbl);
    }

    getFullNamelbltxt() {
        return basePage.getTextFromElement(this.driver, 'Id', fullNamelbl);
    }

    checkFullNameValueDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', fullNameValue);
    }

    getFullNameValuetxt() {
        return basePage.getTextFromElement(this.driver, 'Id', fullNameValue);
    }

    checkCustomerIdlblDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', customerIdlbl);
    }

    getCustomerIdlbltxt() {
        return basePage.getTextFromElement(this.driver, 'Id', customerIdlbl);
    }

    checkCustomerIdValueDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', customerIdValue);
    }

    getCustomerIdValuetxt() {
        return basePage.getTextFromElement(this.driver, 'Id', customerIdValue);
    }

    checkUserNamelblDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', userNamelbl);
    }

    getUserNamelbltxt() {
        return basePage.getTextFromElement(this.driver, 'Id', userNamelbl);
    }

    checkUserNameValueDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', userNameValue);
    }

    getUserNameValuetxt() {
        return basePage.getTextFromElement(this.driver, 'Id', userNameValue);
    }

    checkPersonalDetailslblDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', personalDetailslbl);
    }

    getPersonalDetailslbltxt() {
        return basePage.getTextFromElement(this.driver, 'Id', personalDetailslbl);
    }

    checkUserEmaillblDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', userEmaillbl);
    }

    getUserEmaillbltxt() {
        return basePage.getTextFromElement(this.driver, 'Id', userEmaillbl);
    }

    checkUserEmailValueDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', userEmailValue);
    }

    getUserEmailValuetxt() {
        return basePage.getTextFromElement(this.driver, 'Id', userEmailValue);
    }

    checkPhoneNumberlblDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', phoneNumberlbl);
    }

    getPhoneNumberlbltxt() {
        return basePage.getTextFromElement(this.driver, 'Id', phoneNumberlbl);
    }

    checkPhoneNumberlblDescDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', phoneNumberlblDesc);
    }

    getPhoneNumberlblDesctxt() {
        return basePage.getTextFromElement(this.driver, 'Id', phoneNumberlblDesc);
    }

    checkPhoneNumberValueDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', phoneNumberValue);
    }

    getPhoneNumberValuetxt() {
        return basePage.getTextFromElement(this.driver, 'Id', phoneNumberValue);
    }

    checkPreferredLangSectionDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', preferredLangSection);
    }

    checkPreferredLanglblDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', preferredLanglbl);
    }

    getPreferredLanglbltxt() {
        return basePage.getTextFromElement(this.driver, 'Id', preferredLanglbl);
    }

    checkPreferredLangValueDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', preferredLangValue);
    }

    getPreferredLangValuetxt() {
        return basePage.getTextFromElement(this.driver, 'Id', preferredLangValue);
    }

    checkChangePasswordButtonDisplayed() {
        return basePage.isElementDisplayed(this.driver, 'Id', changePasswordButton);
    }

    getChangePasswordButtontxt() {
        return basePage.getTextFromElement(this.driver, 'Id', changePasswordButton);
    }

}