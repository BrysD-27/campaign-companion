// Sessions list (left) and detail panel (right) for the Sessions page

const sxStyles = {
  // ============ Topbar / filters ============
  toolbar: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "14px 24px",
    borderBottom: "1px solid var(--rule)",
    background: "rgba(10,14,21,0.6)",
  },
  search: {
    flex: 1,
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 12px",
    background: "rgba(10,14,21,0.7)",
    border: "1px solid var(--rule-strong)",
  },
  searchInput: {
    flex: 1, background: "transparent", border: "none", outline: "none",
    fontSize: 13, color: "var(--ink)",
  },
  filters: {
    display: "flex", alignItems: "center", gap: 6,
    padding: "10px 24px",
    borderBottom: "1px solid var(--rule)",
    flexWrap: "wrap",
  },
  modeChip: (active) => ({
    fontFamily: "var(--mono)",
    fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase",
    padding: "5px 10px",
    border: active ? "1px solid var(--gold)" : "1px solid var(--rule-strong)",
    color: active ? "var(--gold)" : "var(--ink-2)",
    background: active ? "rgba(201,162,91,0.08)" : "transparent",
    cursor: "pointer",
  }),
  tagPickChip: (active, color) => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    fontFamily: "var(--mono)",
    fontSize: 10, letterSpacing: 1.1, textTransform: "uppercase",
    padding: "4px 8px 4px 6px",
    border: active ? `1px solid ${color}` : "1px solid var(--rule-strong)",
    color: active ? color : "var(--ink-2)",
    background: active ? `${color}1f` : "transparent",
    cursor: "pointer",
  }),
  tagDot: (color) => ({
    width: 6, height: 6, background: color, transform: "rotate(45deg)",
  }),
  divider: { width: 1, height: 18, background: "var(--rule)", margin: "0 6px" },

  // ============ Session list (left col) ============
  listCol: {
    width: 460, flex: "0 0 460px",
    borderRight: "1px solid var(--rule)",
    display: "flex", flexDirection: "column",
    minHeight: 0,
  },
  list: {
    overflow: "auto",
    padding: "8px 0 24px",
    flex: 1,
  },
  groupHead: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "14px 24px 6px",
  },
  groupTitle: {
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.6,
    textTransform: "uppercase", color: "var(--ink-dim)",
  },
  groupRule: { flex: 1, height: 1, background: "var(--rule)" },

  row: (active) => ({
    position: "relative",
    padding: "14px 24px 14px 22px",
    borderLeft: active ? "2px solid var(--gold)" : "2px solid transparent",
    background: active
      ? "linear-gradient(90deg, rgba(201,162,91,0.10), transparent 80%)"
      : "transparent",
    cursor: "pointer",
    borderBottom: "1px solid var(--rule)",
  }),
  rowHead: {
    display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4,
  },
  rowNo: {
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.4,
    color: "var(--ink-dim)",
  },
  rowTitle: {
    fontFamily: "var(--serif)", fontSize: 19, lineHeight: 1.15,
    color: "var(--ink)", fontWeight: 500, letterSpacing: 0.2,
    flex: 1,
  },
  rowDate: {
    fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-mute)",
    letterSpacing: 0.6,
  },
  rowMetaRow: {
    display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
    marginTop: 8,
  },
  rowExcerpt: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 13.5,
    color: "var(--ink-mute)",
    marginTop: 8,
    lineHeight: 1.45,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  npcStack: {
    display: "flex", alignItems: "center", gap: 0,
  },
  npcDot: (tone, idx) => ({
    width: 22, height: 22,
    display: "grid", placeItems: "center",
    background: `linear-gradient(135deg, ${tone}66, ${tone}22)`,
    border: `1px solid ${tone}88`,
    color: "var(--ink)",
    fontFamily: "var(--serif)",
    fontWeight: 600,
    fontSize: 9.5,
    marginLeft: idx === 0 ? 0 : -6,
    zIndex: 10 - idx,
  }),
  npcMore: {
    fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)",
    letterSpacing: 0.5,
    marginLeft: 6,
  },

  // ============ Detail (right col) ============
  detail: {
    flex: 1,
    display: "flex", flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
  },
  tabs: {
    display: "flex", alignItems: "center", gap: 4,
    padding: "0 24px",
    borderBottom: "1px solid var(--rule)",
    background: "rgba(10,14,21,0.5)",
  },
  tab: (active) => ({
    padding: "14px 4px 12px",
    margin: "0 14px 0 0",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: active ? "var(--ink)" : "var(--ink-mute)",
    borderBottom: active ? "2px solid var(--gold)" : "2px solid transparent",
    cursor: "pointer",
    fontWeight: active ? 600 : 500,
    display: "inline-flex", alignItems: "center", gap: 7,
  }),
  tabBadge: {
    fontFamily: "var(--mono)",
    fontSize: 9.5,
    color: "var(--ink-dim)",
    background: "rgba(232,226,210,0.06)",
    padding: "1px 6px",
    letterSpacing: 0.8,
  },
  body: {
    flex: 1, overflow: "auto",
    padding: "28px 32px 40px",
  },
  titleRow: {
    display: "flex", alignItems: "flex-start", gap: 14,
  },
  bigTitle: {
    fontFamily: "var(--serif)",
    fontSize: 36,
    lineHeight: 1.05,
    fontWeight: 500,
    color: "var(--ink)",
    letterSpacing: 0.4,
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    padding: 0,
  },
  sessionNoTag: {
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: 1.4,
    color: "var(--ink-dim)",
    marginBottom: 4,
  },
  metaInline: {
    display: "flex", alignItems: "center", gap: 18, marginTop: 14,
    flexWrap: "wrap",
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: 1,
    color: "var(--ink-mute)",
    textTransform: "uppercase",
  },
  metaItem: { display: "inline-flex", alignItems: "center", gap: 7 },
  metaSep: { width: 4, height: 4, background: "var(--ink-dim)", transform: "rotate(45deg)" },

  sectionHead: {
    display: "flex", alignItems: "center", gap: 10,
    marginTop: 30, marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.8,
    textTransform: "uppercase", color: "var(--ink-mute)",
  },
  sectionRule: { flex: 1, height: 1, background: "var(--rule)" },

  // ============ Mode stepper ============
  stepper: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr auto 1fr",
    alignItems: "center",
    border: "1px solid var(--rule-strong)",
    background: "rgba(10,14,21,0.4)",
    padding: 4,
    gap: 0,
  },
  stepBtn: (active, done, mode) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 14px",
    background: active ? `${modeColor(mode)}1f` : "transparent",
    border: active ? `1px solid ${modeColor(mode)}` : "1px solid transparent",
    color: active ? modeColor(mode) : (done ? "var(--ink-mute)" : "var(--ink-2)"),
    cursor: "pointer",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: active ? 600 : 500,
    justifyContent: "center",
  }),
  stepIndex: (active, done, mode) => ({
    width: 22, height: 22,
    display: "grid", placeItems: "center",
    border: `1px solid ${active ? modeColor(mode) : (done ? "var(--ink-mute)" : "var(--rule-strong)")}`,
    color: active ? modeColor(mode) : (done ? "var(--ink-mute)" : "var(--ink-dim)"),
    fontFamily: "var(--mono)",
    fontSize: 10,
    background: active ? "rgba(0,0,0,0.3)" : "transparent",
  }),
  stepDivider: (filled) => ({
    height: 1,
    minWidth: 16,
    background: filled ? "var(--gold)" : "var(--rule)",
  }),
  advance: {
    marginLeft: "auto",
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 12px",
    fontFamily: "var(--mono)",
    fontSize: 10.5, letterSpacing: 1.4, textTransform: "uppercase",
    color: "var(--gold)",
    border: "1px solid rgba(201,162,91,0.5)",
    background: "rgba(201,162,91,0.06)",
    cursor: "pointer",
    fontWeight: 600,
  },

  // ============ Tag chips on detail ============
  tagBadge: (color, removable) => ({
    display: "inline-flex", alignItems: "center", gap: 8,
    fontFamily: "var(--mono)",
    fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase",
    color: color,
    background: `${color}1a`,
    border: `1px solid ${color}66`,
    padding: removable ? "4px 6px 4px 10px" : "4px 10px",
  }),
  tagX: {
    width: 16, height: 16, display: "grid", placeItems: "center",
    color: "currentColor", opacity: 0.7, cursor: "pointer",
  },
  addTag: {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontFamily: "var(--mono)",
    fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase",
    color: "var(--gold)",
    border: "1px dashed rgba(201,162,91,0.4)",
    padding: "4px 10px",
    background: "transparent",
    cursor: "pointer",
  },

  // ============ Recap ============
  recapWrap: {
    border: "1px solid var(--rule-strong)",
    background: "rgba(10,14,21,0.4)",
  },
  recapBar: {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 10px",
    borderBottom: "1px solid var(--rule)",
    background: "rgba(20,26,38,0.5)",
  },
  recapBtn: {
    width: 26, height: 26, display: "grid", placeItems: "center",
    color: "var(--ink-2)",
  },
  aiBtn: {
    marginLeft: "auto",
    display: "inline-flex", alignItems: "center", gap: 7,
    padding: "5px 10px 5px 8px",
    fontFamily: "var(--mono)",
    fontSize: 10, letterSpacing: 1.3, textTransform: "uppercase",
    color: "var(--gold)",
    border: "1px solid rgba(201,162,91,0.45)",
    background: "rgba(201,162,91,0.06)",
    cursor: "pointer",
  },
  recapBody: {
    padding: "16px 20px 20px",
    fontFamily: "var(--serif)",
    fontSize: 15.5,
    lineHeight: 1.6,
    color: "var(--ink)",
    minHeight: 140,
    outline: "none",
    whiteSpace: "pre-wrap",
  },
  recapEmpty: {
    fontFamily: "var(--serif)", fontStyle: "italic",
    color: "var(--ink-dim)",
  },
  recapMeta: {
    display: "flex", alignItems: "center", gap: 14,
    padding: "8px 14px",
    borderTop: "1px solid var(--rule)",
    background: "rgba(20,26,38,0.4)",
    fontFamily: "var(--mono)",
    fontSize: 9.5,
    letterSpacing: 1.2,
    color: "var(--ink-dim)",
    textTransform: "uppercase",
  },
};

function modeColor(m) {
  return ({
    prep:     "#5a7a9c",
    live:     "#c9a25b",
    complete: "#7a9c5a",
  })[m] || "var(--ink-mute)";
}
function modeLabel(m) {
  return ({ prep: "Prep", live: "Live", complete: "Complete" })[m] || m;
}

function ModePill({ mode, size = "md" }) {
  const c = modeColor(mode);
  const s = size === "sm" ? { fontSize: 9.5, padding: "2px 7px 2px 6px", gap: 5 } : { fontSize: 10.5, padding: "3px 9px 3px 8px", gap: 6 };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: s.gap,
      fontFamily: "var(--mono)",
      letterSpacing: 1.3, textTransform: "uppercase",
      color: c,
      background: `${c}1a`,
      border: `1px solid ${c}66`,
      ...s,
      fontWeight: 600,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 6,
        background: c,
        boxShadow: mode === "live" ? `0 0 6px ${c}` : "none",
        animation: mode === "live" ? "ccPulse 1.6s ease-in-out infinite" : "none",
      }} />
      {modeLabel(mode)}
    </span>
  );
}

function TagBadge({ tagId, removable, onRemove, size = "md" }) {
  const t = window.CC_SESSIONS.SESSION_TAGS.find(x => x.id === tagId);
  if (!t) return null;
  const padding = size === "sm" ? "3px 8px" : (removable ? "4px 6px 4px 10px" : "4px 10px");
  const fs = size === "sm" ? 9.5 : 10.5;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      fontFamily: "var(--mono)",
      fontSize: fs, letterSpacing: 1.2, textTransform: "uppercase",
      color: t.color,
      background: `${t.color}1a`,
      border: `1px solid ${t.color}66`,
      padding,
    }}>
      <span style={{ width: 5, height: 5, background: t.color, transform: "rotate(45deg)" }} />
      {t.label}
      {removable && (
        <button style={{ width: 16, height: 16, display: "grid", placeItems: "center", color: "currentColor", opacity: 0.65, cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); onRemove?.(); }}>
          <I.X size={10} />
        </button>
      )}
    </span>
  );
}

function NpcStack({ ids, max = 4 }) {
  const npcs = window.CC_SESSIONS.NPCS;
  const shown = ids.slice(0, max);
  const extra = ids.length - shown.length;
  return (
    <div style={sxStyles.npcStack}>
      {shown.map((id, i) => {
        const n = npcs.find(x => x.id === id);
        if (!n) return null;
        return <div key={id} style={sxStyles.npcDot(n.tone, i)} title={n.name}>{n.initials}</div>;
      })}
      {extra > 0 && <span style={sxStyles.npcMore}>+{extra}</span>}
    </div>
  );
}

function SessionRow({ session, active, onClick }) {
  return (
    <div style={sxStyles.row(active)} onClick={onClick}>
      <div style={sxStyles.rowHead}>
        <span style={sxStyles.rowNo}>S{String(session.no).padStart(2, "0")}</span>
        <h3 style={sxStyles.rowTitle}>{session.title}</h3>
        <span style={sxStyles.rowDate}>{session.date}</span>
      </div>
      <div style={sxStyles.rowMetaRow}>
        <ModePill mode={session.mode} size="sm" />
        {session.tags.map(t => <TagBadge key={t} tagId={t} size="sm" />)}
      </div>
      {session.recap && <p style={sxStyles.rowExcerpt}>{session.recap}</p>}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
        <NpcStack ids={session.npcs} />
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)", letterSpacing: 0.8 }}>
          {session.npcs.length} NPC{session.npcs.length === 1 ? "" : "S"}
        </span>
        {session.duration && (
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)", letterSpacing: 0.8, marginLeft: "auto" }}>
            {session.duration === "in progress" ? "● IN PROGRESS" : session.duration.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}

function ModeStepper({ mode, onChange }) {
  const order = ["prep", "live", "complete"];
  const idx = order.indexOf(mode);
  return (
    <div style={sxStyles.stepper}>
      {order.map((m, i) => {
        const active = i === idx;
        const done = i < idx;
        return (
          <React.Fragment key={m}>
            <button style={sxStyles.stepBtn(active, done, m)} onClick={() => onChange(m)}>
              <span style={sxStyles.stepIndex(active, done, m)}>
                {done ? <I.Check size={10} stroke="var(--ink-mute)" strokeWidth={2.2} /> : (i + 1)}
              </span>
              {modeLabel(m)}
            </button>
            {i < order.length - 1 && <span style={sxStyles.stepDivider(i < idx)} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function TagPicker({ selected, onToggle, onClose }) {
  const [q, setQ] = React.useState("");
  const tags = window.CC_SESSIONS.SESSION_TAGS.filter(t => !q || t.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ marginTop: 10, border: "1px solid var(--rule-strong)", background: "rgba(10,14,21,0.6)", padding: 12, maxWidth: 460 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <I.Search size={13} stroke="var(--ink-mute)" />
        <input autoFocus placeholder="Search tags…" value={q} onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: "var(--ink)" }} />
        <button onClick={onClose}><I.X size={13} stroke="var(--ink-mute)" /></button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map(t => {
          const active = selected.includes(t.id);
          return (
            <button key={t.id} style={sxStyles.tagPickChip(active, t.color)} onClick={() => onToggle(t.id)}>
              <span style={sxStyles.tagDot(t.color)} />
              {t.label}
              {active && <I.Check size={10} stroke={t.color} strokeWidth={2.2} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OverviewTab({ session, onPatch }) {
  const [picker, setPicker] = React.useState(false);
  function toggleTag(id) {
    const has = session.tags.includes(id);
    onPatch({ tags: has ? session.tags.filter(t => t !== id) : [...session.tags, id] });
  }
  return (
    <div style={sxStyles.body}>
      <div style={sxStyles.sessionNoTag}>SESSION {String(session.no).padStart(2, "0")} · {session.mode === "live" ? "RECORDING" : "DRAFT"}</div>
      <div style={sxStyles.titleRow}>
        <input
          style={sxStyles.bigTitle}
          value={session.title}
          onChange={(e) => onPatch({ title: e.target.value })}
        />
        <button style={{ width: 32, height: 32, display: "grid", placeItems: "center", color: "var(--ink-mute)", border: "1px solid var(--rule-strong)" }} title="Edit">
          <I.Edit size={13} />
        </button>
      </div>
      <div style={sxStyles.metaInline}>
        <span style={sxStyles.metaItem}><I.Calendar size={12} stroke="var(--ink-mute)" /> {session.date}</span>
        <span style={sxStyles.metaSep} />
        <span>Created {session.created}</span>
        <span style={sxStyles.metaSep} />
        <span style={sxStyles.metaItem}>
          <I.Users size={12} stroke="var(--ink-mute)" /> {session.pcs.length} PC · {session.npcs.length} NPC
        </span>
        {session.duration && <React.Fragment>
          <span style={sxStyles.metaSep} />
          <span>{session.duration === "in progress" ? "● IN PROGRESS" : `Ran ${session.duration}`}</span>
        </React.Fragment>}
      </div>

      {/* Mode stepper */}
      <div style={sxStyles.sectionHead}>
        <span style={sxStyles.sectionTitle}>Session Mode</span>
        <span style={sxStyles.sectionRule} />
        {session.mode !== "complete" && (
          <button
            style={sxStyles.advance}
            onClick={() => onPatch({ mode: session.mode === "prep" ? "live" : "complete" })}
          >
            Advance to {session.mode === "prep" ? "Live" : "Complete"}
            <I.Chevron size={11} />
          </button>
        )}
      </div>
      <ModeStepper mode={session.mode} onChange={(m) => onPatch({ mode: m })} />

      {/* Tags */}
      <div style={sxStyles.sectionHead}>
        <span style={sxStyles.sectionTitle}>Tags</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)" }}>{session.tags.length}</span>
        <span style={sxStyles.sectionRule} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {session.tags.map(t => (
          <TagBadge key={t} tagId={t} removable onRemove={() => toggleTag(t)} />
        ))}
        <button style={sxStyles.addTag} onClick={() => setPicker(!picker)}>
          <I.Plus size={11} /> Add Tag
        </button>
      </div>
      {picker && <TagPicker selected={session.tags} onToggle={toggleTag} onClose={() => setPicker(false)} />}

      {/* Recap */}
      <div style={sxStyles.sectionHead}>
        <span style={sxStyles.sectionTitle}>Recap</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)" }}>
          {session.recap ? `${session.recap.split(" ").length} words` : "empty"}
        </span>
        <span style={sxStyles.sectionRule} />
      </div>
      <div style={sxStyles.recapWrap}>
        <div style={sxStyles.recapBar}>
          <button style={sxStyles.recapBtn}><I.Heading size={13} /></button>
          <button style={sxStyles.recapBtn}><I.Bold size={13} /></button>
          <button style={sxStyles.recapBtn}><I.Italic size={13} /></button>
          <button style={sxStyles.recapBtn}><I.Quote size={13} /></button>
          <span style={{ width: 1, height: 14, background: "var(--rule)", margin: "0 6px" }} />
          <button style={sxStyles.recapBtn}><I.List size={13} /></button>
          <button style={sxStyles.recapBtn}><I.Link size={13} /></button>
          <button style={sxStyles.aiBtn} title="Draft a recap from the session log">
            <SparkleIcon /> Generate with AI
          </button>
        </div>
        <div
          style={sxStyles.recapBody}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onPatch({ recap: e.currentTarget.innerText })}
        >
          {session.recap || (
            <span style={sxStyles.recapEmpty}>
              Begin the recap, or pull a draft from the session log…
            </span>
          )}
        </div>
        <div style={sxStyles.recapMeta}>
          <span>SAVED · 2 MIN AGO</span>
          <span style={{ width: 4, height: 4, background: "var(--ink-dim)", transform: "rotate(45deg)" }} />
          <span>VISIBLE TO PARTY {session.mode === "complete" ? "ON PUBLISH" : "AFTER SESSION"}</span>
          <span style={{ marginLeft: "auto" }}>MARKDOWN OK</span>
        </div>
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/>
      <path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z" opacity="0.7"/>
    </svg>
  );
}

function PlaceholderTab({ label, hint }) {
  return (
    <div style={{ ...sxStyles.body, display: "grid", placeItems: "center", textAlign: "center", color: "var(--ink-dim)" }}>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, color: "var(--ink-mute)", marginBottom: 8 }}>
          {label}
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.4 }}>{hint}</div>
      </div>
    </div>
  );
}

window.SX = sxStyles;
window.SessionRow = SessionRow;
window.ModePill = ModePill;
window.TagBadge = TagBadge;
window.NpcStack = NpcStack;
window.OverviewTab = OverviewTab;
window.PlaceholderTab = PlaceholderTab;
window.modeColor = modeColor;
window.modeLabel = modeLabel;
