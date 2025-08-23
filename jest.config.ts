import type { Config } from 'jest';

const config: Config = {
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.?([mc])[jt]s?(x)', '**/?(*.)+(spec|test).?([mc])[jt]s?(x)'],
  transformIgnorePatterns: [
    '\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)(\\?inline)?$',
  ],
};

export default config;
