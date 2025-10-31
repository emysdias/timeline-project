import { useState, useRef, useEffect, useCallback } from "react";
import { fromEpochDay } from "../utils/dateUtils";

export function useTimelineItem({ item, pxPerDay, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(item.name);
  const [dragging, setDragging] = useState(false);
  const [originalPosition, setOriginalPosition] = useState(null);

  const dragRef = useRef(null);
  const lastDeltaRef = useRef(0);

  const title = `${item.name} • ${fromEpochDay(item.startDay)} → ${fromEpochDay(
    item.endDay
  )}`;

  const startDrag = useCallback(
    (mode, clientX) => {
      setOriginalPosition({
        start: item.start,
        end: item.end,
      });
      
      dragRef.current = {
        mode,
        startClientX: clientX,
        origStart: item.startDay,
        origEnd: item.endDay,
      };
      lastDeltaRef.current = 0;
      setDragging(true);
      onUpdate(item.id, { isDragging: true });
    },
    [item.startDay, item.endDay, item.start, item.end, item.id, onUpdate]
  );

  const updateDrag = useCallback(
    (clientX) => {
      const drag = dragRef.current;
      if (!drag) return;

      const dx = clientX - drag.startClientX;
      const deltaDays = Math.round(dx / pxPerDay);
      if (deltaDays === lastDeltaRef.current) return;
      lastDeltaRef.current = deltaDays;

      if (deltaDays === 0) return;

      if (drag.mode === "move") {
        onUpdate(item.id, {
          startDay: drag.origStart + deltaDays,
          endDay: drag.origEnd + deltaDays,
          originalLane: drag.origLane,
        });
      } else if (drag.mode === "resize-start") {
        const newStart = Math.min(drag.origEnd, drag.origStart + deltaDays);
        onUpdate(item.id, { startDay: newStart });
      } else if (drag.mode === "resize-end") {
        const newEnd = Math.max(drag.origStart, drag.origEnd + deltaDays);
        onUpdate(item.id, { endDay: newEnd });
      }
    },
    [item.id, onUpdate, pxPerDay]
  );

  const endDrag = useCallback(() => {
    if (originalPosition) {
      onUpdate(item.id, {
        start: originalPosition.start,
        end: originalPosition.end,
        isDragging: false
      });
      setOriginalPosition(null);
    }
    dragRef.current = null;
    setDragging(false);
  }, []);

  useEffect(() => {
    function onPointerMove(e) {
      if (!dragRef.current) return;
      updateDrag(e.clientX);
    }
    function onPointerUp() {
      if (!dragRef.current) return;
      endDrag();
    }
    if (dragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp, { once: true });
      return () => {
        window.removeEventListener("pointermove", onPointerMove);
      };
    }
  }, [dragging, updateDrag, endDrag]);

  const handleBarPointerDown = (e) => {
    e.preventDefault();
    startDrag("move", e.clientX);
  };
  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag("resize-start", e.clientX);
  };
  const handleResizeEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag("resize-end", e.clientX);
  };

  const beginEdit = () => {
    setTempName(item.name);
    setEditing(true);
  };
  const commitName = () => {
    const name = (tempName || "").trim() || item.name;
    setEditing(false);
    if (name !== item.name) onUpdate(item.id, { name });
  };

  return {
    editing,
    tempName,
    setTempName,
    dragging,
    title,
    handleBarPointerDown,
    handleResizeStart,
    handleResizeEnd,
    beginEdit,
    commitName,
  };
}
