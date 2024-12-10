module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/logs/'
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  setupFiles: ['dotenv/config']
};
