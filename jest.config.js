/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  resetMocks: false,
  setupFiles: ['jest-localstorage-mock'],
  testEnvironment: 'jest-environment-jsdom',
};

export default config;
