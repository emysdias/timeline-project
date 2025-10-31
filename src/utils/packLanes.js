import { toEpochDay } from "./dateUtils";

export function packLanes(items) {
  const sorted = [...items].sort(
    (a, b) => toEpochDay(a.start) - toEpochDay(b.start)
  );
  const lanes = [];

  for (const item of sorted) {
    if (item.isDragging) {
      lanes.push([item]);
      continue;
    }

    const itemStart = toEpochDay(item.start);
    let placed = false;
    for (const lane of lanes) {
      if (lane.some((i) => i.isDragging)) continue;

      const last = lane[lane.length - 1];
      const lastEnd = toEpochDay(last.end);
      if (lastEnd < itemStart) {
        lane.push(item);
        placed = true;
        break;
      }
    }
    if (!placed) lanes.push([item]);
  }
  return lanes;
}
