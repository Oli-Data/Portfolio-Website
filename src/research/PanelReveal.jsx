import { useEffect } from 'react';
const panelSelector = [
    '[data-panel-reveal]',
    'main .glass-card:not(.page-intro-panel):not(.article-heading):not(.section-intro):not(.project-section-intro):not(.home-journal-intro)',
    'main .project-brand-panel',
    'main .project-disclosure',
    'main .featured-post',
    'main .home-note-grid > a',
].join(', ');
const showcaseSelector = '[data-sticky-showcase]';
const stepSelector = '[data-showcase-step]';
const stageSelector = '[data-showcase-stage]';
const isShowcaseManaged = (el) => Boolean(el.closest('[data-showcase-ready="true"]') && (el.hasAttribute('data-showcase-step') || el.hasAttribute('data-showcase-stage')));
export default function PanelReveal() {
    useEffect(() => {
        const panels = document.querySelectorAll(panelSelector);
        const showcases = typeof document.querySelectorAll === 'function'
            ? Array.from(document.querySelectorAll(showcaseSelector))
            : [];
        if ((!panels.length && !showcases.length) || typeof IntersectionObserver !== 'function')
            return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const contrast = window.matchMedia('(forced-colors: active)');
        const desktopShowcase = window.matchMedia('(min-width: 961px)');
        const motionDisabled = () => reduced.matches || contrast.matches || document.hidden;
        const active = new Map();
        const cleanups = [];
        for (const showcase of showcases) {
            const steps = Array.from(showcase.querySelectorAll(stepSelector));
            if (steps.length < 2)
                continue;
            let currentIndex = 0;
            let frame = 0;
            const stages = typeof showcase.querySelectorAll === 'function'
                ? Array.from(showcase.querySelectorAll(stageSelector))
                : [];
            const getCopyBox = (step) => {
                if (step.tagName === 'SECTION')
                    return step;
                return step.querySelector('div, figcaption') ?? step;
            };
            const applyStage = (index) => {
                showcase.dataset.activeStage = String(index);
                stages.forEach((stage, idx) => {
                    stage.dataset.stageActive = idx === index ? 'true' : 'false';
                });
            };
            const syncStage = () => {
                if (!stages.length)
                    return;
                const focusedStage = document.activeElement instanceof Element && document.activeElement.matches(':focus-visible')
                    ? document.activeElement.closest(stageSelector)
                    : null;
                const focusedIndex = focusedStage ? stages.indexOf(focusedStage) : -1;
                // Keep keyboard controls visible, including when focus scrolls the page.
                // A mouse click must not lock the chart throughout the rest of the story.
                const narrativeStage = currentIndex >= Math.ceil(steps.length / 2) ? Math.min(1, stages.length - 1) : 0;
                applyStage(focusedIndex >= 0 ? focusedIndex : narrativeStage);
            };
            const applyActive = (nextIndex) => {
                const clamped = Math.max(0, Math.min(steps.length - 1, nextIndex));
                currentIndex = clamped;
                showcase.dataset.activeStep = String(clamped);
                steps.forEach((step, idx) => {
                    step.dataset.stepActive = idx === clamped ? 'true' : 'false';
                });
                syncStage();
            };
            const updateStepFromScroll = () => {
                frame = 0;
                if (!showcase.dataset.showcaseReady)
                    return;
                const viewportCenter = window.innerHeight * 0.45;
                let bestIndex = currentIndex;
                let bestDistance = Infinity;
                steps.forEach((step, idx) => {
                    const rect = getCopyBox(step).getBoundingClientRect();
                    if (rect.height <= 0 && rect.bottom === rect.top)
                        return;
                    const stepCenter = (rect.top + rect.bottom) * 0.5;
                    const distance = Math.abs(stepCenter - viewportCenter);
                    if (distance < bestDistance) {
                        bestDistance = distance;
                        bestIndex = idx;
                    }
                });
                if (bestIndex !== currentIndex)
                    applyActive(bestIndex);
                else
                    syncStage();
            };
            const scheduleUpdate = () => {
                if (frame || !showcase.dataset.showcaseReady)
                    return;
                if (typeof requestAnimationFrame === 'function') {
                    frame = requestAnimationFrame(updateStepFromScroll);
                }
                else {
                    updateStepFromScroll();
                }
            };
            const syncMode = () => {
                const enabled = Boolean(desktopShowcase?.matches) && !reduced.matches && !contrast.matches;
                if (enabled) {
                    showcase.dataset.showcaseReady = 'true';
                    steps.forEach((step, idx) => {
                        getCopyBox(step).style?.setProperty?.('grid-row', String(idx + 1));
                    });
                    applyActive(currentIndex);
                    updateStepFromScroll();
                }
                else {
                    delete showcase.dataset.showcaseReady;
                    delete showcase.dataset.activeStep;
                    delete showcase.dataset.activeStage;
                    for (const step of steps) {
                        delete step.dataset.stepActive;
                        getCopyBox(step).style?.removeProperty?.('grid-row');
                    }
                    for (const stage of stages)
                        delete stage.dataset.stageActive;
                }
            };
            const stepObserver = new IntersectionObserver(() => {
                updateStepFromScroll();
            }, { rootMargin: '-18% 0px -24% 0px', threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] });
            for (const step of steps)
                stepObserver.observe(getCopyBox(step));
            syncMode();
            const onStepActivate = (event) => {
                if (!showcase.dataset.showcaseReady)
                    return;
                const stage = event.target instanceof Element ? event.target.closest(stageSelector) : null;
                const stageIndex = stage ? stages.indexOf(stage) : -1;
                if (stageIndex >= 0) {
                    applyStage(stageIndex);
                    return;
                }
                const target = event.target instanceof Element ? event.target.closest(stepSelector) : null;
                if (!target)
                    return;
                const idx = steps.indexOf(target);
                if (idx >= 0 && idx !== currentIndex)
                    applyActive(idx);
            };
            window.addEventListener?.('scroll', scheduleUpdate, { passive: true });
            window.addEventListener?.('resize', scheduleUpdate, { passive: true });
            showcase.addEventListener('focusin', onStepActivate);
            // Defer until focus reaches its destination before resuming scroll selection.
            showcase.addEventListener('focusout', scheduleUpdate);
            showcase.addEventListener('pointerdown', onStepActivate, { passive: true });
            desktopShowcase?.addEventListener?.('change', syncMode);
            reduced.addEventListener('change', syncMode);
            contrast.addEventListener('change', syncMode);
            cleanups.push(() => {
                if (frame && typeof cancelAnimationFrame === 'function')
                    cancelAnimationFrame(frame);
                stepObserver.disconnect();
                window.removeEventListener?.('scroll', scheduleUpdate);
                window.removeEventListener?.('resize', scheduleUpdate);
                showcase.removeEventListener('focusin', onStepActivate);
                showcase.removeEventListener('focusout', scheduleUpdate);
                showcase.removeEventListener('pointerdown', onStepActivate);
                desktopShowcase?.removeEventListener?.('change', syncMode);
                reduced.removeEventListener('change', syncMode);
                contrast.removeEventListener('change', syncMode);
                delete showcase.dataset.showcaseReady;
                delete showcase.dataset.activeStep;
                delete showcase.dataset.activeStage;
                for (const step of steps)
                    delete step.dataset.stepActive;
                for (const stage of stages)
                    delete stage.dataset.stageActive;
            });
        }
        // Pre-stage panels below the initial viewport in their starting pose so
        // scrolling down reveals them and scrolling back up reverses the animation.
        const distance = window.innerWidth <= 640 ? 28 : 44;
        const staged = new Set();
        const hiddenPose = { opacity: 0, transform: `translateY(${distance}px) scale(0.975)` };
        const visiblePose = { opacity: 1, transform: 'translateY(0) scale(1)' };
        const observer = new IntersectionObserver(entries => {
            let inRowTop = -Infinity;
            let inDelay = 0;
            let outRowTop = -Infinity;
            let outDelay = 0;
            for (const { isIntersecting, target, boundingClientRect } of entries) {
                const el = target;
                if (motionDisabled() || el.matches(':focus-within') || isShowcaseManaged(el)) {
                    el.removeAttribute('data-panel-staged');
                    staged.delete(el);
                    continue;
                }
                const top = boundingClientRect.top;
                if (isIntersecting && staged.has(el)) {
                    staged.delete(el);
                    el.removeAttribute('data-panel-staged');
                    const current = active.get(el);
                    if (current && current.direction === 'out' && typeof current.animation.reverse === 'function') {
                        current.direction = 'in';
                        current.animation.reverse();
                        continue;
                    }
                    current?.animation.cancel();
                    inDelay = Math.abs(top - inRowTop) < 4 ? Math.min(inDelay + 80, 160) : 0;
                    inRowTop = top;
                    const animation = el.animate([hiddenPose, visiblePose], {
                        duration: 620,
                        delay: inDelay,
                        fill: 'both',
                        easing: 'cubic-bezier(.22, 1, .36, 1)',
                    });
                    active.set(el, { animation, direction: 'in' });
                    animation.onfinish = () => {
                        animation.cancel();
                        active.delete(el);
                    };
                }
                else if (!isIntersecting && !staged.has(el) && top > 0) {
                    staged.add(el);
                    el.setAttribute('data-panel-staged', '');
                    const current = active.get(el);
                    if (current && current.direction === 'in' && typeof current.animation.reverse === 'function') {
                        current.direction = 'out';
                        current.animation.reverse();
                        continue;
                    }
                    current?.animation.cancel();
                    outDelay = Math.abs(top - outRowTop) < 4 ? Math.min(outDelay + 60, 120) : 0;
                    outRowTop = top;
                    const animation = el.animate([visiblePose, hiddenPose], {
                        duration: 480,
                        delay: outDelay,
                        fill: 'both',
                        easing: 'cubic-bezier(.22, 1, .36, 1)',
                    });
                    active.set(el, { animation, direction: 'out' });
                    animation.onfinish = () => {
                        animation.cancel();
                        active.delete(el);
                    };
                }
            }
        }, { rootMargin: '0px 0px -14% 0px', threshold: 0.05 });
        const triggerLine = window.innerHeight * 0.86;
        for (const panel of panels) {
            const el = panel;
            if (!motionDisabled() &&
                typeof el.animate === 'function' &&
                !isShowcaseManaged(el)) {
                if (el.getBoundingClientRect().top >= triggerLine) {
                    el.setAttribute('data-panel-staged', '');
                    staged.add(el);
                }
                observer.observe(el);
            }
        }
        const settle = () => {
            staged.forEach(el => el.removeAttribute('data-panel-staged'));
            staged.clear();
            active.forEach(({ animation }) => animation.cancel());
            active.clear();
        };
        const preference = () => { if (motionDisabled())
            settle(); };
        const interact = (event) => {
            const panel = event.target instanceof Element ? event.target.closest(panelSelector) : null;
            if (!panel)
                return;
            panel.removeAttribute('data-panel-staged');
            staged.delete(panel);
            active.get(panel)?.animation.cancel();
            active.delete(panel);
        };
        reduced.addEventListener('change', preference);
        contrast.addEventListener('change', preference);
        document.addEventListener('visibilitychange', preference);
        document.addEventListener('focusin', interact);
        document.addEventListener('pointerdown', interact, { passive: true });
        return () => {
            observer.disconnect();
            cleanups.forEach(fn => fn());
            settle();
            reduced.removeEventListener('change', preference);
            contrast.removeEventListener('change', preference);
            document.removeEventListener('visibilitychange', preference);
            document.removeEventListener('focusin', interact);
            document.removeEventListener('pointerdown', interact);
        };
    }, []);
    return null;
}
