import { readdirSync } from 'fs';
import path from 'path';
import { banner } from './utils';

async function doTests() {
  const testDir = path.resolve(__dirname, 'tests');

  const files = readdirSync(testDir);
  for (const file of files) {
    const filePath = path.join(testDir, file);
    const end = banner(file);
    await import(filePath);
    end();
    console.log();
  }
}

doTests();
