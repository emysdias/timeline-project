import { toEpochDay } from "./dateUtils";
import { packLanes } from "./packLanes";
import { MS_PER_DAY, INITIAL_LANES_COUNT } from "../constants/numbers";

export function computeLayout(items) {
  const lanes = packLanes(items);
  const placed = lanes.flatMap((laneItems, lane) =>
    laneItems.map((it) => ({
      ...it,
      lane: it.originalLane !== undefined ? it.originalLane : lane,
      startDay: toEpochDay(it.start),
      endDay: toEpochDay(it.end),
    }))
  );

  if (!placed.length) {
    const today = Math.floor(Date.now() / MS_PER_DAY);
    return {
      placed,
      lanesCount: INITIAL_LANES_COUNT,
      minDay: today,
      maxDay: today,
    };
  }

  const minDay = Math.min(...placed.map((p) => p.startDay));
  const maxDay = Math.max(...placed.map((p) => p.endDay));
  return { placed, lanesCount: lanes.length, minDay, maxDay };
}
