// Decorative light sits behind content; it never intercepts input or enters the accessibility tree.
export default function Ambient() {
    return <div className="ambient" aria-hidden="true"><div className="blob blob-yellow"/><div className="blob blob-orange"/><div className="blob blob-blue"/><div className="blob blob-red"/></div>;
}
