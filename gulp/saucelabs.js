import fs from "fs";
import gulp from "gulp";
import { each } from "lodash";
import { join } from "path";
import "colors";
import { spawn } from "child_process";
import config from "./support/config";
import devices from "./support/devices";
import { uploadFile } from "./support/helpers";

/**
 * Upload the iOS simulator build.
 * (requires: 'ios:release:bb:simulator')
 */
gulp.task("saucelabs:upload:ios:bb:simulator", () =>
  uploadFile({
    user: process.env.SAUCELABS_USER,
    pass: process.env.SAUCELABS_AUTH,
    fileName: config.saucelabsIOSFileName,
    filePath: config.zipFileOutput
  })
);

gulp.task("saucelabs:upload:android:bb", () =>
  uploadFile({
    user: process.env.SAUCELABS_USER,
    pass: process.env.SAUCELABS_AUTH,
    fileName: config.saucelabsAndroidFileName,
    filePath: join(
      process.env.BUDDYBUILD_WORKSPACE,
      "android/app/build/outputs/apk/app-release.apk"
    )
  })
);

// gulp.task('saucelabs:upload:android:bb:local', ['local:data'], () =>
//   uploadFile({
//     user: process.env.SAUCELABS_USER,
//     pass: process.env.SAUCELABS_AUTH,
//     fileName: config.saucelabsAndroidFileName,
//     filePath: join(
//       process.env.BUDDYBUILD_WORKSPACE,
//       'android/app/build/outputs/apk/app-debug.apk',
//     ),
//   }),
// );

// gulp.task('testobject:upload:android:bb:local', ['local:data'], async () => {
//   global.testObjectAppID = await uploadFile({
//     url: 'https://app.testobject.com:443/api/storage/upload',
//     user: process.env.TESTOBJECT_USER,
//     pass: process.env.TESTOBJECT_AUTH,
//     filePath: join(
//       process.env.BUDDYBUILD_WORKSPACE,
//       'android/app/build/outputs/apk/app-debug.apk',
//     ),
//   });
//   console.log(global.testObjectAppID);
// });

/**
 * Use local private.json to simulate our CI environment
 *
 * For example:
 * {
 *   "env": {
 *     "SAUCELABS_AUTH": "abcdefg-abcdefg-abc",
 *     "SAUCELABS_USER": "britishgas",
 *     "TESTOBJECT_AUTH": "EFGFGTHIKJHG",
 *     "TESTOBJECT_USER": "britishgas",
 *     "BUDDYBUILD_WORKSPACE": "/Users/british-gas/poc",
 *     "BUDDYBUILD_IPA_PATH": "/Users/british-gas/poc/ios/build/app.ipa",
 *     "BUDDYBUILD_PRODUCT_DIR": "/Users/british-gas/poc/ios/build"
 *   }
 * }
 */
gulp.task("local:data", () => {
  let privateData;
  if (fs.existsSync(join(config.basePath, "private.json"))) {
    privateData = require("../private.json") || { env: {} }; // eslint-disable-line global-require
    each(privateData.env, (value, key) => {
      process.env[key] = value;
    });
  }
});

/**
 * Compress (via zip) simulator enabled application for eventual upload to saucelabs
 */
gulp.task("saucelabs:ios:zip:bb", done => {
  spawn("zip", ["-r", config.saucelabsIOSFileName, devices.ios.app], {
    cwd: process.env.BUDDYBUILD_WORKSPACE,
    stdio: "inherit"
  }).on("close", done);
});
