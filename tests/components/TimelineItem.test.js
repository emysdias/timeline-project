import { renderToStaticMarkup } from "react-dom/server";
import { TimelineItem } from "../../src/components/TimelineItem/TimelineItem.jsx";

const item = { id: "x", name: "Label", start: "2021-02-20", end: "2021-02-23" };

test("TimelineItem renders and snapshot is stable", () => {
  const html = renderToStaticMarkup(
    <TimelineItem
      item={item}
      laneTop={0}
      x={10}
      width={100}
      pxPerDay={10}
      onUpdate={() => {}}
    />
  );
  expect(html).toMatchSnapshot();
});
