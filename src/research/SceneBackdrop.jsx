// Decorative geometry is server-rendered. CSS owns ambient motion; scrolling
// has no animation listener, ripple layer, or per-frame JavaScript work.
export default function SceneBackdrop({ variant = "home" }) {
    const quiet = variant === "research" || variant === "article";
    return <div className="scene-backdrop" data-scene={variant} data-quiet={quiet || undefined} aria-hidden="true"><div className="digital-horizon"/><div className="light-ribbon ribbon-one"/><div className="light-ribbon ribbon-two"/><div className="light-ribbon ribbon-three"/><div className="scene-bubble bubble-one"/><div className="scene-bubble bubble-two"/><div className="scene-bubble bubble-three"/></div>;
}
