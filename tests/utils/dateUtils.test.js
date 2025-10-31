import { describe, it, expect } from "@jest/globals";
import {
  toEpochDay,
  fromEpochDay,
  daysBetweenInclusive,
  estimateLabelPx,
  clamp,
  todayEpochDay,
} from "../../src/utils/dateUtils";

describe("dateUtils", () => {
  it("given a YYYY-MM-DD when converting to epochDay and back then gets the same string", () => {
    const s = "2025-02-20";
    expect(fromEpochDay(toEpochDay(s))).toBe(s);
  });

  it("given start/end days when counting inclusive days then returns correct length", () => {
    expect(daysBetweenInclusive(10, 10)).toBe(1);
    expect(daysBetweenInclusive(10, 12)).toBe(3);
    expect(daysBetweenInclusive(12, 10)).toBe(1);
  });

  it("given labels of different sizes when estimating label px then respects min and grows with length", () => {
    const empty = estimateLabelPx("");
    const short = estimateLabelPx("abc");
    const long = estimateLabelPx("a".repeat(40));
    expect(empty).toBeGreaterThanOrEqual(40);
    expect(long).toBeGreaterThan(short);
  });

  it("given a value outside bounds when clamping then returns nearest bound", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });

  it("given the current time when calling todayEpochDay then returns a day number", () => {
    const t = todayEpochDay();
    expect(typeof t).toBe("number");
    expect(t).toBeGreaterThan(18000);
  });
});
