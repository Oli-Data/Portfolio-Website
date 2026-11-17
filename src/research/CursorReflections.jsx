import { useEffect } from 'react';
export default function CursorReflections() {
    useEffect(() => {
        const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        let active = null;
        let frame = 0;
        let x = 0;
        let y = 0;
        const reset = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            active?.removeAttribute('data-reflecting');
            active = null;
        };
        // Only linked tiles receive the pointer highlight; static panels do not
        // suggest a click target. One frame updates the light, not the geometry.
        const move = (event) => {
            if (!finePointer.matches || reduced.matches || event.pointerType !== 'mouse') {
                reset();
                return;
            }
            if (!(event.target instanceof Element))
                return;
            const card = event.target.closest('a.glass-card[href], .home-note-grid > a[href], a.featured-post[href]');
            if (card !== active) {
                reset();
                active = card;
            }
            if (!active)
                return;
            x = event.clientX;
            y = event.clientY;
            if (frame)
                return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                if (!active?.isConnected) {
                    reset();
                    return;
                }
                const bounds = active.getBoundingClientRect();
                active.style.setProperty('--reflection-x', `${x - bounds.left}px`);
                active.style.setProperty('--reflection-y', `${y - bounds.top}px`);
                active.setAttribute('data-reflecting', 'true');
            });
        };
        const leaveWindow = (event) => { if (!event.relatedTarget)
            reset(); };
        document.addEventListener('pointermove', move, { passive: true });
        document.addEventListener('pointerout', leaveWindow, { passive: true });
        window.addEventListener('scroll', reset, { passive: true });
        window.addEventListener('blur', reset);
        finePointer.addEventListener('change', reset);
        reduced.addEventListener('change', reset);
        return () => {
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerout', leaveWindow);
            window.removeEventListener('scroll', reset);
            window.removeEventListener('blur', reset);
            finePointer.removeEventListener('change', reset);
            reduced.removeEventListener('change', reset);
            reset();
        };
    }, []);
    return null;
}
