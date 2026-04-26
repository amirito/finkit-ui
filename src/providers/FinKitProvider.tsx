"use client";
import React, { useLayoutEffect } from "react";

export function FinKitProvider({ children, theme = "dark" }: { children: React.ReactNode, theme?: "dark" | "light" }) {
  
  useLayoutEffect(() => {
    // This creates the CSS variables in the browser memory 
    // so the components "just work" without a CSS file.
    const root = document.documentElement;
    
    if (theme === "dark") {
      root.style.setProperty("--finkit-background", "#050505");
      root.style.setProperty("--finkit-surface", "#111111");
      root.style.setProperty("--finkit-primary", "#22c55e");
      root.style.setProperty("--finkit-border", "rgba(255, 255, 255, 0.1)");
      root.style.setProperty("--finkit-text-main", "#ffffff");
      root.style.setProperty("--finkit-text-muted", "rgba(255, 255, 255, 0.5)");
      root.style.setProperty("--finkit-error", "#ff4b4b");
      root.style.setProperty("--finkit-danger", "var(--finkit-error)");
    } else {
      // Light mode defaults
      root.style.setProperty("--finkit-background", "#ffffff");
      root.style.setProperty("--finkit-surface", "#f4f4f5");
      root.style.setProperty("--finkit-primary", "#16a34a");
      root.style.setProperty("--finkit-border", "rgba(0, 0, 0, 0.1)");
      root.style.setProperty("--finkit-text-main", "#09090b");
      root.style.setProperty("--finkit-text-muted", "#71717a");
      root.style.setProperty("--finkit-error", "#dc2626");
      root.style.setProperty("--finkit-danger", "var(--finkit-error)");
    }
  }, [theme]);

  return <>{children}</>;
}
