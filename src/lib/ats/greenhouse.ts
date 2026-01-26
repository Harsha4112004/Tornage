export async function fetchGreenhouse(slug: string) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const data = await res.json();
    return data.jobs || [];
  } catch (err) {
    console.error("Greenhouse error:", slug, err);
    return [];
  }
}
