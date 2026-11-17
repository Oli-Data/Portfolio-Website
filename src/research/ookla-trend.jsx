import { useState } from 'react';
import evidence from './ookla-data.json';
const settings = {
    download: { label: 'Download', unit: 'Mbps', ceiling: 300 },
    upload: { label: 'Upload', unit: 'Mbps', ceiling: 40 },
    latency: { label: 'Latency', unit: 'ms', ceiling: 40 },
};
const regions = ['Central Valley', 'Bay Area', 'Southern California'];
const years = [2020, 2021, 2022, 2023, 2024, 2025];
export default function OoklaTrend() {
    const [metric, setMetric] = useState('download');
    const { label, unit, ceiling } = settings[metric];
    const x = (year) => 54 + (year - 2020) * 106;
    const y = (value) => 238 - value / ceiling * 200;
    return <figure className="research-figure">
    <div className="research-figure-heading"><div><span className="eyebrow">Ookla / 2020–2025 snapshot</span><h3>Mobile performance across three study areas</h3></div><div className="research-controls" role="group" aria-label="Performance metric">{Object.keys(settings).map(value => <button key={value} type="button" aria-pressed={metric === value} onClick={() => setMetric(value)}>{settings[value].label}</button>)}</div></div>
    <div className="research-latest" aria-live="polite">{regions.map((region, index) => {
            const row = evidence.annual.find(item => item.region === region && item.year === 2025);
            return <div key={region}><span className={`research-series research-series-${index}`}>{region}</span><strong>{row[metric].toFixed(metric === 'latency' ? 0 : 2)} <small>{unit}</small></strong><span>2025 median · n={row.observations.toLocaleString('en-US')}</span></div>;
        })}</div>
    {/* The zero baseline is shared across metrics. Distinct dash styles preserve
            the series identities without relying on color alone. Values remain HTML. */}
    <div className="research-plot-scroll" role="region" aria-label={`${label} trend chart`} tabIndex={0}>
    <svg className="research-plot" viewBox="0 0 640 286" role="img" aria-label={`${label} medians for the Central Valley, Bay Area, and Southern California, 2020 to 2025. Full values and counts are available in the table below.`}>
      <text x="54" y="20">{unit}{metric === 'latency' ? ' · lower is faster' : ''}</text>
      {[0, 1, 2, 3, 4].map(step => <g key={step}><line className="research-gridline" x1="54" y1={y(ceiling / 4 * step)} x2="584" y2={y(ceiling / 4 * step)}/><text x="44" y={y(ceiling / 4 * step) + 5} textAnchor="end">{ceiling / 4 * step}</text></g>)}
      {years.map(year => <text key={year} x={x(year)} y="271" textAnchor="middle">{year}</text>)}
      {regions.map((region, index) => {
            const rows = evidence.annual.filter(row => row.region === region);
            return <g key={region} className={`research-line research-series-${index}`}><polyline points={rows.map(row => `${x(row.year)},${y(row[metric])}`).join(' ')}/>{rows.map(row => <circle key={row.year} cx={x(row.year)} cy={y(row[metric])} r="4"><title>{`${region}, ${row.year}: ${row[metric].toFixed(2)} ${unit}, ${row.observations} observations`}</title></circle>)}</g>;
        })}
    </svg>
    </div>
    <p className="research-chart-hint">Scroll horizontally to see the full chart, or open the exact values below.</p>
    <figcaption>Median of tile-quarter average {label.toLowerCase()} values, with at least 20 tests per record. Each record has equal weight. All 24 quarters from 2020–2025 are present. County-assigned observations are limited to the cached geographic coverage. Source: CO³ Labs analysis of Ookla Open Data.</figcaption>
    <details className="research-values"><summary>View exact {label.toLowerCase()} values and sample sizes</summary><div className="research-table-scroll" role="region" aria-label={`${label} data table`} tabIndex={0}><table><caption>{label} in {unit}. n counts retained tile-quarter observations.</caption><thead><tr><th scope="col">Year</th>{regions.map(region => <th key={region} scope="col">{region}</th>)}</tr></thead><tbody>{years.map(year => <tr key={year}><th scope="row">{year}</th>{regions.map(region => { const row = evidence.annual.find(item => item.region === region && item.year === year); return <td key={region}>{row[metric].toFixed(2)}<small>n={row.observations.toLocaleString('en-US')}</small></td>; })}</tr>)}</tbody></table></div></details>
  </figure>;
}
