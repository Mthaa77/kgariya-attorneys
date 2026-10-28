"use client";

/* Lightweight hash router — gives true multipage navigation (deep-linkable,
   back-button friendly) with animated page transitions, inside the single
   user-visible route of this environment. */

import { useCallback, useEffect, useState } from "react";

export function useRoute() {
  const [hash, setHash] = useState<string>(
    typeof window !== "undefined" ? window.location.hash || "#home" : "#home"
  );

  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#home");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return hash;
}

export function navigate(to: string, opts?: { scroll?: boolean }) {
  if (typeof window === "undefined") return;
  if (window.location.hash === to) {
    // Same route — just scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = to;
  if (opts?.scroll !== false) {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }
}

/** Parse "#/insights/article-slug" → ["insights", "article-slug"] */
export function parseRoute(hash: string): string[] {
  const clean = hash.replace(/^#\/?/, "");
  if (!clean) return [];
  return clean.split("?")[0].split("/").filter(Boolean);
}

export function useNavigate() {
  return useCallback((to: string) => {
    navigate(to);
  }, []);
}
