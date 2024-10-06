// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Capture screenshot after each test
    screenshot: 'on',

    // Record video for each test
    video: 'on',

    // Retain traces for failing tests
    trace: 'retain-on-failure',
  },
  // Other configurations...
});