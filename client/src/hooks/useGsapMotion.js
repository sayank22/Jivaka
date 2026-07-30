import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useReducedMotion } from './useMotionPreference';

const revealDefaults = { duration: 0.45, ease: 'power2.out', y: 12, stagger: 0.07 };

export function usePageReveal(scope, dependencies = []) {
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return undefined;
    gsap.fromTo(scope.current, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'transform,opacity,visibility' });
    return undefined;
  }, { scope, dependencies: [reducedMotion, ...dependencies], revertOnUpdate: true });
}

export function useStaggerReveal(scope, selector, options = {}, dependencies = []) {
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return undefined;
    const targets = gsap.utils.toArray(selector, scope.current);
    if (!targets.length) return undefined;

    gsap.fromTo(targets, { autoAlpha: 0, y: options.y ?? revealDefaults.y }, {
      autoAlpha: 1,
      y: 0,
      duration: options.duration ?? revealDefaults.duration,
      stagger: options.stagger ?? revealDefaults.stagger,
      ease: options.ease ?? revealDefaults.ease,
      clearProps: 'transform,opacity,visibility',
    });
    return undefined;
  }, { scope, dependencies: [reducedMotion, ...dependencies], revertOnUpdate: true });
}

export function useDialogReveal(scope, isOpen) {
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!isOpen || reducedMotion) return undefined;
    const panel = scope.current?.querySelector('[data-motion-dialog-panel]');
    if (!panel) return undefined;
    gsap.fromTo(panel, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out', clearProps: 'transform,opacity,visibility' });
    return undefined;
  }, { scope, dependencies: [isOpen, reducedMotion], revertOnUpdate: true });
}

export function useInteractiveMotion(scope) {
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return undefined;
    const targets = gsap.utils.toArray('[data-motion-interactive]', scope.current);
    const cleanups = targets.map((target) => {
      const enter = () => gsap.to(target, { y: -2, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
      const leave = () => gsap.to(target, { y: 0, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
      target.addEventListener('pointerenter', enter);
      target.addEventListener('pointerleave', leave);
      return () => {
        target.removeEventListener('pointerenter', enter);
        target.removeEventListener('pointerleave', leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true });
}

export function useSidebarMotion(scope, isOpen, activePath) {
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    const drawer = scope.current?.querySelector("[data-sidebar-drawer]");
    const backdrop = scope.current?.querySelector("[data-sidebar-backdrop]");

    if (!drawer || !backdrop) return;

    if (reducedMotion) {
      gsap.set(drawer, { xPercent: isOpen ? 0 : -100 });
      gsap.set(backdrop, {
        autoAlpha: isOpen ? 1 : 0,
      });
      return;
    }

    gsap.to(backdrop, {
      autoAlpha: isOpen ? 1 : 0,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(drawer, {
      xPercent: isOpen ? 0 : -100,
      duration: 0.35,
      ease: "power3.out",
    });

    if (isOpen) {
      gsap.fromTo(
        drawer.querySelectorAll("[data-sidebar-item]"),
        {
          opacity: 0,
          x: -12,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.25,
          ease: "power2.out",
        }
      );
    }
  }, {
    scope,
    dependencies: [isOpen, activePath, reducedMotion],
    revertOnUpdate: true,
  });
}
