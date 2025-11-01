import { renderToStaticMarkup } from "react-dom/server";
import { Timeline } from "../../src/components/Timeline/Timeline.jsx";

const sampleItems = [
  { id: "1", start: "2021-02-20", end: "2021-02-23", name: "Short task" },
  { id: "2", start: "2021-02-21", end: "2021-03-02", name: "Longer task" },
];

test("Timeline renders without crashing and matches snapshot", () => {
  const html = renderToStaticMarkup(
    <Timeline items={sampleItems} setItems={() => {}} pxPerDay={10} />
  );
  expect(html).toMatchSnapshot();
});
