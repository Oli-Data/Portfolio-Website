// Northeast arrows identify external websites, not generic click targets.
export default function ArrowIcon({ href }) {
    let destination;
    try {
        destination = new URL(href, 'https://christianolivares.us');
    }
    catch {
        return null;
    }
    if (!['http:', 'https:'].includes(destination.protocol) || ['christianolivares.us', 'www.christianolivares.us'].includes(destination.hostname))
        return null;
    return <svg className="arrow-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" focusable="false">
    <path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
