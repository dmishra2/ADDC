import { defineSupportCode } from "cucumber";
import Q from "q";
import wd from "wd";
import { assert, expect } from "chai";

defineSupportCode(({When, Then, And}) => {

  Then("User should see the My Account Page", async function () {
    await this.driver.sleep(30000);
    assert.isTrue(await this.pages.myAccountScreen.checkMyAccountHeading(), "My Account Heading is not Displayed");
    let copyText = await this.pages.myAccountScreen.getMyAccountHeading();
    assert.equal(copyText, "My account", "My Account Heading is not correct");
  });


  Then("User should be able to click on the Menu button on My Account Page", async function () {
    await this.pages.myAccountScreen.clickMenuButton();
  });


});