export function isYesterday(dateStr: string | null) {
  if (!dateStr) return false;

  const jobDate = new Date(dateStr);
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  jobDate.setUTCHours(0, 0, 0, 0);
  yesterday.setUTCHours(0, 0, 0, 0);

  return jobDate.getTime() === yesterday.getTime();
}
