// Places & Maps page — Dungeon Master view
const mapsStyles = {
  shell: { display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 },
  main:  { flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100vh", overflow: "hidden" },

  topbar: {
    display: "flex", alignItems: "center", gap: 16,
    padding: "16px 24px 14px",
    borderBottom: "1px solid var(--rule)",
    background: "linear-gradient(180deg, rgba(20,26,38,0.55), rgba(12,16,24,0.7))",
  },
  crumbs: {
    display: "flex", alignItems: "center", gap: 8,
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.4,
    textTransform: "uppercase", color: "var(--ink-dim)",
  },
  pageTitle: {
    fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1.05,
    color: "var(--ink)", fontWeight: 500, letterSpacing: 0.4, marginTop: 4,
  },
  ghostBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "10px 12px",
    fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.4,
    textTransform: "uppercase", color: "var(--ink-2)",
    border: "1px solid var(--rule-strong)", background: "rgba(20,26,38,0.5)",
  },
  goldBtn: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 16px",
    fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.4,
    textTransform: "uppercase", fontWeight: 600,
    color: "#0c1018",
    background: "linear-gradient(180deg, #d6b06a, #a8843e)",
    border: "1px solid rgba(201,162,91,0.7)",
    boxShadow: "0 6px 18px rgba(201,162,91,0.12), inset 0 1px 0 rgba(255,255,255,0.18)",
  },

  contentRow: { display: "flex", flex: 1, minHeight: 0 },

  // ---- Left management panel ----
  sidePanel: {
    width: 308, flex: "0 0 308px",
    borderRight: "1px solid var(--rule)",
    background: "linear-gradient(180deg, rgba(20,26,38,0.55), rgba(12,16,24,0.55))",
    display: "flex", flexDirection: "column", minHeight: 0,
  },
  sectionHead: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "14px 16px 10px",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.6,
    textTransform: "uppercase", color: "var(--ink-mute)",
    borderBottom: "1px solid var(--rule)",
  },
  mapsList: {
    padding: 12, display: "flex", flexDirection: "column", gap: 10,
    overflowY: "auto",
    maxHeight: 320,
  },
  mapCard: (active) => ({
    border: active ? "1.5px solid var(--gold)" : "1px solid var(--rule-strong)",
    background: active ? "rgba(201,162,91,0.07)" : "rgba(20,26,38,0.55)",
    boxShadow: active ? "0 6px 18px rgba(201,162,91,0.12), inset 0 0 0 1px rgba(201,162,91,0.15)" : "none",
    cursor: "pointer", padding: 8, display: "flex", gap: 10, alignItems: "center",
  }),
  mapThumb: (tone) => ({
    width: 64, height: 48, flex: "0 0 64px",
    background: `linear-gradient(135deg, ${tone}, #6a553a)`,
    border: "1px solid #3a2d1a",
    position: "relative", overflow: "hidden",
  }),
  mapName: {
    fontFamily: "var(--serif)", fontSize: 14.5, color: "var(--ink)",
    lineHeight: 1.15, letterSpacing: 0.2,
  },
  mapMeta: {
    fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.2,
    textTransform: "uppercase", color: "var(--ink-dim)", marginTop: 3,
  },
  uploadBtn: {
    margin: "4px 12px 12px",
    padding: "10px 12px",
    border: "1px dashed var(--rule-strong)",
    background: "transparent",
    color: "var(--ink-2)",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.4,
    textTransform: "uppercase",
  },

  markersHead: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "12px 16px 10px",
    borderTop: "1px solid var(--rule)",
    borderBottom: "1px solid var(--rule)",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.6,
    textTransform: "uppercase", color: "var(--ink-mute)",
  },
  addMarkerBtn: {
    marginLeft: "auto",
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "5px 9px",
    fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.3,
    textTransform: "uppercase", fontWeight: 600,
    color: "#0c1018",
    background: "linear-gradient(180deg, #d6b06a, #a8843e)",
    border: "1px solid rgba(201,162,91,0.6)",
  },
  markersList: {
    flex: 1, minHeight: 0, overflowY: "auto",
    padding: "6px 0",
  },
  markerRow: (active) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 16px",
    borderBottom: "1px solid var(--rule)",
    background: active ? "linear-gradient(90deg, rgba(201,162,91,0.10), transparent 80%)" : "transparent",
    borderLeft: active ? "2px solid var(--gold)" : "2px solid transparent",
    cursor: "pointer",
  }),
  pinIndicator: (active, dmOnly) => ({
    width: 22, height: 22, flex: "0 0 22px",
    transform: "rotate(45deg)",
    background: dmOnly
      ? "linear-gradient(135deg, #2a1a1a, #5a2424)"
      : (active ? "linear-gradient(135deg, #e6c170, #a8843e)" : "linear-gradient(135deg, #2a3242, #1a2030)"),
    border: dmOnly ? "1px solid var(--crimson)" : (active ? "1px solid var(--gold)" : "1px solid var(--slate-blue)"),
    boxShadow: active ? "0 0 0 2px rgba(201,162,91,0.18)" : "none",
    display: "grid", placeItems: "center",
    color: dmOnly ? "var(--ink)" : (active ? "#0c1018" : "var(--ink)"),
    fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700,
  }),
  pinIndicatorNum: { transform: "rotate(-45deg)", lineHeight: 1 },
  markerLabel: {
    fontFamily: "var(--serif)", fontSize: 14.5, color: "var(--ink)",
    lineHeight: 1.1, letterSpacing: 0.2,
  },
  markerSub: {
    display: "flex", alignItems: "center", gap: 6,
    fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.2,
    textTransform: "uppercase", color: "var(--ink-dim)",
    marginTop: 4,
  },
  dmTag: {
    fontFamily: "var(--mono)", fontSize: 8.5, letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "var(--crimson)",
    border: "1px solid rgba(138,58,58,0.5)",
    background: "rgba(138,58,58,0.10)",
    padding: "1px 5px",
  },
  shareDot: {
    display: "inline-flex", alignItems: "center", gap: 4,
    color: "var(--slate-blue)",
  },

  // ---- Canvas ----
  canvasWrap: {
    flex: 1, minWidth: 0,
    position: "relative",
    background: "radial-gradient(700px 400px at 60% 40%, #1a2030, #0a0e15 70%)",
    overflow: "hidden",
  },
  canvasBar: {
    position: "absolute", top: 14, left: 14, right: 14,
    display: "flex", alignItems: "center", gap: 10, zIndex: 4,
    pointerEvents: "none",
  },
  canvasBarPill: {
    pointerEvents: "auto",
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "8px 12px",
    background: "rgba(12,16,24,0.85)",
    border: "1px solid var(--rule-strong)",
    backdropFilter: "blur(6px)",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.4,
    textTransform: "uppercase", color: "var(--ink-2)",
  },
  parchmentFrame: {
    position: "absolute", inset: 24,
    border: "1px solid #3a2d1a",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.6)," +
      "inset 0 0 0 6px rgba(58,45,26,0.35)," +
      "inset 0 0 0 9px rgba(232,226,210,0.04)",
    overflow: "hidden",
  },

  // Pin on the map
  pin: (selected, dmOnly) => ({
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: 26, height: 26,
    cursor: "pointer",
    zIndex: selected ? 6 : 3,
  }),
  pinDiamond: (selected, dmOnly) => ({
    position: "absolute", inset: 0,
    transform: "rotate(45deg)",
    background: dmOnly
      ? "linear-gradient(135deg, #2a1a1a, #5a2424)"
      : (selected
          ? "linear-gradient(135deg, #efcf80, #a8843e)"
          : "linear-gradient(135deg, #2a3a52, #15202e)"),
    border: dmOnly ? "1.5px solid #c9a25b" : (selected ? "1.5px solid #efcf80" : "1.5px solid #c9a25b"),
    boxShadow: selected
      ? "0 0 0 3px rgba(201,162,91,0.25), 0 0 22px rgba(201,162,91,0.55)"
      : "0 2px 8px rgba(0,0,0,0.5)",
    animation: selected ? "pinPulse 2.8s ease-in-out infinite" : "none",
  }),
  pinDot: (dmOnly) => ({
    position: "absolute", inset: "40% 40%",
    background: dmOnly ? "#c9a25b" : "#e8e2d2",
    transform: "rotate(45deg)",
  }),
  pinNum: {
    position: "absolute", inset: 0,
    display: "grid", placeItems: "center",
    fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700,
    color: "#0c1018",
  },
  pinLabel: {
    position: "absolute",
    top: "calc(100% + 8px)", left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(12,16,24,0.92)",
    border: "1px solid var(--rule-strong)",
    padding: "3px 8px",
    fontFamily: "var(--serif)", fontSize: 12.5, fontStyle: "italic",
    color: "var(--ink)",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },

  // Zoom + grid floating controls
  floatControls: {
    position: "absolute", bottom: 36, right: 36,
    display: "flex", flexDirection: "column",
    background: "rgba(12,16,24,0.85)",
    border: "1px solid var(--rule-strong)",
    backdropFilter: "blur(6px)",
    zIndex: 4,
  },
  floatBtn: {
    width: 36, height: 36, display: "grid", placeItems: "center",
    color: "var(--ink-2)",
    borderBottom: "1px solid var(--rule)",
  },
  gridToggle: {
    position: "absolute", bottom: 36, left: 36,
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "8px 12px",
    background: "rgba(12,16,24,0.85)",
    border: "1px solid var(--rule-strong)",
    backdropFilter: "blur(6px)",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.4,
    textTransform: "uppercase", color: "var(--ink-2)",
    zIndex: 4,
  },
  gridSwitch: (on) => ({
    width: 22, height: 12, padding: 1,
    background: on ? "rgba(201,162,91,0.45)" : "rgba(232,226,210,0.10)",
    border: "1px solid " + (on ? "rgba(201,162,91,0.6)" : "var(--rule-strong)"),
    display: "flex", alignItems: "center",
  }),
  gridKnob: (on) => ({
    width: 8, height: 8,
    background: on ? "var(--gold)" : "var(--ink-mute)",
    transform: on ? "translateX(10px)" : "translateX(0)",
    transition: "transform .14s",
  }),
};

// ---- Marker pin used on the canvas ----
function MapPin({ marker, selected, onClick, style }) {
  return (
    <div style={{ ...mapsStyles.pin(selected, marker.dmOnly), ...style }} onClick={onClick}>
      <div style={mapsStyles.pinDiamond(selected, marker.dmOnly)}/>
      <div style={mapsStyles.pinNum}>{marker.n}</div>
      {!selected && (
        <div style={mapsStyles.pinLabel}>
          {marker.label}{marker.dmOnly && <span style={{ color: "var(--crimson)", marginLeft: 6, fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.2 }}> · DM</span>}
        </div>
      )}
    </div>
  );
}

// ---- Marker detail popover ----
const popStyles = {
  pop: (flipLeft) => ({
    position: "absolute",
    transform: flipLeft
      ? "translate(calc(-100% - 24px), -50%)"
      : "translate(24px, -50%)",
    width: 320,
    background: "linear-gradient(180deg, rgba(26,32,48,0.98), rgba(12,16,24,0.98))",
    border: "1px solid var(--rule-strong)",
    boxShadow: "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(232,226,210,0.05)",
    color: "var(--ink)",
    zIndex: 10,
  }),
  popArrow: (flipLeft) => ({
    position: "absolute",
    left: flipLeft ? "auto" : -7,
    right: flipLeft ? -7 : "auto",
    top: "50%",
    width: 12, height: 12,
    background: "rgba(26,32,48,0.98)",
    borderLeft: flipLeft ? "none" : "1px solid var(--rule-strong)",
    borderBottom: flipLeft ? "none" : "1px solid var(--rule-strong)",
    borderRight: flipLeft ? "1px solid var(--rule-strong)" : "none",
    borderTop: flipLeft ? "1px solid var(--rule-strong)" : "none",
    transform: "translateY(-50%) rotate(45deg)",
  }),
  popHead: {
    padding: "14px 16px 10px",
    borderBottom: "1px solid var(--rule)",
  },
  popTitle: {
    fontFamily: "var(--serif)", fontSize: 20, color: "var(--ink)",
    lineHeight: 1.1, letterSpacing: 0.3,
  },
  popMeta: {
    display: "flex", alignItems: "center", gap: 8,
    fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.4,
    textTransform: "uppercase", color: "var(--ink-dim)",
    marginTop: 6,
  },
  popBody: { padding: "10px 16px 14px" },
  fieldLabel: {
    fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5,
    textTransform: "uppercase", color: "var(--ink-dim)",
    marginBottom: 5,
  },
  notes: {
    fontFamily: "var(--serif)", fontSize: 14, lineHeight: 1.5,
    color: "var(--ink-2)", fontStyle: "italic",
    background: "rgba(20,26,38,0.6)",
    border: "1px solid var(--rule)",
    padding: "10px 12px",
    minHeight: 60,
  },
  toggleRow: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 0",
    borderTop: "1px solid var(--rule)",
  },
  toggle: (on) => ({
    width: 30, height: 16, padding: 2,
    background: on ? "rgba(138,58,58,0.5)" : "rgba(232,226,210,0.10)",
    border: "1px solid " + (on ? "rgba(138,58,58,0.7)" : "var(--rule-strong)"),
    display: "flex", alignItems: "center",
    marginLeft: "auto",
  }),
  toggleKnob: (on) => ({
    width: 10, height: 10,
    background: on ? "#c9a25b" : "var(--ink-mute)",
    transform: on ? "translateX(14px)" : "translateX(0)",
    transition: "transform .14s",
  }),
  linkedField: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px 11px",
    border: "1px solid var(--rule-strong)",
    background: "rgba(20,26,38,0.6)",
    cursor: "pointer",
  },
  shareChip: (on, tone) => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 8px 4px 4px",
    border: "1px solid " + (on ? tone : "var(--rule-strong)"),
    background: on ? `${tone}1a` : "transparent",
    color: on ? "var(--ink)" : "var(--ink-mute)",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.2,
    textTransform: "uppercase",
    cursor: "pointer",
  }),
  shareDot: (tone) => ({
    width: 16, height: 16,
    background: tone, color: "var(--ink)",
    fontFamily: "var(--serif)", fontSize: 10, fontWeight: 600,
    display: "grid", placeItems: "center",
  }),
  popActions: {
    display: "flex", gap: 8, alignItems: "center",
    padding: "10px 16px",
    borderTop: "1px solid var(--rule)",
    background: "rgba(10,14,21,0.6)",
  },
  smallBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "7px 11px",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.4,
    textTransform: "uppercase",
    border: "1px solid var(--rule-strong)",
    background: "rgba(20,26,38,0.6)",
    color: "var(--ink-2)",
  },
  dangerBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "7px 11px",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.4,
    textTransform: "uppercase",
    border: "1px solid rgba(138,58,58,0.5)",
    color: "var(--crimson)",
    marginLeft: "auto",
  },
};

function MarkerPopover({ marker, pcs, onPatch, onClose, flipLeft }) {
  return (
    <div style={popStyles.pop(flipLeft)}>
      <div style={popStyles.popArrow(flipLeft)}/>
      <div style={popStyles.popHead}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 18, height: 18, flex: "0 0 18px",
            transform: "rotate(45deg)",
            background: marker.dmOnly ? "linear-gradient(135deg, #2a1a1a, #5a2424)" : "linear-gradient(135deg, #efcf80, #a8843e)",
            border: marker.dmOnly ? "1px solid var(--crimson)" : "1px solid var(--gold)",
          }}/>
          <div style={popStyles.popTitle}>{marker.label}</div>
          <button onClick={onClose} style={{ marginLeft: "auto", color: "var(--ink-mute)", padding: 4 }}>
            <I.X size={14}/>
          </button>
        </div>
        <div style={popStyles.popMeta}>
          <span>Marker {String(marker.n).padStart(2,"0")}</span>
          <span style={{ width: 4, height: 4, background: "var(--ink-dim)", transform: "rotate(45deg)" }}/>
          <span>{marker.kind}</span>
          {marker.dmOnly && (
            <React.Fragment>
              <span style={{ width: 4, height: 4, background: "var(--ink-dim)", transform: "rotate(45deg)" }}/>
              <span style={{ color: "var(--crimson)" }}>DM ONLY</span>
            </React.Fragment>
          )}
        </div>
      </div>
      <div style={popStyles.popBody}>
        <div style={popStyles.fieldLabel}>Notes</div>
        <div style={popStyles.notes}>{marker.notes}</div>

        <div style={{ ...popStyles.toggleRow, marginTop: 4 }}>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)" }}>DM Only</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.2, color: "var(--ink-dim)", textTransform: "uppercase", marginTop: 2 }}>
              Hidden from player view
            </div>
          </div>
          <button style={popStyles.toggle(marker.dmOnly)} onClick={() => onPatch({ dmOnly: !marker.dmOnly, sharedWith: !marker.dmOnly ? [] : marker.sharedWith })}>
            <span style={popStyles.toggleKnob(marker.dmOnly)}/>
          </button>
        </div>

        <div style={{ height: 12 }}/>

        <div style={popStyles.fieldLabel}>Linked Section</div>
        {marker.linkedSection ? (
          <div style={popStyles.linkedField}>
            <I.Book size={13} stroke="var(--gold)"/>
            <span style={{ flex: 1, fontFamily: "var(--serif)", fontSize: 13.5, color: "var(--ink)" }}>{marker.linkedSection}</span>
            <I.Chevron size={12} stroke="var(--ink-mute)"/>
          </div>
        ) : (
          <div style={{ ...popStyles.linkedField, color: "var(--ink-dim)" }}>
            <I.Link size={12} stroke="var(--ink-mute)"/>
            <span style={{ flex: 1, fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 13, color: "var(--ink-dim)" }}>Link a codex section…</span>
            <I.Plus size={12} stroke="var(--ink-mute)"/>
          </div>
        )}

        <div style={{ height: 14 }}/>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={popStyles.fieldLabel}>Share With</div>
          <div style={{ flex: 1, height: 1, background: "var(--rule)", marginBottom: 5 }}/>
          <div style={{ ...popStyles.fieldLabel, color: marker.dmOnly ? "var(--crimson)" : "var(--gold)" }}>
            {marker.dmOnly ? "Disabled" : `${marker.sharedWith.length}/${pcs.length}`}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, opacity: marker.dmOnly ? 0.4 : 1 }}>
          {pcs.map(pc => {
            const on = marker.sharedWith.includes(pc.id);
            return (
              <button key={pc.id}
                disabled={marker.dmOnly}
                onClick={() => {
                  const next = on ? marker.sharedWith.filter(x => x !== pc.id) : [...marker.sharedWith, pc.id];
                  onPatch({ sharedWith: next });
                }}
                style={popStyles.shareChip(on, pc.tone)}>
                <span style={popStyles.shareDot(pc.tone)}>{pc.initials}</span>
                {pc.name}
              </button>
            );
          })}
        </div>
      </div>

      <div style={popStyles.popActions}>
        <button style={popStyles.smallBtn}><I.Edit size={11}/> Edit</button>
        <button style={popStyles.smallBtn}><I.Link size={11}/> Reposition</button>
        <button style={popStyles.dangerBtn}><I.Trash size={11} stroke="var(--crimson)"/> Delete</button>
      </div>
    </div>
  );
}

// ---- Main app ----
function MapsApp() {
  const { MAPS, PCS, MARKERS } = window.CC_MAPS;
  const [activeMapId, setActiveMapId] = React.useState("eldrune");
  const [markers, setMarkers] = React.useState(MARKERS);
  const [selectedId, setSelectedId] = React.useState("mk2"); // The Sundered Spire — DM only, linked
  const [showGrid, setShowGrid] = React.useState(true);
  const [zoom, setZoom] = React.useState(100);

  const selected = markers.find(m => m.id === selectedId);
  const activeMap = MAPS.find(m => m.id === activeMapId);

  function patchSelected(p) {
    setMarkers(markers.map(m => m.id === selectedId ? { ...m, ...p } : m));
  }

  return (
    <div style={mapsStyles.shell}>
      <Sidebar active="places"/>
      <div style={mapsStyles.main}>

        {/* ---- Topbar ---- */}
        <div style={mapsStyles.topbar}>
          <div>
            <div style={mapsStyles.crumbs}>
              <span>The Sundered Crown</span>
              <I.Chevron size={11} stroke="var(--ink-dim)"/>
              <span style={{ color: "var(--gold)" }}>Places &amp; Maps</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <h1 style={mapsStyles.pageTitle}>Places &amp; Maps</h1>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.4, color: "var(--ink-dim)" }}>
                {MAPS.length} MAPS · {markers.length} MARKERS · {markers.filter(m => m.dmOnly).length} HIDDEN FROM PLAYERS
              </span>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button style={mapsStyles.ghostBtn}><I.Eye size={12}/> Player Preview</button>
            <button style={mapsStyles.goldBtn}><I.Plus size={13} stroke="#0c1018" strokeWidth={2.5}/> New Map</button>
          </div>
        </div>

        {/* ---- Content row ---- */}
        <div style={mapsStyles.contentRow}>

          {/* ---- Side panel: maps + markers ---- */}
          <aside style={mapsStyles.sidePanel}>
            <div style={mapsStyles.sectionHead}>
              <I.Map size={12} stroke="var(--gold)"/>
              <span>Campaign Maps</span>
              <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-dim)" }}>{MAPS.length}</span>
            </div>
            <div style={mapsStyles.mapsList}>
              {MAPS.map(m => (
                <div key={m.id} style={mapsStyles.mapCard(m.id === activeMapId)} onClick={() => setActiveMapId(m.id)}>
                  <div style={mapsStyles.mapThumb(m.thumbTone)}>
                    <ThumbArt id={m.id}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={mapsStyles.mapName}>{m.name}</div>
                    <div style={mapsStyles.mapMeta}>{m.sub}</div>
                    <div style={{ ...mapsStyles.mapMeta, color: "var(--ink-mute)", marginTop: 2 }}>
                      <I.Map size={9} style={{ verticalAlign: "-1px", marginRight: 4 }}/>
                      {m.markerCount} markers
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button style={mapsStyles.uploadBtn}>
              <I.Plus size={11} stroke="currentColor" strokeWidth={2}/> Upload Map
            </button>

            <div style={mapsStyles.markersHead}>
              <span>Markers</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-dim)", letterSpacing: 1.2 }}>· {activeMap.name.split(",")[0]}</span>
              <button style={mapsStyles.addMarkerBtn}>
                <I.Plus size={9} stroke="#0c1018" strokeWidth={2.5}/> Add
              </button>
            </div>
            <div style={mapsStyles.markersList}>
              {markers.map(m => {
                const active = m.id === selectedId;
                return (
                  <div key={m.id} style={mapsStyles.markerRow(active)} onClick={() => setSelectedId(m.id)}>
                    <div style={mapsStyles.pinIndicator(active, m.dmOnly)}>
                      <span style={mapsStyles.pinIndicatorNum}>{m.n}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={mapsStyles.markerLabel}>{m.label}</div>
                      <div style={mapsStyles.markerSub}>
                        {m.dmOnly ? (
                          <span style={mapsStyles.dmTag}>DM Only</span>
                        ) : (
                          <span style={mapsStyles.shareDot}>
                            <I.Users size={10} stroke="currentColor"/>
                            {m.sharedWith.length}/{PCS.length}
                          </span>
                        )}
                        {m.linkedSection && <I.Link size={10} stroke="var(--ink-mute)"/>}
                        <span style={{ marginLeft: "auto", color: "var(--ink-dim)" }}>{m.kind}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ---- Canvas ---- */}
          <div style={mapsStyles.canvasWrap}>
            {/* Top floating bar */}
            <div style={mapsStyles.canvasBar}>
              <div style={mapsStyles.canvasBarPill}>
                <I.Map size={11} stroke="var(--gold)"/>
                <span style={{ color: "var(--ink)", letterSpacing: 1.4 }}>{activeMap.name}</span>
                <span style={{ width: 4, height: 4, background: "var(--ink-dim)", transform: "rotate(45deg)" }}/>
                <span>{activeMap.updated.replace("Edited ", "EDITED ").toUpperCase()}</span>
              </div>
              <div style={{ ...mapsStyles.canvasBarPill, marginLeft: "auto" }}>
                <I.Users size={11} stroke="var(--slate-blue)"/>
                <span>{markers.filter(m => !m.dmOnly).length} VISIBLE TO PARTY</span>
              </div>
            </div>

            <div style={mapsStyles.parchmentFrame}>
              <ParchmentMap showGrid={showGrid}/>

              {/* Pins overlay — positioned in % of frame */}
              {markers.map(m => (
                <MapPin key={m.id} marker={m}
                        selected={m.id === selectedId}
                        onClick={() => setSelectedId(m.id)}
                        style={{ left: `${m.x*100}%`, top: `${m.y*100}%` }}/>
              ))}

            </div>

            {/* Popover anchored to selected pin — rendered OUTSIDE the parchment
                frame so it can extend past the framed map without being clipped.
                Position is relative to the canvas wrap; we offset by the 24px
                frame inset and compute x/y inside the inner area. The popover
                flips to the left side of the pin when the pin sits in the
                right half of the map. */}
            {selected && (() => {
              const flipLeft = selected.x > 0.55;
              return (
                <div style={{
                  position: "absolute",
                  left:  `calc(24px + (100% - 48px) * ${selected.x})`,
                  top:   `calc(24px + (100% - 48px) * ${selected.y})`,
                  zIndex: 9,
                  pointerEvents: "none",
                }}>
                  <div style={{ pointerEvents: "auto" }}>
                    <MarkerPopover marker={selected} pcs={PCS}
                                   flipLeft={flipLeft}
                                   onPatch={patchSelected}
                                   onClose={() => setSelectedId(null)}/>
                  </div>
                </div>
              );
            })()}

            {/* Grid toggle */}
            <button style={mapsStyles.gridToggle} onClick={() => setShowGrid(!showGrid)}>
              <I.Grid size={11} stroke={showGrid ? "var(--gold)" : "var(--ink-mute)"}/>
              <span style={{ color: showGrid ? "var(--ink)" : "var(--ink-mute)" }}>Coordinate Grid</span>
              <span style={mapsStyles.gridSwitch(showGrid)}>
                <span style={mapsStyles.gridKnob(showGrid)}/>
              </span>
            </button>

            {/* Zoom controls */}
            <div style={mapsStyles.floatControls}>
              <button style={mapsStyles.floatBtn} onClick={() => setZoom(Math.min(zoom + 10, 200))}>
                <I.Plus size={14}/>
              </button>
              <div style={{ ...mapsStyles.floatBtn, fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-mute)", letterSpacing: 1, cursor: "default" }}>
                {zoom}%
              </div>
              <button style={{ ...mapsStyles.floatBtn, borderBottom: "none" }} onClick={() => setZoom(Math.max(zoom - 10, 40))}>
                <span style={{ width: 12, height: 1.5, background: "currentColor", display: "block" }}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tiny iconographic thumbnails for the map list cards
function ThumbArt({ id }) {
  if (id === "eldrune") {
    return (
      <svg viewBox="0 0 64 48" style={{ display: "block", width: "100%", height: "100%" }}>
        <rect width="64" height="48" fill="#c8b485"/>
        <path d="M8 18 C 14 10, 26 10, 32 14 C 40 18, 50 14, 56 22 C 58 30, 50 36, 40 36 C 28 38, 14 36, 10 28 Z" fill="#a8956a" stroke="#3a2d1a" strokeWidth="0.8"/>
        <circle cx="20" cy="28" r="1.3" fill="#3a2d1a"/>
        <circle cx="42" cy="22" r="1.3" fill="#3a2d1a"/>
      </svg>
    );
  }
  if (id === "virelia") {
    return (
      <svg viewBox="0 0 64 48" style={{ display: "block", width: "100%", height: "100%" }}>
        <rect width="64" height="48" fill="#9eb1a3"/>
        <path d="M0 30 L 64 30" stroke="#3a2d1a" strokeWidth="0.6"/>
        <g fill="#3a2d1a">
          <rect x="10" y="22" width="3" height="8"/>
          <rect x="16" y="18" width="3" height="12"/>
          <rect x="22" y="20" width="3" height="10"/>
          <rect x="30" y="14" width="3" height="16"/>
          <rect x="38" y="22" width="3" height="8"/>
          <rect x="46" y="18" width="3" height="12"/>
          <rect x="52" y="22" width="3" height="8"/>
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 48" style={{ display: "block", width: "100%", height: "100%" }}>
      <rect width="64" height="48" fill="#5e5247"/>
      <g stroke="#c8b485" strokeWidth="1" fill="none">
        <path d="M10 12 L 54 12 L 54 36 L 10 36 Z"/>
        <path d="M22 12 L 22 24 L 32 24 L 32 36"/>
        <path d="M42 12 L 42 28 L 32 28"/>
      </g>
    </svg>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MapsApp/>);
