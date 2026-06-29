const VISITOR_ID_KEY = "eswar_portfolio_visitor_id";

export const getPortfolioVisitorId = () => {
  const existingId = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existingId) return existingId;

  const newId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(VISITOR_ID_KEY, newId);
  return newId;
};
