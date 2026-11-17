// Reviewed against the current local notebook and its November 14 UTC report.
// This is a saved analytical snapshot, not a live feed or an independent rerun.
export const ooklaPost = {
  slug: 'california-mobile-broadband-divide',
  title: 'Faster mobile networks. An uneven California.',
  category: 'Analysis',
  status: 'Draft',
  summary: 'County-assigned observations show the Central Valley closing its sampled download-speed gap with the Bay Area. Updated methods, urban/rural comparisons, and sample limits tell a more careful story.',
  readingTime: '6 min read',
  notebook: '/notebooks/ookla-article-companion.ipynb',
  notebookDescription: 'Recreate the current annual download chart from the embedded summary. This compact companion does not rerun the full geographic or Census pipeline. The article was checked against the current local project notebook and its saved November 14, 2026 UTC report; the GitHub version may lag these local changes.',
  evidence: [
    { label: 'Download annual data (CSV)', href: '/data/ookla-annual-summary.csv' },
    { label: 'Download current evidence and provenance (JSON)', href: '/data/ookla-article-evidence.json' },
    { label: 'Inspect the project repository', href: 'https://github.com/Oli-Data/Ookla-Data' },
  ],
  takeaways: [
    'In 2020, the sampled download median was 34.92 Mbps in the Central Valley and 52.06 Mbps in the Bay Area, a gap of about 17.13 Mbps.',
    'The Central Valley sampled median exceeded the Bay Area median in 2024 and 2025. In 2025, the figures were 267.47 and 263.76 Mbps, respectively.',
    'Rural sampled medians were lower in the Central Valley and Southern California. These measurements do not establish equal service, universal coverage, affordability, or causation.',
  ],
  blocks: [
    { type: 'text', heading: 'What does getting faster actually mean?', paragraphs: [
      'A region can get faster without every community sharing the improvement. This project asks how observed mobile broadband in the Central Valley changed relative to the Bay Area and Southern California, then examines differences associated with Census tract income, poverty, and urban geography.',
      'The result is a comparison of available measurements, not a claim that every resident or every location experienced the same improvement.',
    ] },
    { type: 'text', heading: 'Correcting the geography before comparing speeds', paragraphs: [
      'Ookla’s open mobile dataset summarizes cellular Speedtest measurements within geographic tiles for each quarter. Each record contains average download speed, upload speed, latency, and test counts. This measures mobile networks, not home broadband subscriptions.',
      'The initial regional extracts use rectangles that overlap and do not cover every part of every named county. The current analysis pools those extracts, removes duplicate quadkey/year/quarter records, and assigns tile centers using California Census boundaries. County assignments make the three study regions mutually exclusive within the cached coverage; they do not turn those extracts into complete county coverage.',
      'The three cached extracts contain 1,330,789 records before pooling and deduplication. After requiring at least 20 tests per tile-quarter and assigning the study counties, 56,972 records remain. Records are not individual tests, unique devices, or people.',
      'Annual comparisons use unweighted medians of tile-quarter averages. Each retained record has equal weight, and a tile can appear in multiple quarters. This reduces the influence of extreme averages but does not make the sample representative of the population.',
    ], sources: [{ label: 'Ookla dataset definitions', href: 'https://github.com/teamookla/ookla-open-data' }] },
    { type: 'text', heading: 'The sampled gap narrowed and the ranking changed', paragraphs: [
      'In 2020, the Central Valley download median was 34.92 Mbps and the Bay Area median was 52.06 Mbps. The roughly 17.13 Mbps gap means the Bay Area median was 49.1% higher relative to the Central Valley median. This percentage uses the Central Valley as its denominator.',
      'The Central Valley sampled median moved slightly above the Bay Area in 2024 and 2025. In 2025, it was 267.47 Mbps versus 263.76 Mbps, a difference of about 3.71 Mbps. Southern California recorded 276.49 Mbps. This does not establish statistically significant differences or equivalent service across the regions.',
      'The 2025 upload medians were 31.19 Mbps in the Central Valley and 29.91 Mbps in the Bay Area; latency medians were 22 and 24 milliseconds. These are descriptive comparisons, not evidence identifying which investments or technologies caused the changes.',
    ] },
    { type: 'ookla-trend' },
    { type: 'text', heading: 'All quarters are present, but the sample changes', paragraphs: [
      'The current regional files contain all 24 quarters from 2020 through 2025, including the recovered Q3 2021 records. The earlier missing-quarter warning and three-quarter sensitivity comparison no longer describe this snapshot. All four quarters of 2025 are present.',
      'The Central Valley contributes 1,245 qualifying county-assigned records in 2020 and 651 in 2025; the Bay Area contributes 2,657 and 1,014. Smaller counts do not make a year incomplete. Different locations qualifying in different years can change the median, so this is not a fixed panel of locations.',
    ] },
    { type: 'text', heading: 'Urban and rural mean actual Census geography', paragraphs: [
      'For 2022–2024 observations, the analysis now classifies a tile center as Urban when it intersects an official 2020 Census urban-area polygon, distributed in TIGER/Line 2023, and Rural otherwise. It no longer uses tract land area as a density proxy and has no Suburban category.',
      'The Central Valley and Southern California have lower rural sampled download medians than urban medians. The Bay Area medians are close, but its rural sample contains only 225 records from 168 distinct tiles. That cannot establish equal service throughout its urban and rural communities.',
      'The fixed 2020 boundaries may not reflect later changes in urban development. Observation counts can include repeated measurements at the same tile; distinct-tile counts help show how geographically broad each sample is.',
    ] },
    { type: 'table', heading: 'Download speed by official urban classification', columns: ['Region', 'Class', 'Median download', 'Observations', 'Distinct tiles'], rows: [
      ['Central Valley', 'Urban', '185.80 Mbps', '2,660', '1,513'],
      ['Central Valley', 'Rural', '119.38 Mbps', '604', '440'],
      ['Southern California', 'Urban', '190.10 Mbps', '15,940', '6,763'],
      ['Southern California', 'Rural', '79.73 Mbps', '541', '357'],
      ['Bay Area', 'Urban', '182.16 Mbps', '5,514', '2,417'],
      ['Bay Area', 'Rural', '180.88 Mbps', '225', '168'],
    ], caption: '2022–2024 unweighted medians of observed tile-quarter download averages, using fixed 2020 Census urban areas. Counts describe the sample, not residents. Horizontal scrolling preserves the complete table on phones.' },
    { type: 'text', heading: 'Income and poverty need careful interpretation', paragraphs: [
      'The demographic join now explicitly uses the 2023 ACS five-year release and 2023 TIGER/Line tract boundaries. Poverty rate uses people below poverty divided by the population for whom poverty status is determined: B17001_002E / B17001_001E × 100. A zero denominator gives a missing rate, not zero poverty.',
      'Download medians do not increase consistently with tract income across all three regions, and the highest-poverty bracket is not uniformly the slowest. The Bay Area’s below-$40,000 income bracket has a 206.75 Mbps median, but only 61 observations from 9 distinct tiles. Small brackets are not broad evidence about the populations living in those tracts.',
      'Exploratory regressions now use standard errors clustered by tile to account for repeated observations at a location. The models explain approximately 3.3% of variation in the Central Valley, 3.8% in Southern California, and 0.4% in the Bay Area. Clustering does not remove confounding, establish causation, or settle which factor is a dominant predictor.',
    ], sources: [{ label: '2023 ACS five-year data', href: 'https://www.census.gov/data/developers/data-sets/acs-5year/2023.html' }, { label: 'Census poverty-status variables', href: 'https://api.census.gov/data/2023/acs/acs5/groups/B17001.html' }] },
    { type: 'text', heading: 'What the study still cannot tell us', paragraphs: [
      'People choose to run speed tests. Locations with no qualifying records are not evidence of missing service or dead zones. The data does not measure affordability, subscription take-up, or the experience of every resident.',
      'Cached rectangular coverage, changing annual samples, repeated tiles, neighboring locations, and fixed urban boundaries limit interpretation. Tract demographics describe areas, not the individuals who ran a test. A stable set of tiles, year controls, and further checks of spatial dependence would help test the patterns more rigorously.',
      'The strongest finding is descriptive: sampled mobile download speeds rose substantially, and the Central Valley closed its earlier gap with the Bay Area. Local differences and small samples remain important even when regional medians look similar.',
    ] },
    { type: 'text', heading: 'Sources and provenance', paragraphs: [
      'Updated November 16, 2026 from the current local project notebook and analysis_summary.json generated November 14, 2026 at 07:58 UTC (November 13 Pacific). Annual aggregates were independently checked read-only against the cached data and boundaries; this article review did not rerun the full demographic analysis. The public repository may not yet include these local revisions.',
      'The downloadable evidence records the current saved analytical summary and source-file checksums. The companion notebook recreates the annual download chart from an embedded summary without publishing the original output-heavy notebook, credentials, or raw regional data. This replaces the October 1 article snapshot.',
      'Based on CO³ Labs analysis of Speedtest by Ookla Global Fixed and Mobile Network Performance Maps, mobile layer, 2020–2025. Ookla Open Data is provided under CC BY-NC-SA 4.0; retain source attribution and applicable terms when reusing derived data. This remains a research draft, not a live data feed.',
    ], sources: [{ label: 'Project repository', href: 'https://github.com/Oli-Data/Ookla-Data' }, { label: 'Ookla Open Data and license', href: 'https://github.com/teamookla/ookla-open-data' }, { label: '2023 TIGER/Line boundaries', href: 'https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2023.html' }] },
  ],
}
