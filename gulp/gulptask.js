import { spawn } from "child_process";
import gulp from "gulp";
import ps from "ps-node";
import path from "path";
import { argv } from "yargs";
import { nodeModulesBinaryPath } from "./support/helpers";
import devices from "./support/devices";
import config from "./support/config";
import gutil from "gulp-util";
import forever from "forever-monitor";

const appiumRunner = start => done => {
  // const appium = spawn(nodeModulesBinaryPath('appium'));
  let doneCalled = false;
  //global.appium = appium;
  const appium = forever.start(nodeModulesBinaryPath("appium"), {
    max: 1,
    silent: true,
    pidFile: path.join(__dirname, "appium.pid"),
    logFile: path.join(__dirname, "log", "appium.log"),
    outFile: path.join(__dirname, "log", "appium.log"),
    errFile: path.join(__dirname, "log", "appium_error.log")
  });

  appium.once("stdout", function() {
    gutil.log("Appium server opened for business");
    appium.removeAllListeners("stderr");
    done();
  });

  appium.once("stderr", function(err) {
    gutil.log(format("Unable to start appium, {0}", [err]));
    appium.removeAllListeners("stdout");
    done(false);
  });
};

gulp.task("appium:stop", done => {
  ps.lookup(
    {
      command: "node",
      arguments: "./node_modules/.bin/appium",
      psargs: "ux"
    },
    function(err, results) {
      const process = results[0];
      if (process) {
        ps.kill(process.pid, function() {
          gutil.log("Stopped running appium server");
          done();
        });
      } else {
        gutil.log("No running appium server found");
        done();
      }
    }
  );
  gulp.task("cucumber:android:local", done => {
    spawn(
      nodeModulesBinaryPath("cucumber.js"),
      [
        "--compiler",
        "es6:babel-register",
        "--tags",
        "@login",
        "--world-parameters",
        JSON.stringify({
          device: {
            ...devices.android
          }
        })
      ],
      { stdio: "inherit" }
    ).on("close", done);
  });
});

//gulp.task('appium:stop', appiumRunner());

gulp.task("appium:start", appiumRunner(true));

gulp.task("bootstrap", ["appium:start"]);
gulp.task("test", ["bootstrap", "cucumber:android:local"]);
