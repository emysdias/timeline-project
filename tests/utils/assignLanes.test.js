import { describe, it, expect } from "@jest/globals";
import { assignLanes } from "../../src/utils/assignLanes";

describe("assignLanes", () => {
  it("given non-overlapping items when assigning lanes then puts them in same lane", () => {
    const items = [
      { start: "2021-01-01", end: "2021-01-02", name: "A" },
      { start: "2021-01-03", end: "2021-01-04", name: "B" },
    ];
    const lanes = assignLanes(items);
    
    expect(lanes).toHaveLength(1);
    expect(lanes[0]).toHaveLength(2);
    expect(lanes[0].map(i => i.name)).toEqual(["A", "B"]);
  });

  it("given overlapping items when assigning lanes then puts them in different lanes", () => {
    const items = [
      { start: "2021-01-01", end: "2021-01-05", name: "A" },
      { start: "2021-01-02", end: "2021-01-03", name: "B" },
    ];
    const lanes = assignLanes(items);
    
    expect(lanes).toHaveLength(2);
    expect(lanes[0]).toHaveLength(1);
    expect(lanes[1]).toHaveLength(1);
    expect(lanes[0][0].name).toBe("A");
    expect(lanes[1][0].name).toBe("B");
  });

  it("given items with mixed overlaps when assigning lanes then optimizes lane usage", () => {
    const items = [
      { start: "2021-01-01", end: "2021-01-02", name: "A" },
      { start: "2021-01-02", end: "2021-01-04", name: "B" },
      { start: "2021-01-01", end: "2021-01-03", name: "C" },
    ];
    const lanes = assignLanes(items);
    
    expect(lanes).toHaveLength(3);
    expect(lanes[0].some((i) => i.name === "A")).toBe(true);
    expect(lanes[1].some((i) => i.name === "C")).toBe(true);
    expect(lanes[2].some((i) => i.name === "B")).toBe(true);
  });

  it("given empty array when assigning lanes then returns empty array", () => {
    const lanes = assignLanes([]);
    expect(lanes).toHaveLength(0);
  });

  it("given single item when assigning lanes then returns single lane", () => {
    const items = [
      { start: "2021-01-01", end: "2021-01-02", name: "A" },
    ];
    const lanes = assignLanes(items);
    
    expect(lanes).toHaveLength(1);
    expect(lanes[0]).toHaveLength(1);
    expect(lanes[0][0].name).toBe("A");
  });
});