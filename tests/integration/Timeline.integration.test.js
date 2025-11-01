import { renderToStaticMarkup } from "react-dom/server";
import { Timeline } from "../../src/components/Timeline/Timeline.jsx";
import sampleData from "../../src/data/timelineItems.js";

test("Timeline integration render matches snapshot", () => {
  const items = sampleData
    .slice(0, 4)
    .map((it, i) => ({ ...it, id: String(it.id || i) }));
  const html = renderToStaticMarkup(
    <Timeline items={items} setItems={() => {}} pxPerDay={8} />
  );
  expect(html).toMatchSnapshot();
});
