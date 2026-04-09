export const apiBaseUrl = 'https://hossamportfolioapi.runasp.net';
export const apiV1BaseUrl = `${apiBaseUrl}/api/v1`;

/** Builds absolute URL for uploaded media when API returns a relative path. */
export function resolveApiMediaUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) {
    return null;
  }
  const t = url.trim();
  if (/^https?:\/\//i.test(t)) {
    return t;
  }
  const path = t.startsWith('/') ? t : `/${t}`;
  return `${apiBaseUrl}${path}`;
}