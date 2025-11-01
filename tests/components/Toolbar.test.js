import { renderToStaticMarkup } from "react-dom/server";
import { Toolbar } from "../../src/components/Toolbar/Toolbar.jsx";

test("Toolbar renders and matches snapshot", () => {
  const html = renderToStaticMarkup(
    <Toolbar
      zoom={2}
      onZoomIn={() => {}}
      onZoomOut={() => {}}
      onReset={() => {}}
    />
  );
  expect(html).toMatchSnapshot();
});
