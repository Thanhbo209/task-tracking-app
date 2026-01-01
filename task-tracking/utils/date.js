export function getDaysOfYear(year) {
  const days = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    days.push({
      date: d.toISOString().slice(0, 10),
      day: d.getDay(), // 0-6 (Sun-Sat)
    });
  }

  return days;
}
