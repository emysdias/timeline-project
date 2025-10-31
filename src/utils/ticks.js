import { fromEpochDay } from "./dateUtils";
import {
  MS_PER_DAY,
  MONTH_INDEX_MAX,
  PAD_MONTH_WIDTH,
} from "../constants/numbers";

export function monthTicks(minDay, maxDay) {
  const first = new Date(fromEpochDay(minDay) + "T00:00:00Z");
  const last = new Date(fromEpochDay(maxDay) + "T00:00:00Z");
  let y = first.getUTCFullYear();
  let m = first.getUTCMonth();
  const arr = [];
  while (
    y < last.getUTCFullYear() ||
    (y === last.getUTCFullYear() && m <= last.getUTCMonth())
  ) {
    const day = Date.UTC(y, m, 1) / MS_PER_DAY;
    const date = new Date(Date.UTC(y, m, 1));
    arr.push({
      day,
      label: `${y}-${String(m + 1).padStart(PAD_MONTH_WIDTH, "0")}-${String(
        date.getUTCDate()
      ).padStart(2, "0")}`,
    });
    m++;
    if (m > MONTH_INDEX_MAX) {
      m = 0;
      y++;
    }
  }
  return arr;
}
