export async function fetchAshby(slug: string) {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${slug}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const data = await res.json();
    return data.jobs || [];
  } catch (err) {
    console.error("Ashby error:", slug, err);
    return [];
  }
}
