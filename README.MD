# RAIN2.0

The home of RAIN2.0 on the web.

This repository will house our band's website, bringing together:

- **Music** — our songs and releases.
- **Band info** — who we are and what we're up to.
- **Web comic** — our ongoing comic.

## Local development

Use Node.js 24 and pnpm 11.25.0.

```sh
pnpm install
pnpm dev
pnpm build
```

## GitHub Pages

In repository Settings → Pages, select **GitHub Actions** as the source.
The included workflow builds and deploys pushes to `main`. Vite uses relative
asset paths so the build works beneath a repository URL or a custom domain.

## Design draft

### Automatic YouTube uploads

The Watch section pins the EPK (`Qk6x-F5gClA`) first in a landscape player.
A portrait player below embeds the channel's Shorts-only playlist
(`UUSHG9iwkrpZYULZf-RUTT7-TQ`). YouTube refreshes this playlist as public Shorts
are added, without an API key, scheduled build, or server. New regular videos do
not replace the pinned EPK. This YouTube-generated playlist is verified working
but its special Shorts prefix is not a documented API contract.
Uploads must permit embedding; YouTube may take time to refresh the playlist.
Both players load lazily without autoplay and use the privacy-enhanced domain.
Page headings contain no hashtags; titles inside the players are controlled by
YouTube and require editing the original YouTube titles to remove hashtags.
Direct YouTube links remain available if playback is restricted.

The responsive landing page includes the official logo, city hero artwork,
About and Comics sections, and the band's verified social profile URLs.
About links to a landing-page section; Comics opens the Chapter 1 reader.
The comics teaser uses the official chapter cover.

Logo: `public/rain-logo.svg`, original geometric vector concept.
Hero: `public/hero.webp`, generated with the built-in image-generation tool.

Hero prompt: “Use case: stylized-concept. Asset type: full bleed background for
RAIN2.0 band website. Create original cinematic rain-soaked futuristic city
artwork at night, wide landscape 16:9. Deep black blue shadows, atmospheric teal
illumination, occasional warm amber windows, intricate towering architecture at
left and right, reflective wet foreground and mist. Central middle area dark and
uncluttered to support a large white website logo overlay. Sophisticated
photographic concept art, dramatic depth, subtle film grain. No people, no text,
no logos, no watermark. This is temporary art direction for a music and comics
website.”


## Comic reader

`#/comics` opens Chapter 1: Another Night. Hash navigation keeps direct links and
refreshes compatible with GitHub Pages. Desktop (900px+) presents one large panel
with previous/next buttons, keyboard arrows, a panel selector, and full-size links.
Smaller screens show every panel in a continuous vertical sequence.

The 27 panels follow episodes 1–4 in numeric order. Current files in each episode
folder take precedence over edits/cuts. Episode 2 panel 0 is omitted because it
repeats episode 1 panel 6. Non-TBC versions are used between episodes. The authored
final panel includes the next-chapter teaser. Chapter 2 draft files are not included.
`src/comics.json` records the source filename of every panel for auditing.

Official logo: `public/rain-official.png`. Chapter art: `public/comics/chapter-1/`.
The source images on G: are unchanged. `scripts/import-comics.py` creates optimized
web copies and requires Pillow plus access to the author's Graphics folder; it is
not needed for builds or deployment. Comic dialogue remains embedded in artwork;
text transcripts are not yet available for screen readers.
