import config from './config';


var deviceName, i = process.argv.indexOf("--deviceName");
var avdName, j = process.argv.indexOf("--avdName");
var osVersion, k = process.argv.indexOf("--osVersion");

if (i > -1) {
    deviceName = process.argv[i + 1];
};
if (j > -1) {
    avdName = process.argv[j + 1];
};
if (k > -1) {
    osVersion = process.argv[k + 1];
};

export default {
    ios: {
        platformName: 'iOS',
        platformVersion: '11.0',
        deviceName: 'iPhone 6',
        app: '/Users/guwah/Documents/bg-mobile-nga/ios/build/Build/Products/Debug-iphonesimulator/BGMobileNGA.app'
    },

    iosRemoteSimulator: {
        'appium-version': '1.6',
        platformName: 'iOS',
        platformVersion: '10.2',
        deviceName: 'iPhone 7 Plus Simulator',
        app: `sauce-storage:${config.saucelabsIOSFileName}`
    },
    iosRemoteDevice: {
        platformName: 'iOS',
        platformVersion: '10.2',
        deviceName: 'iPhone 7 Plus Simulator',
        app: `sauce-storage:${config.saucelabsIOSFileNameIPA}`
    },
    android: {
        platformName: 'Android',
        platformVersion: '9.0',
        deviceName: 'emulator-5554',
        app: '/Users/divmishr0/Documents/ADDC/addc-automation-tests/app/ADDC Mobile.apk'
    },
    androidRemote: {
        'appium-version': '1.6.5',
        platformName: 'Android',
        platformVersion: '6.0',
        deviceName: 'Android Emulator',
        app: `sauce-storage:${config.saucelabsAndroidFileName}`,
        maxInstances: '16'
    },
     
    androidTestObject: {
        platformName: 'Android',
        platformVersion: '8.0.0',
        deviceName: 'Motorola Moto G6',
        phoneOnly:   'true',
        tabletOnly: 'false',
        privateDevicesOnly:'false'
    },

    iosTestObject: {
        platformName: 'iOS',
        deviceName: deviceName,
        platformVersion: osVersion,
        phoneOnly:   'true',
        tabletOnly: 'false',
        privateDevicesOnly:'false',
        appiumVersion : '1.9.1' 
    },

    iosTestObject1: {
        platformName: 'iOS',
        platformVersion: '10.3',
        phoneOnly:   'true',
        tabletOnly: 'false',
        privateDevicesOnly:'false'
    }

};