import { describe, it, expect } from "@jest/globals";
import { packLanes } from "../../src/utils/packLanes";

describe("packLanes", () => {
  it("given non-overlapping items when packing then reuses the same lane", () => {
    const items = [
      { id: 1, start: "2025-01-01", end: "2025-01-02" },
      { id: 2, start: "2025-01-03", end: "2025-01-04" },
    ];
    const lanes = packLanes(items);
    expect(lanes.length).toBe(1);
    expect(lanes[0].map((i) => i.id)).toEqual([1, 2]);
  });

  it("given overlapping items when packing then creates a new lane", () => {
    const items = [
      { id: 1, start: "2025-01-01", end: "2025-01-05" },
      { id: 2, start: "2025-01-03", end: "2025-01-04" },
    ];
    const lanes = packLanes(items);
    expect(lanes.length).toBe(2);
  });
});
