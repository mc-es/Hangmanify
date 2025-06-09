import { execSync } from 'child_process';
import { lookup } from 'dns';

// check for internet connectivity before running expo-doctor.
lookup('expo.dev', (err) => {
  if (err) process.exit(0); // no internet: silently skip without error

  try {
    execSync('npx expo-doctor@latest .', { stdio: 'inherit' });
  } catch {
    process.exit(1);
  }
});
