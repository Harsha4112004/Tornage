import type { Job } from "./types";

export function enrichJob(job: Job): Job {
  const title = job.title.toLowerCase();
  const location = job.location.toLowerCase();

  // 🎓 Job Type (STRICT + SAFE)
  let jobType: "Internship" | "Full-time";

  if (
    /\b(intern|internship|trainee|fresher)\b/.test(title) &&
    !/\b(senior|staff|principal|lead)\b/.test(title)
  ) {
    jobType = "Internship";
  } else {
    jobType = "Full-time";
  }

  // 🏢 Work Type
  let workType: "Remote" | "Hybrid" | "On-site";

  if (
    location.includes("remote") ||
    location.includes("work from home") ||
    location.includes("wfh")
  ) {
    workType = "Remote";
  } else if (location.includes("hybrid")) {
    workType = "Hybrid";
  } else {
    workType = "On-site";
  }

  return {
    ...job,
    jobType,
    workType,
  };
}
