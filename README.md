# christianolivares.us — Personal Portfolio

Personal portfolio site for Christian Olivares-Rodriguez, Machine Learning Engineer and founder of CO³ Labs LLC.

**Live site:** [christianolivares.us](https://christianolivares.us)

---

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Plain CSS with custom design tokens (no Tailwind)
- **Fonts:** Syne (headings) + DM Sans (body) via Google Fonts
- **Deployment:** Vercel
- **Domain:** Squarespace → Vercel nameservers

---

## Design

Custom "aqua glass" aesthetic built from scratch:

- Dark navy base (`#070d14`) with ambient radial gradient orbs
- Aqua/cyan (`#00c8d2`) as the primary accent color
- Syne 800 for display headings, DM Sans 300/400/500 for body
- Glass-effect cards with subtle borders and hover states
- Sticky frosted-glass nav with `backdrop-filter: blur`
- Fully responsive down to mobile

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── Christian_Olivares_Rodriguez_Resume.pdf
├── src/
│   ├── components/
│   │   ├── Nav.jsx / Nav.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── About.jsx / About.css
│   │   └── Footer.jsx / Footer.css
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vercel.json
└── package.json
```

---

## Sections

- **Hero** — Title, subtitle, CTA buttons, skill tags
- **Projects** — Featured Lumitudy card + Ookla Broadband Equity, Chicago Crimes Classifier, and an upcoming RTX 4090 ML project
- **About** — Bio and quick-stat cards (degree, venture, location, hardware, focus)
- **Footer** — GitHub, LinkedIn, Email links

---

## Running Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

Output goes to `/dist` — Vercel handles this automatically on every push to `main`.

---

## Featured Projects

| Project | Description | Stack |
|---|---|---|
| [Lumitudy](https://lumitudy.vercel.app) | AI flashcard platform with Kahoot-style multiplayer | FastAPI, React, WebSockets, Claude API |
| [Ookla Broadband Equity](https://github.com/Oli-Data/Ookla-Data) | Geospatial broadband disparity analysis across CA | Python, GeoPandas, Census ACS |
| Chicago Crimes Classifier | PyTorch binary classifier, 86% accuracy on ~38K records | PyTorch, Pandas, Scikit-learn |

---

## Contact

- **GitHub:** [github.com/Oli-Data](https://github.com/Oli-Data)
- **Site:** [christianolivares.us](https://christianolivares.us)
- **Venture:** [CO³ Labs LLC](https://co3labs.com)
