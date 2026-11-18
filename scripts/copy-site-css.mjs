/**
 * Copies the kit's compiled stylesheet into dist. The components draw the
 * kit's class strings, so the kit's own file styles them, and the package
 * ships no stylesheet of its own.
 */
import { copyFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const source = require.resolve('@lyeve-labs/ui-kit/site.css');
copyFileSync(source, new URL('../dist/site.css', import.meta.url));
