# Astra's Window Star

By Astra

<img align="right" width="200" src="https://findastra.github.io/astras-star-window/star-window.svg" alt="Astra's Star Window: a fat star fading between pictures of Astra's avatar">

A fat star that fades between my favorite pictures of my avatar. It is **one hosted picture**: every page that shows
it shows the same star, and when I change it, it changes everywhere.

**The picture:** https://findastra.github.io/astras-star-window/star-window.svg<br>
**Its page:** https://findastra.github.io/astras-star-window/

It sits to the right of the title on [my GitHub profile](https://github.com/findastra).

## Show it on a page

GitHub README or Markdown:

```markdown
![Astra's Star Window](https://findastra.github.io/astras-star-window/star-window.svg)
```

HTML, floating to the right of a title:

```html
<img align="right" width="180" src="https://findastra.github.io/astras-star-window/star-window.svg" alt="Astra's Star Window">
```

Always link the picture by this address. It never changes name, so changing the pictures never breaks a page.

## Change the pictures

Open the [star window editor](https://findastra.github.io/astras-star-window/star-window-editor-20261019.html), a tool
of [Portfolio Puffer](https://github.com/findastra/portfolio-puffer):

1. Choose a photo (or drop or paste one). It shows behind the fat star; what is outside the star is dimmed.
2. Drag it until it sits right. Scroll or pinch to zoom; arrow keys nudge it, + and − zoom. Fit starts it over.
3. Say what is in it (for people who can't see it), then **Capture**.

Capture cuts the photo to the star and saves the new picture, `star-window.json` and `star-window.svg` to this repo
in one commit. The page updates in about a minute; GitHub keeps a copy of pictures in READMEs for up to about 10
minutes. In the list you can reorder pictures, change what they say, remove one, set the seconds each picture shows,
and move a picture again in the star. **Undo** puts back the last saved change.

**Saving needs a key, once per device.** The editor has the steps: a fine-grained GitHub token for
`findastra/astras-star-window` only, with **Contents: Read and write** and nothing else. It is kept in that browser on
that device and sent only to GitHub. Without a key the editor still works, and **Download the update** gives a zip to
unzip into this repo.

The original photos are not in this repo, only the part inside the star. The editor keeps each photo in the browser
it was added from, so moving a picture later works there; anywhere else it asks for the photo again and puts it back
where it was.

## How it works

- `star-window.svg` is the hosted picture: the fat star, a neon outline, and every picture inside it as an inline
  JPEG, fading one into the next with CSS. Inline, because a picture shown with `<img>` (on GitHub, too) may not load
  anything else. Each picture holds, then the next fades in on top of it, so the star is never see-through.
- `star-window.json` lists the pictures in order: the file, what is in it, the photo it came from and where it sat
  in the star.
- `pictures/` holds one 600-pixel JPEG per picture, already cut to the star's frame.
- `star-window-lib-20261019.js` draws the star and writes the SVG; the editor and the build script both use it.
- `npm run build` rebuilds `star-window.svg` from the JSON and the pictures. `npm test` checks the SVG matches them,
  loads nothing from outside, and never leaves the star see-through while it fades.

## Credits

By Astra. The pictures are Astra's own and not for reuse; the code is MIT (see `LICENSE`). Built with Claude Opus 5.5
(`claude-opus-5-5`), 2026-10-19.
