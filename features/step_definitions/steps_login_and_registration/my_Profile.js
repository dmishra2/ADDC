import { defineSupportCode } from "cucumber";
import Q from "q";
import wd from "wd";
import { assert, expect } from "chai";

defineSupportCode(({When, Then, And}) => {

  Then("User should see the My Profile Page", async function () {
    await this.driver.sleep(20000);
    assert.isTrue(await this.pages.myProfileScreen.checkMyProfileHeading(), "My Profile Heading is not Displayed");
    let copyText = await this.pages.myProfileScreen.getMyProfileHeading();
    assert.equal(copyText, "My profile", "My Profile Heading is not correct");
  });

  


});