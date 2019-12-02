import { spawn } from "child_process";
import { join } from "path";
import bg from "gulp-bg";
import gulp from "gulp";
import { nodeModulesBinaryPath } from "./support/helpers";
import config from "./support/config";

gulp.task("android", bg(nodeModulesBinaryPath("react-native"), "run-android"));

gulp.task(
  "android:release",
  bg(nodeModulesBinaryPath("react-native"), "run-android", "--variant=release")
);

gulp.task("android:release:ci", done => {
  spawn("gradle", ["--no-daemon", ":app:assemble"], {
    stdio: "inherit",
    cwd: join(config.basePath, "android")
  }).on("close", done);
});
