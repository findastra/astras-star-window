// Checks for Astra's Star Window: the hosted picture matches its data, loads nothing from outside, and the fade never
// leaves the star see-through. Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { buildSvg, frame, keyframes, STAR, UNIT } from '../star-window-lib-20261019.js';
import { readWindow, ROOT } from '../scripts/build-star-window-20261019.mjs';

const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

test('star-window.svg is exactly what star-window.json and pictures/ build', () => {
  assert.equal(read('star-window.svg'), readWindow().svg, 'run node scripts/build-star-window-20261019.mjs');
});

test('every picture in the data is in pictures/, and pictures/ holds nothing else', () => {
  const { data } = readWindow();
  const ids = data.pictures.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, 'picture ids are unique');
  for (const p of data.pictures) {
    assert.equal(p.file, `pictures/${p.id}.jpg`);
    assert.ok(fs.existsSync(path.join(ROOT, p.file)), `${p.file} exists`);
    assert.ok(p.alt && p.alt.trim().length > 3, `${p.id} says what is in it`);
    for (const k of ['x', 'y', 'zoom']) assert.equal(typeof p.place[k], 'number');
  }
  const files = fs.readdirSync(path.join(ROOT, 'pictures')).map((f) => `pictures/${f}`).sort();
  assert.deepEqual(files, data.pictures.map((p) => p.file).sort(), 'no leftover pictures');
});

test('the hosted picture loads nothing from outside (an <img> on GitHub may not)', () => {
  const svg = read('star-window.svg');
  const refs = [...svg.matchAll(/(?:href|src)="([^"]*)"|url\(([^)]*)\)/g)].map((m) => m[1] ?? m[2]);
  for (const r of refs) assert.ok(r.startsWith('data:image/jpeg;base64,') || r.startsWith('#'), `inline only: ${r.slice(0, 40)}`);
  assert.doesNotMatch(svg, /<script|on\w+=/i);
});

// Opacity of one picture at time t, from its keyframes (linear between stops, like the browser).
function opacityAt(css, t, total) {
  const stops = [...css.matchAll(/([\d.]+)%\{opacity:([\d.]+)\}/g)].map((m) => [Number(m[1]) / 100 * total, Number(m[2])]);
  for (let i = 1; i < stops.length; i += 1) {
    const [t0, a0] = stops[i - 1], [t1, a1] = stops[i];
    if (t <= t1) return t1 === t0 ? a1 : a0 + (a1 - a0) * ((t - t0) / (t1 - t0));
  }
  return stops.at(-1)[1];
}

test('the star is never see-through while the pictures fade, for 2 to 8 pictures', () => {
  for (let n = 2; n <= 8; n += 1) {
    const hold = 5, fade = 1.2, total = n * hold;
    const frames = Array.from({ length: n }, (_, i) => keyframes(i, n, hold, fade));
    for (let t = 0; t <= total; t += total / 4000) {
      const cover = 1 - frames.reduce((clear, css) => clear * (1 - opacityAt(css, t, total)), 1);
      assert.ok(cover > 0.999, `${n} pictures, ${t.toFixed(2)} s: only ${cover.toFixed(3)} covered`);
    }
    // and every picture is fully shown for most of its turn
    frames.forEach((css, i) => {
      const shown = Array.from({ length: 500 }, (_, k) => (k / 500) * total).filter((t) => opacityAt(css, t, total) > 0.999).length / 500;
      assert.ok(shown >= (hold - fade) / total - 0.01, `picture ${i} of ${n} shows long enough`);
    });
  }
});

test('one picture is shown still, and no pictures give an empty star', () => {
  const one = buildSvg({}, [{ href: 'data:image/jpeg;base64,AAAA', alt: 'a' }]);
  assert.doesNotMatch(one, /@keyframes/);
  assert.match(buildSvg({}, []), /An empty star window/);
});

test('the fat star fills the frame', () => {
  const f = frame(STAR);
  assert.equal(f.width, UNIT);
  assert.ok(f.height > 900 && f.height < 1000, `height ${f.height}`);
  assert.match(f.path, /^M[\d. -]+Q.*Z$/);
  const xs = [...f.path.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((m) => Number(m[1]));
  assert.ok(Math.min(...xs) >= 0 && Math.max(...xs) <= UNIT, 'inside the frame');
});

test('the pages show the one hosted picture by its fixed name', () => {
  assert.match(read('index.html'), /src="star-window\.svg"/);
  assert.match(read('star-window-editor-20261019.html'), /star-window\.svg/);
  assert.match(read('README.md'), /https:\/\/findastra\.github\.io\/astras-star-window\/star-window\.svg/);
});
