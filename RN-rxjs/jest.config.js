// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: 'coverage',
  preset: "react-native",
  setupFiles: [
      "<rootDir>/node_modules/react-native/jest/setup.js",
      "<rootDir>/src/test/setup.ts",
      "<rootDir>/setupTest.ts",
      "<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"
    ],
  setupFilesAfterEnv: ["<rootDir>/src/test/timeout.ts",],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/e2e"
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(jest-)?react-native|react-native|@react-navigation|@storybook|@react-native-community)"
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/setupTests.ts',
    '!<rootDir>/coverage/**/*.js',
    '!<rootDir>/src/test/*.ts',
    '!<rootDir>/app/**/*.story.tsx',
  ],
  timers: "fake",
  testEnvironment: "jsdom"
};
