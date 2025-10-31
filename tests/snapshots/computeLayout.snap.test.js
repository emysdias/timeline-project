import { describe, it, expect } from "@jest/globals";
import initialData from "../../src/data/timelineItems";
import { computeLayout } from "../../src/utils/layout";

describe("computeLayout snapshot", () => {
  it("matches snapshot for sample data", () => {
    const layout = computeLayout(initialData);
    expect({
      lanesCount: layout.lanesCount,
      minDay: layout.minDay,
      maxDay: layout.maxDay,
      placed: layout.placed.map((p) => ({
        id: p.id,
        lane: p.lane,
        startDay: p.startDay,
        endDay: p.endDay,
        name: p.name,
      })),
    }).toMatchSnapshot();
  });
});
