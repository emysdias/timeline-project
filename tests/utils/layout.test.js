import { describe, it, expect } from "@jest/globals";
import { computeLayout } from "../../src/utils/layout";
import { fromEpochDay } from "../../src/utils/dateUtils";

describe("computeLayout", () => {
  it("given items across months when computing layout then returns placed with min/max and lanesCount", () => {
    const items = [
      { id: 1, start: "2021-02-01", end: "2021-02-03", name: "A" },
      { id: 2, start: "2021-02-04", end: "2021-02-05", name: "B" },
      { id: 3, start: "2021-02-02", end: "2021-02-06", name: "C" },
    ];
    const { placed, lanesCount, minDay, maxDay } = computeLayout(items);
    expect(lanesCount).toBe(2);
    expect(fromEpochDay(minDay)).toBe("2021-02-01");
    expect(fromEpochDay(maxDay)).toBe("2021-02-06");
    expect(placed).toHaveLength(3);
    expect(placed.every((p) => Number.isInteger(p.lane))).toBe(true);
  });

  it("given no items when computing layout then returns empty placed and sane min/max", () => {
    const result = computeLayout([]);
    expect(result.placed).toEqual([]);
    expect(result.lanesCount).toBe(0);
    expect(Number.isInteger(result.minDay)).toBe(true);
    expect(Number.isInteger(result.maxDay)).toBe(true);
  });
});
