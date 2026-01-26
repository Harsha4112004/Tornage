import { fetchGreenhouse } from "./greenhouse";
import { fetchAshby } from "./ashby";
import type { ATS } from "@/lib/companies";

export async function fetchJobs(ats: ATS, slug: string) {
  switch (ats) {
    case "greenhouse":
      return fetchGreenhouse(slug);
    case "ashby":
      return fetchAshby(slug);
    default:
      return [];
  }
}
