import { join, resolve } from "path";

const basePath = resolve(__dirname, "../../");
const saucelabsAndroidFileName = "app-release-"+process.env.build_number+".apk";

const config = {
  basePath,
  appiumServerConfigLocal: {},
  appiumServerConfigSauceLabs: {
    host: "ondemand.saucelabs.com",
    port: 80,
    auth: `${process.env.SAUCELABS_USER}:${process.env.SAUCELABS_AUTH}`
  },
  appiumServerConfigLocal: {},
  testObjectServerConfigSauceLabs: "https://appium.testobject.com/wd/hub",
  saucelabsAndroidFileName,
  androidOutput: join(basePath, "app", saucelabsAndroidFileName),
  androidSauceLabsOutput: join(saucelabsAndroidFileName),
  // testObjectServerConfigSauceLabs: 'https://us1.appium.testobject.com/wd/hub',
  testobject_api_key : '755D3F48CCCE4D1485C4D8EA1A6B0461'
};
export default config;
