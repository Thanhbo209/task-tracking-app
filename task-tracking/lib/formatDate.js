export function formatDeadline(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    weekday: "short", // Mon
    day: "2-digit", // 12
    month: "short", // Jan
  });
}
