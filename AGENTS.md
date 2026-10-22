# Assistant rules for astras-star-window

Astra's Window Star (Astra's name for it, set in the README on 2026-10-20; the repo stays astras-star-window): one
hosted picture (`star-window.svg`) of a fat star fading between Astra's favorite pictures of her avatar. Public credit
is always Astra ("By Astra"). Not a pet: Portfolio Puffer (findastra/portfolio-puffer) looks after it, and this page is
Puffer's tool `astras-star-window`. Everything happens on the one page (Astra, 2026-10-20: "I want everything to be on
the same page. And I want it to be intuitive and simple."); keep it that way.

Built with Claude Opus 5.5 (`claude-opus-5-5`), 2026-10-19; the transparent background, closer small stars and the
two neon border colours (`outline` in star-window.json) by Claude Opus 5.5, 2026-10-22. Record the model and version when another assistant
changes this repository.

## Rules

- `star-window.svg`, `star-window.json` and `pictures/` are Astra's live content. Change them only through the page
  or when Astra asks. Never add, swap, generate or edit a picture of her on your own.
- `star-window.svg` and `https://findastra.github.io/astras-star-window/star-window.svg` never change name or place:
  her profile and other pages link to them.
- After changing the JSON or a picture by hand, run `npm run build`, then `npm test`.
- The SVG stays self-contained (inline pictures only, no scripts, no outside links), so it works in any `<img>`.
- The original photos stay out of Git; only the part inside the star is published.
- Never ask for, type or store Astra's GitHub key. The page keeps it in her browser; she pastes it herself.
- Code changes go on a `claude/` or `codex/` branch with a pull request, never straight to `main`.

## Files

- `index.html`: the whole page (the star, its pictures, placing and saving); `?embed` for Puffer's tool panel.
  `star-window-editor-20261019.html` only redirects old links to it
- `star-window-lib-20261019.js`: the star's shape and the SVG writer, shared by the page and the build script
- `scripts/build-star-window-20261019.mjs`: rebuilds the SVG; `test/star-window-test-20261019.mjs`: the checks
