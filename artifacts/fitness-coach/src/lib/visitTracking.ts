const SESSION_KEY = "kc_visit_tracked";

export function trackVisit(pathname: string): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return;
  } catch {
    // ignore
  }
  const params = new URLSearchParams(window.location.search);
  const payload = {
    path: pathname,
    referrer: document.referrer || null,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
    utmContent: params.get("utm_content"),
  };
  fetch("/api/track/visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  })
    .then(() => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    })
    .catch(() => {
      // swallow
    });
}

export function getCurrentSource(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const src = params.get("utm_source");
  if (src) return src;
  if (document.referrer) {
    try {
      return new URL(document.referrer).hostname || null;
    } catch {
      return null;
    }
  }
  return null;
}
