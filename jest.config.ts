/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}"
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>"
  ],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/app/tests/**/*.(test|spec).(js|ts|tsx)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/", "/.next/"
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$"
  ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

};

export default config;
