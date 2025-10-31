import { fromEpochDay } from "./dateUtils";

export const makeUpdateById = (setItems) => (id, partial) => {
  setItems((prev) =>
    prev.map((it) => {
      if (it.id !== id) return it;
      return {
        ...it,
        ...(typeof partial.startDay === "number"
          ? { start: fromEpochDay(partial.startDay) }
          : {}),
        ...(typeof partial.endDay === "number"
          ? { end: fromEpochDay(partial.endDay) }
          : {}),
        ...(typeof partial.name === "string" ? { name: partial.name } : {}),
      };
    })
  );
};
