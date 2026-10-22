# Astra's Window Star

By Astra

<img align="right" width="200" src="https://findastra.github.io/astras-star-window/star-window.svg" alt="Astra's Window Star: a fat star fading between pictures of Astra's avatar">

A fat star that fades between my favorite pictures of my avatar. It is **one hosted picture**: every page that shows
it shows the same star, and when I change it, it changes everywhere.

**Change it:** https://findastra.github.io/astras-star-window/<br>
**The picture:** https://findastra.github.io/astras-star-window/star-window.svg

It sits to the right of the title on [my GitHub profile](https://github.com/findastra).

## Change the pictures

Everything is on one page, and on [Portfolio Puffer's pet program](https://findastra.github.io/astras-pet-os/apps/pet-programs/portfolio-puffer-20261018.html)
in its own `astras-photostar-panel`:

1. Tap **+** (or the star). Your photo appears in the big star.
2. Drag it until it sits right. Scroll or pinch to zoom.
3. **Capture.** It saves by itself and shows everywhere in about a minute.

Tap **×** on a picture to take it out (**Undo** puts it back).

The two colour squares at the start of the row are the neon border: pick two colours and it saves by itself.

**The first time on a device, it asks you to connect GitHub:** tap **Make a key on GitHub**, choose **Only select
repositories → astras-star-window**, tap **Generate token**, copy it, paste it, **Connect**. That's all. The key
stays in that browser and can only change this star.

GitHub READMEs keep a copy of pictures for up to about 10 minutes, so your profile can show the old star that long.

## Show it on a page

```html
<img align="right" width="180" src="https://findastra.github.io/astras-star-window/star-window.svg" alt="Astra's Window Star">
```

Always use this address. It never changes, so changing the pictures never breaks a page.

## How it works

- `star-window.svg` is the hosted picture: the fat star, a neon outline, and every picture inside it as an inline
  JPEG, fading one into the next with CSS. Inline, because a picture shown with `<img>` (on GitHub, too) may not load
  anything else. Each picture holds, then the next fades in on top of it, so the star is never see-through.
- `star-window.json` lists the pictures in order: the file, what is in it, the photo it came from and where it sat.
- `pictures/` holds one 600-pixel JPEG per picture, already cut to the star. The original photos are not in this repo.
- `index.html` is the whole page; `?embed` is the same page without its title, for a pet program's tool panel.
  `star-window-editor-20261019.html` only sends old links to it.
- `star-window-lib-20261019.js` draws the star and writes the SVG; the page and the build script both use it.
- `npm run build` rebuilds `star-window.svg` from the JSON and the pictures. `npm test` checks the SVG matches them,
  loads nothing from outside, and never leaves the star see-through while it fades.

## Credits

By Astra. The pictures are Astra's own and not for reuse; the code is MIT (see `LICENSE`). Built with Claude Opus 5.5
(`claude-opus-5-5`), 2026-10-19; one page since 2026-10-20.
