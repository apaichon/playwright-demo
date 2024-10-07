// run-tests.ts
import { execSync } from 'child_process';

try {
  console.log('Running Playwright tests...');
  execSync('npx playwright test', { stdio: 'inherit' });
  console.log('All tests passed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Tests failed. Push aborted.');
  process.exit(1);
}