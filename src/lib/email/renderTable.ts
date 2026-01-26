import type { Job } from "@/lib/jobs/types";

export function renderEmailTable(jobs: Job[]) {
  const rows = jobs
    .map(
      (j) => `
<tr>
  <td>${j.company}</td>
  <td>${j.location}</td>
  <td>${j.title}</td>
  <td>${j.jobType}</td>
  <td>${j.workType}</td>
  <td>${j.createdAt?.split("T")[0]}</td>
  <td><a href="${j.url}" target="_blank">Apply</a></td>
</tr>`
    )
    .join("");

  return `
<h2>🇮🇳 Internship & Fresher Jobs (India)</h2>

<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
  <thead>
    <tr>
      <th>Company</th>
      <th>City</th>
      <th>Job Title</th>
      <th>Job Type</th>
      <th>Work Type</th>
      <th>Date Posted</th>
      <th>Apply</th>
    </tr>
  </thead>
  <tbody>
    ${rows}
  </tbody>
</table>
`;
}
