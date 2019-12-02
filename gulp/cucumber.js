import { spawn } from 'child_process';
import gulp from 'gulp';
import { argv } from 'yargs';
import { nodeModulesBinaryPath } from './support/helpers';
import devices from './support/devices';
import config from './support/config';
import cucumber from 'gulp-cucumber';
import { uploadFile } from './support/helpers';
import reporter from 'cucumber-html-reporter';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
import reportResult from '../features/utlis/report-result';
import { error } from 'util';

var tag, i = process.argv.indexOf("--tag");
if (i > -1) {
  tag = process.argv[i + 1];
};

var deviceName, j = process.argv.indexOf("--deviceName");
if (j > -1) {
  deviceName = process.argv[j + 1];
};

var osVersion, k = process.argv.indexOf("--osVersion");
if (k > -1) {
  osVersion = process.argv[k + 1];
};

var platformName, l = process.argv.indexOf("--platformName");
if (l > -1) {
  platformName = process.argv[l + 1];
};

var testObjectApp, m = process.argv.indexOf("--testObjectApp");
if (m > -1) {
  testObjectApp = process.argv[m + 1];
};

var runMock, n = process.argv.indexOf("--runMock");
if (n > -1) {
  runMock = process.argv[n + 1];
};


function getDatetimeStamp() {
  var today = new Date;
  var today_mm = today.getMonth() + 1
  var today_day = today.getDate()
  if (today_mm < 10) {
    today_mm = '0' + today_mm
  }
  if (today_day < 10) {
    today_day = '0' + today_day
  }
  var date = today.getFullYear() + '-' + today_mm + '-' + today_day;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = time + ' ' + date;
  return dateTime;
}
//Options to generate html report after every run

const options = {
  theme: 'bootstrap',
  jsonDir: './reports',
  output: './output/cucumber-report'  + "_" + platformName + "_" + osVersion + "_" + getDatetimeStamp() + '.html',
  screenshotsDirectory: 'screenshots/',
  storeScreenshots: false,
  reportSuiteAsScenarios: false,
  launchReport: true,
  metadata: {
    "Test Environment": "Digital 1",
    "App": "ADDC",
    "Date/Month": getDatetimeStamp(),
    "Build Number": process.env.build_number
  }
};

/**
 * Upload the IPA file for running on real devices to saucelabs.
 */

gulp.task('saucelabs:upload:ios', () =>
  uploadFile({
    user: 'nextgenapp',
    pass: '63573065-888c-4692-bde4-937044d408f1',
    fileName: config.saucelabsIOSFileNameIPA,
    filePath: config.ipaOutput,
  }),
);

//To generate cucumber reports 
gulp.task('generate:report', () =>
  reporter.generate(options)

);

gulp.task('automation:run:result', function (callback) {

  var resultStatus = reportResult.getReportStatus();
  if (resultStatus == false) {
    console.log("resultStatus  " + resultStatus);
    var exitCode = 2;
    console.log('[FAIL] gulp build task failed - exiting with code ' + exitCode);
    return process.exit(exitCode);
  } else {
    callback();
  }
});



gulp.task('cucumber:ios:local', done => {
  spawn(nodeModulesBinaryPath('cucumber.js'),
    ['--compiler', 'es6:babel-register',
      '--tags', '@AddRequiredTestTag',
      '--format', 'json:./reports/cucumber-reports.json',
      '--world-parameters',
      JSON.stringify({ device: { ...devices.ios, }, }),
    ],
    { stdio: 'inherit' },
  ).on('close', done);
});

gulp.task('cucumber:android:local', done => {
  spawn(nodeModulesBinaryPath('cucumber.js'),
    ['--compiler', 'es6:babel-register',
      '--tags', '@loginUser',
      '--format', 'json:./reports/cucumber-reports.json',
      '--world-parameters', JSON.stringify({ device: { ...devices.android, }, })
    ], { stdio: 'inherit' },
  ).on('close', done);
});


gulp.task('cucumber:android:testobject', done => {
  spawn(
    nodeModulesBinaryPath('cucumber.js'),
    [
      '--compiler',
      'es6:babel-register',
      '--format', 'json:./reports/cucumber' + tag + '-reports.json',
      '--tags', '@' + tag,
      '--world-parameters',
      JSON.stringify({
        device: {
          ...devices.androidTestObject,
          testobject_api_key: '755D3F48CCCE4D1485C4D8EA1A6B0461',
        },
        appiumServer: config.testObjectServerConfigSauceLabs,
        testobject: true,
      }),
    ],
    { stdio: 'inherit' },
  ).on('close', done);
});


gulp.task('cucumber:ios:testobject', done => {
  spawn(
    nodeModulesBinaryPath('cucumber.js'),
    [
      '--compiler',
      'es6:babel-register',
      '--format', 'json:./reports/cucumber' + tag + '-reportsios.json',
      '--tags', '@' + tag,
      '--world-parameters',
      JSON.stringify({
        device: {
          ...devices.iosTestObject,
          testobject_api_key: '755D3F48CCCE4D1485C4D8EA1A6B0461',
        },
        appiumServer: config.testObjectServerConfigSauceLabs,
        testobject: true,
      }),
    ],
    { stdio: 'inherit' },
  ).on('close', done);
});
