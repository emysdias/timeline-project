import { useMemo } from "react";
import { useTimelineItem } from "../../hooks/useTimelineItem";
import "../../styles.css";

export function TimelineItem({ item, laneTop, x, width, pxPerDay, onUpdate }) {
  const {
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
  } = useTimelineItem({ item, pxPerDay, onUpdate });

  const style = useMemo(
    () => ({
      transform: `translateX(${x}px)`,
      width: `${Math.max(6, width)}px`,
      top: `${laneTop}px`,
    }),
    [x, width, laneTop]
  );

  return (
    <div
      className={`item${dragging ? " dragging" : ""}`}
      style={style}
      title={title}
      onDoubleClick={beginEdit}
      onPointerDown={handleBarPointerDown}
    >
      <div className="resize-handle left" onPointerDown={handleResizeStart} />
      {editing ? (
        <input
          autoFocus
          className="inline-input"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onBlur={commitName}
          onKeyDown={(e) => (e.key === "Enter" ? commitName() : null)}
        />
      ) : (
        <div className="label">{item.name}</div>
      )}
      <div className="resize-handle right" onPointerDown={handleResizeEnd} />
    </div>
  );
}
