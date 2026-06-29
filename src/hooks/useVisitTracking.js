import { useEffect } from "react";
import { statsApiUrl } from "../lib/statsApi";
import { getPortfolioVisitorId } from "../lib/visitorId";

export const useVisitTracking = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch(statsApiUrl("/api/track-visit"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId: getPortfolioVisitorId(),
            path: `${window.location.pathname}${window.location.hash}`,
          }),
        });
      } catch {
        // Tracking is best-effort; the portfolio should work without the API.
      }
    };

    trackVisit();
  }, []);
};
