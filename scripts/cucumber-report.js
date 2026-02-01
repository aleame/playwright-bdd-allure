const reporter = require('cucumber-html-reporter');
const path = require('path');

const options = {
  theme: 'bootstrap',
  jsonFile: path.resolve(__dirname, '../reports/cucumber/report.json'),
  output: path.resolve(__dirname, '../reports/cucumber/report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chrome",
    "Platform": "Linux",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);
