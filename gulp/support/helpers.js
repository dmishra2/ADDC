import { join } from "path";
import { spawn } from "child_process";
import { createReadStream } from "fs";
import request from "request";
import config from "./config";

export const isWin = /^win/.test(process.platform);

export const nodeModulesBinaryPath = command =>
  join(
    config.basePath,
    "./node_modules/.bin",
    isWin ? `${command}.cmd` : command
  );

export const checkCommandAvailable = command =>
  new Promise(resolve => {
    if (isWin) resolve(false);
    const check = spawn("which", [command]);
    check.stdout.once("data", data => {
      if (data.toString().indexOf("not found") === -1) {
        resolve(data.toString());
      }
    });

    check.stdout.on("close", () => {
      resolve(false);
    });
  });

export const uploadFile = ({
  user,
  pass,
  fileName,
  filePath,
  location = "https://saucelabs.com/rest/v1/storage",
  locationAppend = "?overwrite=true",
  url
}) =>
  new Promise((resolve, reject) => {
    createReadStream(filePath).pipe(
      request.post(
        {
          url: url || `${location}/${user}/${fileName}${locationAppend}`,
          auth: {
            user,
            pass,
            sendImmediately: true
          },
          headers: {
            "Content-Type": "application/octet-stream"
          },
          encoding: null
        },
        (error, response, body) => {
          if (error) {
            return reject(error);
          }
          return resolve(body.toString());
        }
      )
    );
  });
