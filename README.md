# Christian Olivares-Rodriguez · Personal portfolio

React and Vite portfolio for data science, applied machine learning, and software projects. The glass-inspired Frutiger Aero design uses the same twelve monthly color palettes as CO³ Labs.

## Run locally

- `npm ci` installs the locked dependencies.
- `npm run dev` starts the development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves that build locally.
- `npm test` runs the regression suite. Build first: the appearance tests inspect the generated HTML.

## Design and navigation

The site retains its reflective glass, translucent globe, bubbles, curved light, Syne typography, and outlined project identities. Typography uses Syne and DM Sans from Google Fonts with local fallbacks. Illustrations use CSS and SVG; the decorative background is static.

Colors follow the visitor’s local calendar. Day, Night, and Auto are available in the header. Existing preferences under `portfolio-appearance` are preserved; new visitors follow device appearance. The palette initializes before paint, updates across month boundaries, and works when storage is unavailable. Glass opacity is .58 in Day and .59 in Night, with 24px panel and 28px header blur.

On mobile, the icon-only navigation trigger retains its accessible name and 44px target. Navigation and appearance menus tolerate a blur event with no next focused element, allowing Safari-style taps to activate before dismissal. Outside taps, keyboard focus changes, Escape, and navigation still close the menu.

Main actions and project destinations have beveled glass edges, a fine-pointer hover lift, a pressed state, and a separate keyboard focus ring. Reduced motion removes movement; forced colors uses system colors.

## Content and evidence

The introduction names Christian’s ASU data science background, Python, SQL, and machine learning work. About connects approximately six years at Best Buy and Geek Squad with his approach to data and software. Contact identifies the roles and project work he is seeking. “Curiosity, made useful.” remains the main signature line.

Projects lead with purpose and contribution. Expandable notes collect implementation details, results, and material limitations:

- **Lumitudy:** working prototype for document-to-study workflows, saved sets, server-graded exams, and WebSocket quiz rooms. Its public source is linked. Generated answers still need review, and live rooms are lost on server restart. lumitudy.com remains planned-home text, not a live link.
- **Selah:** unsigned Windows alpha for church livestream preparation and OBS control. The real workspace screenshot, Newsreader wordmark, and burning-bush icon are preserved. Preparation does not start outputs; a final operator review precedes streaming and recording. Local checks passed in the project’s documentation, while clean-machine and complete live-service testing remain pending. No public binary is linked.
- **California mobile broadband:** exploratory comparisons of Ookla data for the Central Valley, Bay Area, and Southern California, with Census joins. The research README and saved notebook contain inconsistent gap percentages, so this portfolio makes no exact regional-gap claim. Partial-year 2025 data, geographic definitions, and descriptive rather than causal conclusions remain explicit.
- **Chicago arrest classification:** a 192,082-record sample and a 60-feature PyTorch model. Saved notebook output reports 86% accuracy on 38,417 held-out records, approximately 75% majority baseline, 0.78 arrest precision, and 0.59 arrest recall. These were inspected, not rerun. The baseline is visible beside the headline metric; the confusion matrix remains linked. A random holdout does not validate future performance or decisions about people.
- **Luz:** private early prototype. The existing application description is separated from future memory, correction, and proactivity evaluation goals. No private source addresses or records are exposed.

No clients, endorsements, production readiness, or business outcomes are invented. The existing résumé PDF is unchanged and should be reviewed separately for current wording.

## Files

- `src/components/Nav.jsx`: desktop and mobile navigation.
- `src/components/ThemeControl.jsx`: appearance menu.
- `src/components/Hero.jsx`: introduction and globe.
- `src/components/Projects.jsx`: project descriptions and expandable notes.
- `src/components/About.jsx`: background and CO³ Labs connection.
- `src/components/Footer.jsx`: contact, professional links, and résumé.
- `src/lib/appearance.js`: palette/controller source; Vite injects its shared initializer into the HTML.
- `src/styles/`: shared design, appearance tokens, and refinements.
- `public/images/`: Lumitudy interface preview, Selah workspace screenshot, and recorded Chicago confusion matrix.

## Verification

The regression suite checks appearance across all twelve palettes and Day/Night modes, month/year boundaries, leap day, device appearance, cross-tab updates, unavailable storage, cleanup, and modeled text contrast. Portfolio tests protect project identities, maturity labels, recorded metrics, actual destinations, screenshot bytes, and keyboard/mobile navigation. They permit editorial improvements rather than requiring every old sentence verbatim.

The copy revision passed the production build and all 32 regression checks. Chrome review covered 320px, 390px, and 1100px frames, expanded project notes, keyboard disclosure controls, Day/Night switching, and all three mobile destinations with simulated Safari tap-focus behavior. No horizontal text overflow appeared at the checked widths. Browser emulation does not replace physical-device or screen-reader testing.

The production build and checks do not publish the website. No dependencies were added for the copy revision.
