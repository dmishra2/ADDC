
import { defineSupportCode } from 'cucumber';
import 'colors';
import { install } from 'source-map-support';
import chai, { should, expect } from 'chai';
import Bluebird from 'bluebird';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';
import homeScreen from '../pages/pages_common/homeScreen';
import loginScreen from '../pages/pages_login_and_registration/loginScreen';
import myAccountScreen from '../pages/pages_login_and_registration/myAccountScreen';
import myProfileScreen from '../pages/pages_login_and_registration/myProfileScreen';
import menuScreen from '../pages/pages_common/menuScreen';
// Enable source maps
install();

chai.use(chaiAsPromised);
global.should = should();
global.expect = expect;
global.Promise = Bluebird;

const appiumServerConfig = {
    host: "localhost",
    port: 4723
};

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;
wd.addPromiseChainMethod();

class World {
    constructor({ attach, parameters }) {
        if (typeof parameters.appiumServer === 'string') {
            this.driver = wd.promiseChainRemote(parameters.appiumServer);
        } else {
            this.driver = wd.promiseChainRemote(
                parameters.appiumServer || appiumServerConfig
            );
        }
        this.parameters = parameters;
        this.currentPlatform = parameters.device.platformName;
        this.deviceName = parameters.device.deviceName;
        this.pages = {
            homeScreen: new homeScreen(this.driver, this.currentPlatform, this.deviceName),
            loginScreen: new loginScreen(this.driver, this.currentPlatform, this.deviceName),
            myAccountScreen: new myAccountScreen(this.driver, this.currentPlatform, this.deviceName),
            myProfileScreen: new myProfileScreen(this.driver, this.currentPlatform, this.deviceName),
            menuScreen: new menuScreen(this.driver, this.currentPlatform, this.deviceName)
        };
        this.attach = attach;
    }
}

defineSupportCode(({ setWorldConstructor, setDefaultTimeout }) => {
    setWorldConstructor(World);
    setDefaultTimeout(1200 * 1000);
});
