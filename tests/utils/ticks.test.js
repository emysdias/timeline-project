import { describe, it, expect } from "@jest/globals";
import { monthTicks } from "../../src/utils/ticks";
import { toEpochDay } from "../../src/utils/dateUtils";

describe("monthTicks", () => {
  it("given a date range when generating ticks then returns correct month labels", () => {
    const minDay = toEpochDay("2021-01-01");
    const maxDay = toEpochDay("2021-03-31");
    const ticks = monthTicks(minDay, maxDay);
    
    expect(ticks).toHaveLength(3);
    expect(ticks[0].label).toMatch(/^2021-01-\d{2}$/);
    expect(ticks[1].label).toMatch(/^2021-02-\d{2}$/);
    expect(ticks[2].label).toMatch(/^2021-03-\d{2}$/);
  });

  it("given a date range crossing year boundary when generating ticks then handles year transition", () => {
    const minDay = toEpochDay("2021-12-01");
    const maxDay = toEpochDay("2022-02-01");
    const ticks = monthTicks(minDay, maxDay);
    
    expect(ticks).toHaveLength(3);
    expect(ticks[0].label).toMatch(/^2021-12-\d{2}$/);
    expect(ticks[1].label).toMatch(/^2022-01-\d{2}$/);
    expect(ticks[2].label).toMatch(/^2022-02-\d{2}$/);
  });

  it("given a single month range when generating ticks then returns one tick", () => {
    const minDay = toEpochDay("2021-05-01");
    const maxDay = toEpochDay("2021-05-31");
    const ticks = monthTicks(minDay, maxDay);
    
    expect(ticks).toHaveLength(1);
    expect(ticks[0].label).toMatch(/^2021-05-\d{2}$/);
  });
});