import { useMemo } from "react";
import { TimelineItem } from "../TimelineItem/TimelineItem";
import { todayEpochDay } from "../../utils/dateUtils";
import { computeLayout } from "../../utils/layout";
import { monthTicks } from "../../utils/ticks";
import {
  laneTop,
  toX,
  toW,
  contentWidth as getWidth,
} from "../../utils/geometry";
import { makeUpdateById } from "../../utils/updaters";
import "../../styles.css";

export function Timeline({ items, setItems, pxPerDay }) {
  const layout = useMemo(() => computeLayout(items), [items]);
  const ticks = useMemo(
    () => monthTicks(layout.minDay, layout.maxDay),
    [layout.minDay, layout.maxDay]
  );

  const width = getWidth(layout.minDay, layout.maxDay, pxPerDay);
  const toXPx = (day) => toX(day, layout.minDay, pxPerDay);
  const toWPx = (s, e) => toW(s, e, pxPerDay);
  const updateById = makeUpdateById(setItems);

  const today = todayEpochDay();
  const todayInRange = today >= layout.minDay && today <= layout.maxDay;
  const todayX = toXPx(today);

  const LANE_HEIGHT = 44;
  const LANE_GAP = 8;
  const lanesHeight = layout.lanesCount
    ? (layout.lanesCount - 1) * (LANE_HEIGHT + LANE_GAP) + LANE_HEIGHT
    : 0;

  return (
    <div className="timeline-wrapper">
      <div className="sidebar">
        <h3>Lanes</h3>
        {Array.from({ length: layout.lanesCount }).map((_, i) => (
          <div className="lane-label" key={i}>
            Lane {i + 1}
          </div>
        ))}
      </div>

      <div className="canvas">
        <div className="ruler" style={{ width }}>
          <div className="ruler-inner">
            {ticks.map((t) => (
              <div
                key={t.day}
                className="tick"
                style={{ left: toXPx(t.day) + "px" }}
              >
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <div className="lanes" style={{ width, height: lanesHeight }}>
          {todayInRange && (
            <div className="today-line" style={{ left: todayX }} />
          )}

          {Array.from({ length: layout.lanesCount }).map((_, i) => (
            <div
              className="lane"
              key={`lane-row-${i}`}
              style={{ top: laneTop(i) }}
            />
          ))}

          {layout.placed.map((it) => (
            <TimelineItem
              key={it.id}
              item={it}
              laneTop={laneTop(it.lane)}
              x={toXPx(it.startDay)}
              width={toWPx(it.startDay, it.endDay)}
              pxPerDay={pxPerDay}
              onUpdate={updateById}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
