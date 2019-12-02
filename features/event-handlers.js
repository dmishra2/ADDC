import {defineSupportCode} from 'cucumber';
import reporter from 'cucumber-html-reporter';

const d = Date.now()

const reportFile = `./archive/Report_${d}/index.html`

const optionsBackup = {
    theme: 'bootstrap',
    jsonFile: `./reports/cucumber-reports.json`,
    output: reportFile,
    reportSuiteAsScenarios: true,
    launchReport: false
}

const optionsGeneric = {
    theme: 'bootstrap',
    // jsonDir: process.env.reportsPath,
    // output: process.env.reportsPath + '/index.html',
    jsonFile: `./reports/cucumber-reports.json`,
    output: `./reports/index.html`,
    reportSuiteAsScenarios: true,
    launchReport: false
}

defineSupportCode(({registerHandler}) => {
    registerHandler('AfterFeatures', (features, callback) => {
        setTimeout(async () => {
            await reporter.generate(optionsBackup)
            await reporter.generate(optionsGeneric)
            await callback()
        }, 1000)
    })
})
