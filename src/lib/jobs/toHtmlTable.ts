import type { Job } from "./types";

export function jobsToHtmlTable(jobs: Job[]) {
  if (jobs.length === 0) {
    return `<p>No new internship/fresher jobs found for yesterday 🇮🇳</p>`;
  }

  const rows = jobs.map(job => `
    <tr>
      <td align="center">${job.company}</td>
      <td align="center">${job.location}</td>
      <td>${job.title}</td>
      <td align="center">${job.jobType}</td>
      <td align="center">${job.workType}</td>
      <td align="center">${job.createdAt?.split("T")[0] ?? "-"}</td>
      <td align="center">
        <a href="${job.url}" target="_blank">Apply</a>
      </td>
    </tr>
  `).join("");

  return `
  <h2 style="text-align:center;">
    🇮🇳 Internship & Fresher Jobs (India)
  </h2>

  <table
    width="100%"
    cellpadding="8"
    cellspacing="0"
    border="1"
    style="
      border-collapse:collapse;
      text-align:center;
      font-family:Arial, sans-serif;
      font-size:14px;
    "
  >
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
