import {
  LANE_HEIGHT,
  LANE_GAP,
  MIN_DURATION_DAYS,
  EXTRA_CONTENT_WIDTH,
} from "../constants/numbers";

export const laneTop = (lane) => lane * (LANE_HEIGHT + LANE_GAP);
export const toX = (day, minDay, pxPerDay) => (day - minDay) * pxPerDay;
export const toW = (startDay, endDay, pxPerDay) =>
  Math.max(MIN_DURATION_DAYS, endDay - startDay + 1) * pxPerDay;
export const contentWidth = (minDay, maxDay, pxPerDay) =>
  (maxDay - minDay + 1) * pxPerDay + EXTRA_CONTENT_WIDTH;
