import type { Job } from "./types";
export function normalizeGreenhouse(
  raw: any,
  company: string
): Job {
  return {
    company,
    title: raw.title,
    location: raw.location?.name || "India",
    url: raw.absolute_url,
    source: "greenhouse",

    createdAt:
      raw.first_published_at ||
      raw.created_at ||
      raw.updated_at ||
      null,
  };
}

export function normalizeAshby(
  raw: any,
  company: string
): Job {
  return {
    company,
    title: raw.title,
    location: raw.location || "India",
    url: raw.jobUrl || raw.applyUrl,
    source: "ashby",

    createdAt: raw.createdAt || raw.updatedAt || null,

  };
}

