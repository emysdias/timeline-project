import { useState } from "react";
import initialData from "../../data/timelineItems";
import { Toolbar } from "../../components/Toolbar/Toolbar";
import { Timeline } from "../../components/Timeline/Timeline";
import "../../styles.css";
import {
  DEFAULT_PX_PER_DAY,
  PX_PER_DAY_MAX,
  PX_PER_DAY_MIN,
  ZOOM_STEP,
} from "../../constants/numbers";

export default function Home() {
  const [items, setItems] = useState(initialData);
  const [pxPerDay, setPxPerDay] = useState(DEFAULT_PX_PER_DAY);

  const onZoomIn = () => setPxPerDay((z) => Math.min(PX_PER_DAY_MAX, z + ZOOM_STEP));
  const onZoomOut = () => setPxPerDay((z) => Math.max(PX_PER_DAY_MIN, z - ZOOM_STEP));
  const onReset = () => setItems(initialData);

  return (
    <div className="home">
      <Toolbar
        zoom={pxPerDay}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
      />
      <Timeline items={items} setItems={setItems} pxPerDay={pxPerDay} />
    </div>
  );
}
