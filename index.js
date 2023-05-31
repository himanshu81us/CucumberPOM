var reporter = require('cucumber-html-reporter');
const dotenv = require ('dotenv');
dotenv.config({path: `./route/.env.${process.env.NODE_ENV}` });
           

var options = {
        theme: 'bootstrap',
        jsonFile: 'test/report/cucumber_report.json',
        output: 'test/report/cucumber_report.html',
        screenshotsDirectory: '.\screenShots',
        storeScreenshots: true,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
           
            "Test Environment": process.env.NODE_ENV,
            "Browser": "Chrome  112.0.0",
            "Platform": "Windows 10",
            "Parallel": "3",
            "Executed": "Remote"
        }
    };

    reporter.generate(options);
    