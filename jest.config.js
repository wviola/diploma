const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "allure-jest/node",
  testEnvironmentOptions: {
    allure: {
      resultsDir: './allure-results'
    }
  },
  testMatch: ['**/tests/**/*.test.ts', '**/src/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};