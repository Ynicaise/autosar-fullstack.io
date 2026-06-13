# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website documenting AUTOSAR Classic — no build system, no package manager, no dependencies. Open HTML files directly in a browser or serve with any static HTTP server (e.g. `npx serve .` or VS Code Live Server).

## Architecture

Pure HTML/CSS/JS site organized by AUTOSAR layer:

```
index.html / about.html / architecture.html   ← root pages
asw/        ← Application Software layer pages (SWC, CDD, ARXML/XDM)
bsw/        ← Basic Software module reference pages (Com, Dcm, Dem, NvM, …)
assets/
  css/style.css     ← single stylesheet (CSS variables, all components)
  js/i18n.js        ← bilingual FR/EN system (loaded in <head>)
  js/main.js        ← nav toggle, sidebar tracking, copy buttons (loaded at end of <body>)
  images/           ← static images
```

## Bilingual System (FR/EN)

French is the default language. Every user-visible string must have both variants:

```html
<span class="i18n-fr">Texte français</span><span class="i18n-en">English text</span>
```

CSS hides the inactive language based on `<html lang="fr|en">`. The `lang` attribute is set by `i18n.js` before DOMContentLoaded (from `localStorage` key `autosar-lang`) to avoid flash of untranslated content. Do not use a single string for content that should be bilingual.

## Page Templates

All pages share the same header/footer/nav structure. When creating a new page:

- Root pages (`*.html`): link assets with `assets/css/style.css`, `assets/js/i18n.js`, `assets/js/main.js`
- Subdirectory pages (`bsw/*.html`, `asw/*.html`): use `../assets/...` for all asset paths
- Load `i18n.js` in `<head>`, `main.js` at end of `<body>`
- The navbar is identical across all pages — copy from an existing page and update the `class="active"` link

## BSW Module Pages

BSW module pages (`bsw/*.html`) use a two-column layout: `.page-with-sidebar` containing `.sidebar` (left, section nav) and `.content` (right). The sidebar lists related modules grouped by AUTOSAR layer. See [bsw/com.html](bsw/com.html) as the reference template.

## CSS Conventions

All colors are CSS variables defined in `style.css`: `--green`, `--purple`, `--accent`, `--orange`, `--red`, `--text-secondary`, `--border`, `--bg-secondary`, etc. Do not use hardcoded color values; use the variables.
