// Rebuilds star-window.svg from star-window.json and pictures/, the same way the editor does when it saves.
// node scripts/build-star-window-20261019.mjs           writes star-window.svg
// node scripts/build-star-window-20261019.mjs --check   only says whether star-window.svg is up to date (exit 1 if not)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSvg } from '../star-window-lib-20261019.js';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function readWindow(root = ROOT) {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'star-window.json'), 'utf8'));
  const pictures = data.pictures.map((p) => ({
    href: `data:image/jpeg;base64,${fs.readFileSync(path.join(root, p.file)).toString('base64')}`, alt: p.alt,
  }));
  return { data, svg: buildSvg(data, pictures) };
}

// Compare real paths: run through the "Astra's PetOS" junction, argv[1] and this file's URL differ.
const direct = process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (direct) {
  const { svg } = readWindow();
  const file = path.join(ROOT, 'star-window.svg');
  const now = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (process.argv.includes('--check')) {
    console.log(now === svg ? 'star-window.svg is up to date' : 'star-window.svg is out of date: run this script without --check');
    process.exit(now === svg ? 0 : 1);
  }
  fs.writeFileSync(file, svg);
  console.log(`wrote star-window.svg (${Math.round(svg.length / 1024)} KB)`);
}
