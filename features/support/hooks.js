import { defineSupportCode, Status, HookScenarioResult } from "cucumber";
import { get } from "lodash/fp";
import wd from "wd";
import gutil from 'gulp-util';
const { exec } = require('child_process');

defineSupportCode(({ After, Before }) => {

  Before("@skip", function (scenario, callback) {
    console.log('Skipped the scenario as pending due to @skip tag');
    callback(null, 'pending');
  });

  Before(async function beforeTest({ status, ...data }) {
    if (this.parameters.saucelabs || this.parameters.testobject) {
      gutil.log('Running tests in saucelabs device - ' + this.currentPlatform)
      this.parameters.device.name = get("scenario.name", data);
      this.allPassed = true;
    }
    //gutil.log('Running tests in local device - ' + this.currentPlatform )

    await this.driver.init(this.parameters.device);
    await this.driver.setImplicitWaitTimeout(2000);
  });

  After(async function (scenario, ...data) {
    let world = this;
    /*if (this.parameters.testobject && scenario.isFailed()) {
      await this.driver.takeScreenshot().then(async function (data) {
        return await world.attach(data, 'image/png');
      });

    } else if (scenario.isFailed()) {
      await this.driver.saveScreenshot().then(async function (buffer) {
        await world.attach(buffer, 'image/png');
      })
    }*/
    await this.driver.quit();
    gutil.log('Closed WebDriver Instance')
  });
});
