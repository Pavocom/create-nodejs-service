module.exports = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/**/*.js', 'src/services/*.js',
  ],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./jest.setup.js'],
  roots: ['<rootDir>/src'],
};
