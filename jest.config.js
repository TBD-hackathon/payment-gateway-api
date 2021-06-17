module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 10000,
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
