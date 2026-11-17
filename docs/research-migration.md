# California mobile broadband article

The portfolio hosts the article at `/research/california-mobile-broadband-divide/`.
The source is `Oli-Data/CO3-Labs-Landing` at commit
`13bb86268b7ade8679fd44d8c566b313da8ca2a6`.
The stylesheet snapshot includes the reviewed CO3 business preview at local
commit `c31394ec44d74f29eac6a6ecfe2aed1b4c23e33e`; its additional layout rules
apply to the business introduction and do not change the article.

The article object, evidence JSON, annual CSV, companion notebook, and four
article style sheets retain the original contents. Source hashes are recorded in
`tests/fixtures/research-source.json`. The analysis has not been rerun or revised.

The Vite entry is separate from the portfolio homepage to preserve the original
CSS cascade. The build prerenders the complete article so its text, default chart,
tables, and evidence links are available before JavaScript loads. React hydrates
the interactive download/upload/latency chart, exact-value disclosure, and the
original desktop scrolling presentation. Phones retain the original stacked
layout and scrollable tables; reduced motion uses the original linear layout.

Adaptations are limited to the host framework and portfolio navigation:

- Next links become ordinary anchors; the header and footer lead to the portfolio.
- The existing portfolio appearance control and saved preference are shared.
- The research byline and CO3/Ookla attribution remain unchanged.
- The article renderer includes only the block types actually used by this study.
- Urban/rural table rows use unique keys instead of duplicated region keys.
- The portfolio project links to the local article and retains the GitHub link.
- Its outdated partial-2025 note is corrected to match the transferred article.

`npm test`, `npm run lint`, and `npm run build` validate the migration. No push or
deployment is part of this work. Publish the portfolio before activating any
CO3 redirects to the new article.
