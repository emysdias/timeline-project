import { describe, it, expect } from "@jest/globals";
import { toEpochDay } from "../../src/utils/dateUtils";
import { makeUpdateById } from "../../src/utils/updaters";

describe("makeUpdateById", () => {
  it("given an id and partial fields when updating then returns a new array with the item updated", () => {
    let items = [
      { id: 1, start: "2021-02-01", end: "2021-02-02", name: "A" },
      { id: 2, start: "2021-02-03", end: "2021-02-03", name: "B" },
    ];
    const setItems = (updater) => {
      items = updater(items);
    };
    const updateById = makeUpdateById(setItems);

    const s = toEpochDay("2021-02-05");
    const e = toEpochDay("2021-02-07");
    updateById(2, { startDay: s, endDay: e });
    expect(items[1]).toMatchObject({
      start: "2021-02-05",
      end: "2021-02-07",
    });

    updateById(1, { name: "AAA" });
    expect(items[0].name).toBe("AAA");
  });
});
