const normalizeBaseUrl = (url) => url?.replace(/\/+$/, "") || "";

const statsApiBaseUrl = normalizeBaseUrl(import.meta.env.VITE_STATS_API_BASE_URL);

export const statsApiUrl = (path) => `${statsApiBaseUrl}${path}`;
