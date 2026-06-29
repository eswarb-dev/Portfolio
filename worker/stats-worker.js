import { Resend } from "resend";

const jsonHeaders = (origin) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Content-Type": "application/json",
});

const jsonResponse = (body, status = 200, origin = "*") =>
  new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders(origin),
  });

const getAllowedOrigin = (request, env) => {
  const origin = request.headers.get("Origin") || "";
  if (!env.SITE_ORIGIN) return "*";

  const allowedOrigins = env.SITE_ORIGIN.split(",")
    .map((allowedOrigin) => allowedOrigin.trim())
    .filter(Boolean);

  if (allowedOrigins.includes(origin)) return origin;
  return allowedOrigins[0] || "*";
};

const getDateKey = () => new Date().toISOString().slice(0, 10);

const statsKeys = {
  totalVisits: "portfolio:stats:totalVisits",
  uniqueVisitors: "portfolio:stats:uniqueVisitors",
  lastUpdated: "portfolio:stats:lastUpdated",
  resumeRequestCount: "portfolio:resume:requestCount",
  latestResumeRequests: "portfolio:resume:latestRequests",
  todayVisits: (dateKey) => `portfolio:stats:todayVisits:${dateKey}`,
  visitor: (visitorId) => `portfolio:visitor:${visitorId}`,
  resumeRequest: (requestId) => `portfolio:resume:request:${requestId}`,
};

const isValidVisitorId = (visitorId) =>
  typeof visitorId === "string" && visitorId.length >= 8 && visitorId.length <= 128 && /^[a-zA-Z0-9._:-]+$/.test(visitorId);

const readJsonBody = async (request) => {
  try {
    return await request.json();
  } catch {
    return {};
  }
};

const readNumber = async (kv, key) => Number((await kv.get(key)) || 0);

const writeNumber = (kv, key, value) => kv.put(key, String(value));

const createRequestId = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  const randomPart = Math.random().toString(36).slice(2);
  return `${Date.now()}-${randomPart}`;
};

const sanitizeText = (value, maxLength = 500) =>
  Array.from(String(value || ""))
    .map((character) => {
      const codePoint = character.codePointAt(0);
      return codePoint < 32 || codePoint === 127 ? " " : character;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const readJsonList = async (kv, key) => {
  try {
    return JSON.parse((await kv.get(key)) || "[]");
  } catch {
    return [];
  }
};

const escapeHtml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getResumeFromEmail = (env) => env.RESUME_FROM_EMAIL || env.RESUME_NOTIFY_FROM || "Portfolio <onboarding@resend.dev>";

const automatedEmailFooterHtml = `
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0 16px;" />
  <p style="margin: 0 0 6px; color: #6b7280; font-size: 14px; line-height: 1.5;">
    This is an automated notification from <strong>eswar.me</strong>.
  </p>
  <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
    You received this email because a resume access request was submitted using this email address.
    If you did not request this, please ignore this email.
  </p>
`;

const automatedEmailFooterText = `This is an automated notification from eswar.me.

You received this email because a resume access request was submitted using this email address. If you did not request this, please ignore this email.`;

const sendResendEmail = async (env, emailPayload, errorContext) => {
  if (!env.RESEND_API_KEY) {
    throw new Error("Resume email provider is not configured.");
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send(emailPayload);

  if (error) {
    const providerMessage = error.message || error.name || "";
    throw new Error(`${errorContext}${providerMessage ? ` ${providerMessage}` : ""}`);
  }
};

const sendVisitorResumeEmail = async (env, resumeRequest) => {
  if (!env.RESUME_FILE_URL) {
    throw new Error("Resume file URL is not configured.");
  }

  const resumeUrl = env.RESUME_FILE_URL;
  const text = `Hi ${resumeRequest.name},

Thanks for requesting my resume.

You can view/download it here:
${resumeUrl}

I'll only use your email to respond to this resume request.

Regards,
Eswar B

${automatedEmailFooterText}`;
  const html = `
    <p>Hi ${escapeHtml(resumeRequest.name)},</p>
    <p>Thanks for requesting my resume.</p>
    <p>You can view/download it here:<br><a href="${escapeHtml(resumeUrl)}">${escapeHtml(resumeUrl)}</a></p>
    <p>I'll only use your email to respond to this resume request.</p>
    <p>Regards,<br>Eswar B</p>
    ${automatedEmailFooterHtml}
  `;

  await sendResendEmail(
    env,
    {
      from: getResumeFromEmail(env),
      to: resumeRequest.email,
      subject: "Eswar B - Resume Access",
      text,
      html,
    },
    "Resume access email could not be sent."
  );
};

const sendResumeNotification = async (env, resumeRequest) => {
  if (!env.RESUME_NOTIFY_EMAIL) {
    throw new Error("Resume notification email is not configured.");
  }

  const reason = resumeRequest.reason || resumeRequest.message || "Not provided";
  const visitorId = resumeRequest.visitorId || "Not provided";
  const text = `New resume request received.

Name: ${resumeRequest.name}
Email: ${resumeRequest.email}
Reason: ${reason}
Visitor ID: ${visitorId}
Time: ${resumeRequest.requestedAt}`;
  const html = `
    <p>New resume request received.</p>
    <p><strong>Name:</strong> ${escapeHtml(resumeRequest.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(resumeRequest.email)}</p>
    <p><strong>Reason:</strong> ${escapeHtml(reason)}</p>
    <p><strong>Visitor ID:</strong> ${escapeHtml(visitorId)}</p>
    <p><strong>Time:</strong> ${escapeHtml(resumeRequest.requestedAt)}</p>
    ${automatedEmailFooterHtml}
  `;

  await sendResendEmail(
    env,
    {
      from: getResumeFromEmail(env),
      to: env.RESUME_NOTIFY_EMAIL,
      reply_to: resumeRequest.email,
      subject: `New Resume Request - ${resumeRequest.name}`,
      text,
      html,
    },
    "Resume notification email could not be sent."
  );
};

const handleTrackVisit = async (request, env, origin) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405, origin);
  }

  if (!env.STATS_KV) {
    return jsonResponse({ error: "Stats KV binding is not configured." }, 503, origin);
  }

  const { visitorId } = await readJsonBody(request);
  if (!isValidVisitorId(visitorId)) {
    return jsonResponse({ error: "Invalid visitor id." }, 400, origin);
  }

  const todayKey = getDateKey();
  const now = new Date().toISOString();
  const visitorKey = statsKeys.visitor(visitorId);
  const isNewVisitor = !(await env.STATS_KV.get(visitorKey));
  const [totalVisits, todayVisits, uniqueVisitors] = await Promise.all([
    readNumber(env.STATS_KV, statsKeys.totalVisits),
    readNumber(env.STATS_KV, statsKeys.todayVisits(todayKey)),
    readNumber(env.STATS_KV, statsKeys.uniqueVisitors),
  ]);

  await Promise.all([
    writeNumber(env.STATS_KV, statsKeys.totalVisits, totalVisits + 1),
    writeNumber(env.STATS_KV, statsKeys.todayVisits(todayKey), todayVisits + 1),
    writeNumber(env.STATS_KV, statsKeys.uniqueVisitors, uniqueVisitors + (isNewVisitor ? 1 : 0)),
    env.STATS_KV.put(visitorKey, "1"),
    env.STATS_KV.put(statsKeys.lastUpdated, now),
  ]);

  return jsonResponse({ ok: true }, 200, origin);
};

const handleAdminStats = async (request, env, origin) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405, origin);
  }

  if (!env.ADMIN_STATS_TOKEN && !env.ADMIN_STATS_PASSWORD) {
    return jsonResponse({ error: "Admin stats token is not configured." }, 503, origin);
  }

  if (!env.STATS_KV) {
    return jsonResponse({ error: "Stats KV binding is not configured." }, 503, origin);
  }

  const { token, password } = await readJsonBody(request);
  const submittedSecret = token || password;
  const expectedSecret = env.ADMIN_STATS_TOKEN || env.ADMIN_STATS_PASSWORD;

  if (!submittedSecret || submittedSecret !== expectedSecret) {
    return jsonResponse({ error: "Invalid admin token." }, 401, origin);
  }

  const todayKey = getDateKey();
  const [totalVisits, uniqueVisitors, todayVisits, lastUpdated, totalResumeRequests, latestResumeRequests] = await Promise.all([
    readNumber(env.STATS_KV, statsKeys.totalVisits),
    readNumber(env.STATS_KV, statsKeys.uniqueVisitors),
    readNumber(env.STATS_KV, statsKeys.todayVisits(todayKey)),
    env.STATS_KV.get(statsKeys.lastUpdated),
    readNumber(env.STATS_KV, statsKeys.resumeRequestCount),
    readJsonList(env.STATS_KV, statsKeys.latestResumeRequests),
  ]);

  return jsonResponse({
    stats: {
      totalVisits,
      uniqueVisitors,
      todayVisits,
      lastUpdated,
      totalResumeRequests,
      latestResumeRequests,
    },
  }, 200, origin);
};

const handleRequestResume = async (request, env, origin) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405, origin);
  }

  if (!env.STATS_KV) {
    return jsonResponse({ error: "Stats KV binding is not configured." }, 503, origin);
  }

  const body = await readJsonBody(request);
  const name = sanitizeText(body.name, 120);
  const email = sanitizeText(body.email, 180).toLowerCase();
  const reason = sanitizeText(body.reason || body.message, 700);
  const path = sanitizeText(body.path || "/", 200);
  const visitorId = sanitizeText(body.visitorId, 128);

  if (!name) {
    return jsonResponse({ error: "Name is required." }, 400, origin);
  }

  if (!email || !isValidEmail(email)) {
    return jsonResponse({ error: "A valid email is required." }, 400, origin);
  }

  if (visitorId && !isValidVisitorId(visitorId)) {
    return jsonResponse({ error: "Invalid visitor id." }, 400, origin);
  }

  if (!env.RESUME_FILE_URL) {
    return jsonResponse({ error: "Resume file URL is not configured." }, 503, origin);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: "Resume email provider is not configured." }, 503, origin);
  }

  const now = new Date().toISOString();
  const requestId = createRequestId();
  const resumeRequest = {
    id: requestId,
    name,
    email,
    reason,
    message: reason,
    visitorId: visitorId || null,
    path,
    requestedAt: now,
    status: "pending",
  };

  const [currentCount, latestRequests] = await Promise.all([
    readNumber(env.STATS_KV, statsKeys.resumeRequestCount),
    readJsonList(env.STATS_KV, statsKeys.latestResumeRequests),
  ]);

  const publicAdminRecord = {
    id: requestId,
    name,
    email,
    reason,
    message: reason,
    visitorId: visitorId || null,
    requestedAt: now,
  };

  await Promise.all([
    env.STATS_KV.put(statsKeys.resumeRequest(requestId), JSON.stringify(resumeRequest)),
    writeNumber(env.STATS_KV, statsKeys.resumeRequestCount, currentCount + 1),
    env.STATS_KV.put(statsKeys.latestResumeRequests, JSON.stringify([publicAdminRecord, ...latestRequests].slice(0, 10))),
  ]);

  await Promise.all([sendVisitorResumeEmail(env, resumeRequest), sendResumeNotification(env, resumeRequest)]);

  return jsonResponse({ ok: true, resumeUrl: env.RESUME_FILE_URL }, 200, origin);
};

export default {
  async fetch(request, env) {
    const origin = getAllowedOrigin(request, env);
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: jsonHeaders(origin) });
    }

    try {
      if (url.pathname === "/api/track-visit") {
        return await handleTrackVisit(request, env, origin);
      }

      if (url.pathname === "/api/admin/stats") {
        return await handleAdminStats(request, env, origin);
      }

      if (url.pathname === "/api/request-resume") {
        return await handleRequestResume(request, env, origin);
      }
    } catch (error) {
      return jsonResponse({ error: error.message || "Request failed." }, 500, origin);
    }

    return jsonResponse({ error: "Not found." }, 404, origin);
  },
};
