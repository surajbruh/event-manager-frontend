/**
 * Converts an ISO 8601 string into a clean, human-readable date and time.
 * @param isoString - The raw timestamp (e.g., "2026-11-08T10:00:00+05:30")
 * @returns An object containing various UI-ready formatted strings.
 */
export function formatEventDate(isoString: string) {
  const date = new Date(isoString);

  // 1. Compact / Ticket Badge style (e.g., "08 Nov 2026 • 10:00 AM")
  const compact = date
    .toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " on");

  // 2. Friendly / Event Details style (e.g., "Sunday, 08 Nov 2026 at 10:00 AM")
  const friendly = date
    .toLocaleString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " at");

  // 3. Dashboard Table style (e.g., "2026-11-08 | 10:00 AM")
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const time = date.toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const dashboard = `${yyyy}-${mm}-${dd} | ${time}`;

  return {
    compact,
    friendly,
    dashboard,
    rawDate: date,
  };
}

// Example usage:
// const formatted = formatEventDate("2026-11-08T10:00:00+05:30");
// console.log(formatted.friendly); // "Sunday, 08 Nov 2026 at 10:00 AM"
