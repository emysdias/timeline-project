export function Toolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
}) {
  return (
    <div className="toolbar">
      <strong>Timeline</strong>
      <span style={{ color: "#6b7280", fontSize: 12, marginLeft: 8 }}>
        Zoom Level: {zoom}
      </span>
      <button onClick={onZoomOut} title="Zoom out (-)">
        −
      </button>
      <button onClick={onZoomIn} title="Zoom in (+)">
        +
      </button>
      <button onClick={onReset} title="Fit to range">
        Reset
      </button>
      <div className="spacer" />
    </div>
  );
}
