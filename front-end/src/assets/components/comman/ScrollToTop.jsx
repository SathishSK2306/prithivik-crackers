import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls window to top on route change
 * Place this just inside your <Router> component
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top smoothly on route change
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Optional: Reset focus for accessibility
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    }
  }, [pathname]);

  return null;
}
