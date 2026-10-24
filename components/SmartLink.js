"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GAP = 16;
const TOP = Symbol("top");

// Where the next page should land after a SmartLink navigation.
let pendingTarget = null;

// Document position of an element, ignoring transforms from entrance animations.
function documentTop(el) {
  let y = 0;
  for (let node = el; node; node = node.offsetParent) y += node.offsetTop;
  return y;
}

function headerHeight() {
  return document.querySelector("header")?.offsetHeight || 72;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Full-screen sections (.screen-section) start exactly at the header's bottom edge,
// so they fill the view on their own; other sections bring their first heading
// to just below the sticky header.
export function scrollToSection(id, behavior) {
  const section = document.getElementById(id);
  if (!section) return false;
  const fullScreen = section.classList.contains("screen-section");
  const target = fullScreen ? section : section.querySelector("h1, h2") || section;
  window.scrollTo({
    top: Math.max(0, documentTop(target) - headerHeight() - (fullScreen ? 0 : GAP)),
    behavior: behavior || (prefersReducedMotion() ? "instant" : "smooth"),
  });
  return true;
}

/*
 * Internal link with predictable scrolling:
 *   "/page"        another page opens at its top; the current page scrolls back to the top
 *   "/#section"    scrolls to the section heading, navigating to that page first if needed
 */
// Prefetching is off by default: every page is small and static, and prefetching
// each link in view would add a background request per link on every page view.
export default function SmartLink({ href, onClick, children, prefetch = false, ...rest }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const [path, hash] = href.split("#");
    const targetPath = path || pathname;

    if (targetPath !== pathname) {
      // Navigate without Next.js scroll handling (it skips scrolling when the new
      // page's top is already in view) and let HashScroll place the page instead.
      event.preventDefault();
      pendingTarget = hash || TOP;
      router.push(href, { scroll: false });
      return;
    }

    event.preventDefault();
    if (hash) {
      window.history.pushState(null, "", `${targetPath}#${hash}`);
      requestAnimationFrame(() => scrollToSection(hash));
    } else {
      window.history.pushState(null, "", targetPath);
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "instant" : "smooth" });
    }
  };

  return (
    <Link href={href} onClick={handleClick} prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
}

// Mounted once in the layout. Places the page after a SmartLink navigation, and
// aligns the heading on a direct visit to a #hash URL. "instant" overrides the
// CSS smooth scrolling so arrival is immediate.
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const target = pendingTarget;
    pendingTarget = null;

    const hash = target === TOP ? null : target || decodeURIComponent(window.location.hash.slice(1));
    if (target !== TOP && !hash) return;

    const align = () => {
      if (target === TOP) window.scrollTo({ top: 0, behavior: "instant" });
      else scrollToSection(hash, "instant");
    };

    align();
    // ScrollTrigger restores its remembered scroll position when it refreshes after
    // a page change, and on a direct visit the browser's fragment jump and late
    // font/image loading can move the page, so re-align after each of those.
    const realign = () => requestAnimationFrame(align);
    ScrollTrigger.addEventListener("refresh", realign);
    const stop = setTimeout(() => ScrollTrigger.removeEventListener("refresh", realign), 1200);
    if (!target && document.readyState !== "complete") window.addEventListener("load", realign, { once: true });
    if (!target) document.fonts?.ready.then(realign);

    return () => {
      clearTimeout(stop);
      ScrollTrigger.removeEventListener("refresh", realign);
      window.removeEventListener("load", realign);
    };
  }, [pathname]);

  // Typing or following a bare #hash on the same page.
  useEffect(() => {
    const onHashChange = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash) requestAnimationFrame(() => scrollToSection(hash, "instant"));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
