export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { companies } from "@/lib/companies";
import { fetchJobs } from "@/lib/ats";

import { normalizeGreenhouse, normalizeAshby } from "@/lib/jobs/normalize";
import { enrichJob } from "@/lib/jobs/enrich";        
import { filterJobs } from "@/lib/jobs/filter";
import { jobsToHtmlTable } from "@/lib/jobs/toHtmlTable";
import { sendJobsEmail } from "@/lib/email/sendJobsEmail";
import { getJobPostingSubscribers } from "@/lib/users/getJobPostingSubscribers";
import {connect} from "../../../../db/dbConfig";

export async function GET(req: Request) {
  await connect();
   const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  const allJobs = [];

  // 1️⃣ Fetch + normalize
  for (const company of companies) {
    const rawJobs = await fetchJobs(company.ats, company.slug);

    for (const raw of rawJobs) {
      if (company.ats === "greenhouse") {
        allJobs.push(normalizeGreenhouse(raw, company.name));
      }

      if (company.ats === "ashby") {
        allJobs.push(normalizeAshby(raw, company.name));
      }
    }
  }

  const recipients = await getJobPostingSubscribers();

  // 2️⃣ Enrich (JOB TYPE, WORK TYPE) ✅ THIS WAS MISSING
  const enrichedJobs = allJobs.map(enrichJob);

  // 3️⃣ Filter (India + Intern + AI/ML/Data + Yesterday)
  const filteredJobs = filterJobs(enrichedJobs);

  // 4️⃣ Build HTML
  const html = jobsToHtmlTable(filteredJobs);

  // 5️⃣ Send email (ONCE)
  await sendJobsEmail(html, filteredJobs.length, recipients);

  return NextResponse.json({
    ok: true,
    totalFetched: allJobs.length,
    totalMatched: filteredJobs.length,
  });
}
