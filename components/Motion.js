"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Page-level scroll motion. Content is fully visible in the HTML and CSS;
 * GSAP only adds entrance offsets after hydration, and only when the visitor
 * has not asked for reduced motion. Rendered once per page; all tweens and
 * triggers are reverted on unmount so client navigation never duplicates them.
 *
 *   data-hero          hero copy, staggered on load
 *   data-hero-media    hero photograph, slow drift while scrolling (desktop)
 *   data-reveal        fade up as it enters the viewport
 *   data-reveal-stagger  children fade up in sequence
 *   data-reveal-image  photograph unmasks from below
 *   data-pin           pinned below the header while its parent grid scrolls (desktop)
 */
export default function Motion() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const hero = gsap.utils.toArray("[data-hero] > *");
      if (hero.length) {
        gsap.from(hero, {
          y: 22,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.1,
          clearProps: "transform,opacity",
        });
      }

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray("[data-reveal-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 22,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray("[data-reveal-image]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
        tl.from(el, {
          clipPath: "inset(12% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          clearProps: "clipPath",
        });
        if (img) {
          tl.from(img, { scale: 1.08, duration: 1.4, ease: "power3.out", clearProps: "transform" }, 0);
        }
      });
    });

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      gsap.utils.toArray("[data-hero-media] img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: 0, scale: 1.04 },
          {
            yPercent: 8,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("[data-hero-media]"),
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // Pinning is layout, not decoration, so it also runs with reduced motion.
    mm.add("(min-width: 960px)", () => {
      const offset = () => (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72) + 32;
      gsap.utils.toArray("[data-pin]").forEach((el) => {
        const container = el.parentElement;
        ScrollTrigger.create({
          trigger: container,
          pin: el,
          pinSpacing: false,
          start: () => `top top+=${offset()}`,
          // Release when the container's bottom reaches the pinned element's bottom.
          end: () => `bottom top+=${offset() + el.offsetHeight}`,
          invalidateOnRefresh: true,
        });
      });
    });

    // Opening FAQ items or showing form messages changes page height; keep pins accurate.
    let frame;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mm.revert();
    };
  }, []);

  return null;
}
