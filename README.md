# jhayward9.github.io

Personal site for Jesse Hayward, hosted on GitHub Pages:
**https://jhayward9.github.io/**

A mobile-first, single-page site built with plain HTML, CSS, and JavaScript — no
framework and no build step.

## Design

The projects page follows the visual language of **https://jhayward.org** without
recreating its Mac OS-inspired dock:

- Black canvas, Gaelic green (`#2d835b`) hero type, and bright green accents
- Press Start 2P for the name, labels, and badges; SF Pro/system sans for body copy
- Colorful macOS-style app-icon tiles for each project, with a per-project accent
- Subtle window chrome (title bar and traffic-light dots) on the profile, contact,
  and featured bet-slip panels
- A standard sticky top navigation, not a dock

## Structure

- `index.html` — page content, project cards, metadata, and social preview tags
- `style.css` — design tokens, layout, project accents, and responsive styles
- `script.js` — active nav, scroll reveals, live GitHub counts, and the Edmonton clock
- `assets/` — avatar and favicon

## Local preview

Open `index.html` directly, or serve the folder:

```powershell
python -m http.server 4173
```

Then visit `http://127.0.0.1:4173/`.

## Notes

- The site is dark-only, matching the current personal site.
- Project links point to the corresponding public repositories.
- GitHub profile counts are enhanced with a request to the GitHub API; the
  static values in the HTML are the fallback.
- The page works without JavaScript, and all motion respects
  `prefers-reduced-motion`.
