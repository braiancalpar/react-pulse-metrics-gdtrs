module.exports = {
  testEnvironment: "node",
  testTimeout: 30000,
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testMatch: ["**/e2e/**/*.e2e.test.ts"],
};
