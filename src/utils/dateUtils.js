const DAY_MS = 24 * 60 * 60 * 1000;

export function toEpochDay(yyyy_mm_dd) {
  const [y, m, d] = yyyy_mm_dd.split("-").map(Number);
  const utc = Date.UTC(y, m - 1, d);
  return Math.floor(utc / DAY_MS);
}

export function fromEpochDay(day) {
  const date = new Date(day * DAY_MS);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function daysBetweenInclusive(startDay, endDay) {
  return Math.max(1, endDay - startDay + 1);
}

export function estimateLabelPx(label, { charPx = 7, paddingPx = 16 } = {}) {
  return Math.max(40, label.length * charPx + paddingPx);
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export const todayEpochDay = () => Math.floor(Date.now() / DAY_MS);
