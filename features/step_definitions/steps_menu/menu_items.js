import { defineSupportCode } from "cucumber";
import Q from "q";
import wd from "wd";
import { assert, expect } from "chai";

defineSupportCode(({When, Then, And}) => {

  Then("User should see the Menu", async function () {
    await this.driver.sleep(2000);
    assert.isTrue(await this.pages.menuScreen.checkMenuHeading(), "Menu Heading is not Displayed");
    let copyText = await this.pages.menuScreen.getMenuHeading();
    assert.equal(copyText, "Welcome To ADDC", "Menu Heading is not correct");
  });


  Then("User should be able to click on the My Profile Menu button on the Menu", async function () {
    await this.pages.menuScreen.clickMyProfileMenuButton();
  });


});