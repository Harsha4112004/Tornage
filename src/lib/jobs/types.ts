export interface Job {
  company: string;
  title: string;
  location: string;
  url: string;
  source: "greenhouse" | "ashby" | "lever";
  createdAt: string | null;

  jobId?: string;
  jobType?: "Internship" | "Full-time";
  workType?: "On-site" | "Remote" | "Hybrid";
}
