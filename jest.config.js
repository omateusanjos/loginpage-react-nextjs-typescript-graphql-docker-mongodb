module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    bail: 1,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['components/**/*.(js|jsx|ts|tsx|)', 'pages/**/*.(js|jsx|ts|tsx)', ],
    coverageReporters: [
        "json-summary",
        "lcov"
      ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.config.js'],
    testEnvironment: 'jsdom',
  };