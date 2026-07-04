const normalizeBaseUrl = (url) => url?.replace(/\/+$/, "") || "";

const statsApiBaseUrl = normalizeBaseUrl(import.meta.env.VITE_STATS_API_BASE_URL);

export const hasStatsApi = Boolean(statsApiBaseUrl);

export const statsApiUrl = (path) => {
  if (!hasStatsApi) {
    throw new Error("Stats API URL is not configured.");
  }

  return `${statsApiBaseUrl}${path}`;
};
