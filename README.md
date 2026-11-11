# Christian Olivares-Rodriguez · Personal portfolio

React and Vite portfolio for data science, applied machine learning, and software projects. Includes a glass-inspired Frutiger Aero design with the same twelve monthly color palettes as CO³ Labs.

## Run locally

- `npm ci` installs the locked dependencies.
- `npm run dev` starts the development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves that build locally.

## Design

The personal identity retains its reflective glass, translucent globe, bubbles, curved light, Syne typography, and personal positioning. Colors follow the visitor’s local calendar using the same twelve named palettes as CO³ Labs. Day, Night, and Auto are available in the header. Existing Day/Night choices under `portfolio-appearance` are preserved; new visitors follow device appearance. The palette initializes before paint, updates across local month boundaries, and remains usable when storage is blocked. Glass opacity stays at .58 in Day and .59 in Night, with the existing 24px panel and 28px header blur. Night secondary text is slightly brighter to maintain contrast with this glass density.

Typography uses Syne and DM Sans from Google Fonts, with local fallbacks. Illustration elements are CSS and SVG. Reduced-motion preferences are respected; no continuously animated background is used.

## Content and evidence

- Selah is an unsigned Windows alpha for church livestream preparation and an operator-reviewed OBS workflow. Its actual workspace screenshot, approved Newsreader wordmark, and burning-bush icon are included. There is no public download; clean-machine and complete live operator testing remain outstanding. Screenshot evidence is not a verified broadcast.
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
- `public/images/`: actual Lumitudy design preview, Selah alpha workspace screenshot, and saved Chicago confusion matrix.

The existing résumé PDF is preserved. It should be reviewed separately for current wording before publication.

## Verification

Run `npm run lint`, `npm run build`, then `npm run test`. The tests inspect the generated prepaint HTML, so build first.

The November 2026 adaptation passes ESLint, production build, and all 32 regression tests. Coverage includes all twelve monthly palettes in Day/Night, local month/year boundaries and leap day, open-tab rollover, device appearance, cross-tab changes, blocked or unwritable storage, cleanup, and modeled 4.5:1 text contrast on canvas, conservative scene overlaps, glass gradients, and header highlights. Tests also retain the original project statements, evidence, statuses, existing destinations, screenshot references, and future-home disclosure.

Native Edge review covered desktop and 320px/390px responsive emulation, Day/Night/Auto controls, Auto after refresh, compact menu activation and dismissal, keyboard Tab/Enter navigation, Escape focus restoration, repeated navigation, browser Back, expanded project evidence, vector sizing, and the final dimensional actions. The local screenshot and résumé URLs returned HTTP 200 with the expected content types. This is browser emulation, not physical-device or screen-reader certification. All-month and forced-colors/reduced-motion behavior have source/model coverage but were not exhaustively rendered.

## CO³-aligned refinements

Working software leads with Lumitudy and its unchanged real design preview, followed by Selah and its real alpha workspace. The two existing research projects follow, then Luz sits in a quieter early-exploration section. Project prose, results, limitations, contact information, résumé, and screenshots are preserved. Exact approved Lumitudy, Selah and Luz outlined identities and the reusable research symbol connect the portfolio to the lab without inventing capabilities.

Repeated link arrows are removed. The main hero, résumé, lab and contact actions and the two research destinations have beveled glass edges, a fine-pointer hover lift, a pressed state and a separate keyboard focus ring. Inline supporting links and footer navigation remain quieter. Reduced motion removes movement; forced colors uses system colors. The website retains its static decorative background rather than adding unrequested ambient animation.

`src/lib/appearance.js` is the palette/controller source; Vite injects its shared initializer into the HTML. `src/styles/appearance.css` supplies monthly tokens and controls, while `src/styles/refinements.css` adapts the hierarchy and dimensional actions. No dependencies were added. These changes remain local and are not deployed by the verification workflow.

The CO header mark uses pair-only kerning instead of trailing negative tracking, keeping the visible initials centered at desktop and mobile sizes. Selah’s full-size screenshot action uses the same dimensional button treatment.

The Selah addition was reviewed in native Edge at desktop, 320px Night and 390px Day. Its brand lockup, corrected CO header mark, disclosure, dimensional screenshot action, and image/caption fit the tested widths. The original Night preference was restored after review. Three added regression tests cover the alpha boundaries, exact screenshot bytes, and pair-only CO kerning.
