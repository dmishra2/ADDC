var fs = require("fs");

exports.getReportStatus = function (platformAndVersion) {
    var testFolder = "./output";
    var requiredFilename;
    fs.readdirSync(testFolder).forEach(file => {
        var flag = file.includes(".html.json");
        if (flag) {
            requiredFilename = file;
        }
    })
    console.log("requiredFilename" + requiredFilename);
    var contents = fs.readFileSync("./output/" + requiredFilename);

    var obj = JSON.parse(contents);
    var noOfPassed = 0;
    var noOfFailed = 0;
    var noOfSkipped = 0;
    var totalNoOfSteps = 0;
    var overallobj = obj;

    for (var k = 0; k < overallobj.length; k++) {
        var noOfScenarios = obj[k].elements;
        for (var j = 0; j < noOfScenarios.length; j++) {
            var noOfSteps = obj[k].elements[j].steps;
            for (var i = 0; i < noOfSteps.length; i++) {
                totalNoOfSteps = totalNoOfSteps + 1;
                var currentStatus = obj[k].elements[j].steps[i].result.status;
                if (currentStatus == 'passed') {
                    noOfPassed = noOfPassed + 1;
                } else if (currentStatus == 'failed') {
                    noOfFailed = noOfFailed + 1;
                } else if (currentStatus == 'skipped') {
                    noOfSkipped = noOfSkipped + 1;
                }
            }
        }
    }

    console.log("noOfPassed" + noOfPassed);
    console.log("noOfFailed   " + noOfFailed);
    console.log("noOfSkipped   " + noOfSkipped);
    console.log("totalNoOfSteps   " + totalNoOfSteps);

    var passPercentage = (noOfPassed / totalNoOfSteps) * 100;
    console.log("passPercentage   " + passPercentage);
    var status;
    if (passPercentage < 0) {
        status = "FAIL";
        console.log("status   " + status);
        return false;
    } else {
        status = "PASS";
        console.log("status   " + status);
        return true;
    }

}