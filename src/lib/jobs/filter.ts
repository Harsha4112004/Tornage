import type { Job } from "./types";

/* ===============================
   DATE HELPERS
================================ */
function isYesterday(dateStr?: string | null) {
  if (!dateStr) return false;

  const posted = new Date(dateStr);
  const now = new Date();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  posted.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  return posted.getTime() === yesterday.getTime();
}

/* ===============================
   FILTER LOGIC
================================ */
export function filterJobs(jobs: Job[]): Job[] {
  return jobs.filter(job => {
    const title = job.title.toLowerCase();
    const location = job.location.toLowerCase();

    // 🇮🇳 India only
    const isIndia =
      location.includes("india") ||
      location.includes("bengaluru") ||
      location.includes("bangalore") ||
      location.includes("hyderabad") ||
      location.includes("surat") ||
      location.includes("chandigarh") ||
      location.includes("ahmedabad") ||
      location.includes("kolkata") ||
      location.includes("jaipur") ||
      location.includes("chennai") ||
      location.includes("pune") ||
      location.includes("mumbai") ||
      location.includes("gurgaon") ||
      location.includes("noida") ||
      location.includes("delhi") ||
      location.includes("remote india") ||
      location.includes("remote india");

    const isIntern =
      title.includes("intern") ||
      title.includes("internship") ||
      title.includes("trainee") ||
      title.includes("fresher");

    const isTech =
      title.includes("engineer") ||
      title.includes("developer") ||
      title.includes("software") ||
      title.includes("frontend") ||
      title.includes("backend") ||
      title.includes("full stack") ||
      title.includes("fullstack") ||

      title.includes("ai") ||
      title.includes("artificial intelligence") ||
      title.includes("machine learning") ||
      title.includes("ml") ||

      title.includes("data") ||
      title.includes("analytics") ||
      title.includes("analyst");

    return (
      //isIndia &&
      //isIntern &&
      isYesterday(job.createdAt)
    );
  });
}
