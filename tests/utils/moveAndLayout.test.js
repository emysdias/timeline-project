import { describe, it, expect } from "@jest/globals";
import initialData from "../../src/data/timelineItems";
import { makeUpdateById } from "../../src/utils/updaters";
import { computeLayout } from "../../src/utils/layout";
import { toEpochDay } from "../../src/utils/dateUtils";

describe("move and layout integration", () => {
  it("moving an item updates layout and can change lanes", () => {
    let items = [...initialData];
    const setItems = (updater) => {
      items = updater(items);
    };
    const updateById = makeUpdateById(setItems);

    const before = computeLayout(items);
    const itemToMove = items.find((i) => i.id === 10); // Approve logo
    expect(itemToMove).toBeDefined();

    // move "Approve logo" 10 days earlier
    const newStart = toEpochDay(itemToMove.start) - 10;
    const newEnd = toEpochDay(itemToMove.end) - 10;
    updateById(itemToMove.id, { startDay: newStart, endDay: newEnd });

    const after = computeLayout(items);

    // Ensure item dates updated
    const moved = after.placed.find((p) => p.id === itemToMove.id);
    expect(moved.startDay).toBe(newStart);
    expect(moved.endDay).toBe(newEnd);

    // Lanes count may change; ensure layout still valid
    expect(Number.isInteger(after.lanesCount)).toBe(true);
    expect(after.minDay).toBeLessThanOrEqual(after.maxDay);
  });

  it("resizing an item updates start or end correctly", () => {
    let items = [...initialData];
    const setItems = (updater) => {
      items = updater(items);
    };
    const updateById = makeUpdateById(setItems);

    const item = items.find((i) => i.id === 1);
    expect(item).toBeDefined();

    const origStart = toEpochDay(item.start);
    const origEnd = toEpochDay(item.end);

    // shorten the item by moving end earlier 2 days
    updateById(item.id, { endDay: origEnd - 2 });
    let updated = items.find((i) => i.id === item.id);
    expect(toEpochDay(updated.end)).toBe(origEnd - 2);

    // extend the item by moving start earlier 3 days
    updateById(item.id, { startDay: origStart - 3 });
    updated = items.find((i) => i.id === item.id);
    expect(toEpochDay(updated.start)).toBe(origStart - 3);
  });
});