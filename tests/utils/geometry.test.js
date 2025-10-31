import { describe, it, expect } from "@jest/globals";
import { laneTop, toX, toW, contentWidth } from "../../src/utils/geometry";

describe("geometry", () => {
  it("given a lane index when computing laneTop then returns correct vertical offset", () => {
    expect(laneTop(0)).toBe(0);
    expect(laneTop(1)).toBe(52);
    expect(laneTop(2)).toBe(104);
  });

  it("given a day and minDay when calling toX then returns pixels from origin", () => {
    expect(toX(5, 0, 10)).toBe(50);
    expect(toX(0, 0, 10)).toBe(0);
  });

  it("given start and end days when calling toW then returns inclusive width in px", () => {
    expect(toW(0, 0, 10)).toBe(10);
    expect(toW(0, 2, 10)).toBe(30);
  });

  it("given a day range when calling contentWidth then returns width with right buffer", () => {
    expect(contentWidth(0, 9, 10)).toBe(10 * 10 + 200);
  });
});
