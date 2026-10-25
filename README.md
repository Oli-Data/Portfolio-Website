# Christian Olivares-Rodriguez · Personal portfolio

React and Vite portfolio for data science, applied machine learning, and software projects. Includes a glass-inspired Frutiger Aero design with ocean blue, aqua, and fresh green accents.

## Run locally

- `npm ci` installs the locked dependencies.
- `npm run dev` starts the development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves that build locally.

## Design

The personal identity uses ocean blue, glassy aqua, fresh green, pearl highlights, and a small amber accent. Frutiger Aero materials connect it to CO³ Labs and Lumitudy: reflective glass, a translucent globe, bubbles, curved light, and glossy controls. Night is the default; daylight can be selected in the header. The preference is stored under `portfolio-appearance`.

Typography uses Syne and DM Sans from Google Fonts, with local fallbacks. Illustration elements are CSS and SVG. Reduced-motion preferences are respected; no continuously animated background is used.

## Content and evidence

- Lumitudy is a working prototype with an actual local design screenshot. lumitudy.com is future-home text, not a live link. Current limitations are disclosed.
- California broadband is labeled a research draft. The unsupported geographic-versus-income headline was removed. The public repository remains linked for inspection.
- Luz is an early prototype with private source code. Implemented application work and development goals are distinguished. No private project identifiers or access addresses are exposed.
- Chicago arrest classification reports saved notebook results: 86% accuracy on 38,417 held-out examples, approximately 75% majority baseline, 0.78 arrest precision, and 0.59 arrest recall. These were verified against the existing notebook output, not rerun. The original confusion matrix is included as a supporting artifact. This study is not presented as a decision tool for people.
- Personal research, independent software, and contract services are distinguished. No clients, endorsements, or business outcomes are fabricated.

## Files

- `src/styles/globals.css`: shared palette, layout, Aero background, controls, and accessibility defaults.
- `src/components/Nav.jsx`: navigation and persisted appearance selection.
- `Hero.jsx`: personal introduction and glass globe.
- `Projects.jsx`: project evidence and expandable limitations.
- `About.jsx`: personal approach and CO³ Labs connection.
- `Footer.jsx`: contact, professional links, and résumé.
- `public/images/`: actual Lumitudy design preview and saved Chicago confusion matrix.

The existing résumé PDF is preserved. It should be reviewed separately for current wording before publication.

## Verification

Production build and source-level checks pass. Browser visual and interaction QA remains unverified: the local-origin permission gate prevented automated viewing, including after renewed user approval. Do not treat the saved build as proof of responsive rendering or interactive behavior.
