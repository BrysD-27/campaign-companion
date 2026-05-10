// Lore & Codex UI — three-pane: section tree | entry list | editor
const lxStyles = {
  // ============ Section tree (far left) ============
  treeCol: {
    width: 240, flex: "0 0 240px",
    borderRight: "1px solid var(--rule)",
    display: "flex", flexDirection: "column",
    background: "rgba(10,14,21,0.4)",
    minHeight: 0,
  },
  treeHead: {
    padding: "14px 16px 10px",
    borderBottom: "1px solid var(--rule)",
    display: "flex", alignItems: "center", gap: 8,
  },
  treeHeadTitle: {
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.6,
    textTransform: "uppercase", color: "var(--ink-mute)",
  },
  treeBody: { flex: 1, overflow: "auto", padding: "8px 0" },
  treeNode: (active, depth) => ({
    display: "flex", alignItems: "center", gap: 7,
    padding: depth === 0 ? "6px 16px" : "5px 16px 5px 36px",
    fontSize: depth === 0 ? 13 : 12.5,
    fontWeight: depth === 0 ? 600 : 500,
    color: active ? "var(--ink)" : (depth === 0 ? "var(--ink-2)" : "var(--ink-mute)"),
    background: active ? "linear-gradient(90deg, rgba(201,162,91,0.10), transparent 80%)" : "transparent",
    borderLeft: active ? "2px solid var(--gold)" : "2px solid transparent",
    cursor: "pointer",
    fontFamily: depth === 0 ? "var(--sans)" : "var(--serif)",
    letterSpacing: depth === 0 ? 0.1 : 0.2,
  }),
  treeCount: {
    marginLeft: "auto",
    fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)",
    letterSpacing: 0.4,
  },
  newSectionBtn: {
    margin: "8px 12px 14px",
    padding: "8px 12px",
    display: "inline-flex", alignItems: "center", gap: 8,
    fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.3,
    textTransform: "uppercase",
    color: "var(--gold)",
    background: "transparent",
    border: "1px dashed rgba(201,162,91,0.4)",
    cursor: "pointer", justifyContent: "center",
  },

  // ============ Entry list (middle) ============
  listCol: {
    width: 360, flex: "0 0 360px",
    borderRight: "1px solid var(--rule)",
    display: "flex", flexDirection: "column",
    minHeight: 0,
  },
  listHead: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 18px 11px",
    borderBottom: "1px solid var(--rule)",
    background: "rgba(10,14,21,0.4)",
  },
  listHeadTitle: {
    fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)",
    letterSpacing: 0.2, lineHeight: 1.1,
  },
  listHeadCrumb: {
    fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.3,
    color: "var(--ink-dim)", textTransform: "uppercase", marginBottom: 2,
  },
  listSearch: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 14px",
    borderBottom: "1px solid var(--rule)",
    fontFamily: "var(--sans)",
  },
  newEntryBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "6px 10px",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.3,
    textTransform: "uppercase", fontWeight: 600,
    color: "#0c1018",
    background: "linear-gradient(180deg, #d6b06a, #a8843e)",
    border: "1px solid rgba(201,162,91,0.7)",
    cursor: "pointer",
  },
  entryList: { flex: 1, overflow: "auto" },
  entryRow: (active) => ({
    display: "flex", gap: 10,
    padding: "12px 16px 12px 14px",
    borderLeft: active ? "2px solid var(--gold)" : "2px solid transparent",
    background: active ? "linear-gradient(90deg, rgba(201,162,91,0.10), transparent 80%)" : "transparent",
    borderBottom: "1px solid var(--rule)",
    cursor: "pointer",
  }),
  entryThumb: (tone) => ({
    width: 44, height: 44, flexShrink: 0,
    background: tone ? `linear-gradient(135deg, ${tone}55, rgba(10,14,21,0.7))` : "rgba(20,26,38,0.6)",
    border: "1px solid var(--rule-strong)",
    display: "grid", placeItems: "center",
    color: "rgba(232,226,210,0.3)",
    position: "relative",
    overflow: "hidden",
  }),
  entryThumbPattern: {
    position: "absolute", inset: 0,
    backgroundImage: "repeating-linear-gradient(45deg, rgba(232,226,210,0.05) 0 1px, transparent 1px 7px)",
  },
  entryTitle: {
    fontFamily: "var(--serif)", fontSize: 15.5, lineHeight: 1.2,
    color: "var(--ink)", letterSpacing: 0.2,
    marginBottom: 4,
  },
  entryExcerpt: {
    fontFamily: "var(--serif)", fontStyle: "italic",
    fontSize: 12.5, color: "var(--ink-mute)", lineHeight: 1.4,
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
    marginTop: 2,
  },
  entryMeta: {
    display: "flex", alignItems: "center", gap: 8, marginTop: 7,
    fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1, color: "var(--ink-dim)",
    textTransform: "uppercase",
  },
  sharedBadge: {
    display: "inline-flex", alignItems: "center", gap: 4,
    fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.2, textTransform: "uppercase",
    color: "var(--rarity-uncommon)",
    border: "1px solid rgba(122,156,90,0.4)",
    background: "rgba(122,156,90,0.08)",
    padding: "1px 6px",
  },

  // ============ Editor (right) ============
  editorCol: {
    flex: 1, display: "flex", flexDirection: "column",
    minWidth: 0, overflow: "hidden",
    background: "linear-gradient(180deg, #10141d 0%, #0c1018 100%)",
  },
  editorBar: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 24px",
    borderBottom: "1px solid var(--rule)",
    background: "rgba(10,14,21,0.5)",
  },
  editorCrumbs: {
    display: "flex", alignItems: "center", gap: 7,
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.3,
    textTransform: "uppercase", color: "var(--ink-dim)",
  },
  saveDot: {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.2,
    color: "var(--ink-mute)", textTransform: "uppercase",
  },
  pinBtn: (on) => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "6px 10px",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.3,
    textTransform: "uppercase",
    color: on ? "var(--gold)" : "var(--ink-2)",
    border: on ? "1px solid var(--gold)" : "1px solid var(--rule-strong)",
    background: on ? "rgba(201,162,91,0.08)" : "transparent",
    cursor: "pointer",
  }),
  shareBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "6px 12px",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.3,
    textTransform: "uppercase", fontWeight: 600,
    color: "#0c1018",
    background: "linear-gradient(180deg, #d6b06a, #a8843e)",
    border: "1px solid rgba(201,162,91,0.7)",
    cursor: "pointer",
  },
  editorBody: {
    flex: 1, display: "grid", gridTemplateColumns: "1fr 280px",
    minHeight: 0, overflow: "hidden",
  },
  contentScroll: { overflow: "auto", padding: "32px 56px 60px", maxWidth: "100%" },
  hero: (tone) => ({
    height: 220,
    background: tone
      ? `linear-gradient(135deg, ${tone}55, rgba(10,14,21,0.8))`
      : "rgba(20,26,38,0.6)",
    border: "1px solid var(--rule-strong)",
    position: "relative",
    overflow: "hidden",
    marginBottom: 24,
  }),
  heroPattern: {
    position: "absolute", inset: 0,
    backgroundImage: "repeating-linear-gradient(45deg, rgba(232,226,210,0.05) 0 1px, transparent 1px 11px)",
  },
  heroUpload: {
    position: "absolute", inset: 0,
    display: "grid", placeItems: "center",
    color: "rgba(232,226,210,0.5)",
  },
  heroLabel: {
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.5,
    color: "var(--ink-dim)", textTransform: "uppercase",
    position: "absolute", top: 12, left: 14,
    background: "rgba(10,14,21,0.7)", padding: "3px 8px",
    border: "1px solid var(--rule)",
  },
  heroBtn: {
    position: "absolute", bottom: 12, right: 12,
    display: "inline-flex", alignItems: "center", gap: 7,
    padding: "6px 12px",
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.2,
    color: "var(--ink-2)", textTransform: "uppercase",
    background: "rgba(10,14,21,0.75)",
    border: "1px solid var(--rule-strong)",
  },
  bigTitle: {
    fontFamily: "var(--serif)", fontSize: 44, lineHeight: 1.05,
    fontWeight: 500, color: "var(--ink)", letterSpacing: 0.4,
    background: "transparent", border: "none", outline: "none",
    width: "100%", padding: 0, marginBottom: 8, fontStyle: "italic",
  },
  subTitle: {
    fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.4,
    color: "var(--ink-dim)", textTransform: "uppercase",
    marginBottom: 24,
    display: "flex", alignItems: "center", gap: 10,
  },
  proseToolbar: {
    display: "flex", alignItems: "center", gap: 4,
    padding: "6px 8px",
    border: "1px solid var(--rule)",
    background: "rgba(20,26,38,0.5)",
    marginBottom: 16,
  },
  toolBtn: (active) => ({
    width: 28, height: 28, display: "grid", placeItems: "center",
    color: active ? "var(--gold)" : "var(--ink-2)",
    background: active ? "rgba(201,162,91,0.08)" : "transparent",
    border: active ? "1px solid rgba(201,162,91,0.35)" : "1px solid transparent",
  }),
  prose: {
    fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.7,
    color: "var(--ink)", outline: "none",
  },

  // ============ Drawer ============
  drawer: {
    borderLeft: "1px solid var(--rule)",
    background: "rgba(10,14,21,0.4)",
    overflow: "auto",
    padding: "24px 18px 32px",
  },
  drawerSection: { marginBottom: 22 },
  drawerLabel: {
    fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.6,
    textTransform: "uppercase", color: "var(--ink-mute)",
    marginBottom: 10,
    display: "flex", alignItems: "center", gap: 8,
  },
  drawerRule: { flex: 1, height: 1, background: "var(--rule)" },
  avatarRow: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
  avatar: (tone, size = 28) => ({
    width: size, height: size,
    display: "grid", placeItems: "center",
    background: `linear-gradient(135deg, ${tone}66, ${tone}22)`,
    border: `1px solid ${tone}88`,
    color: "var(--ink)",
    fontFamily: "var(--serif)",
    fontWeight: 600,
    fontSize: 11,
  }),
  avatarAdd: {
    width: 28, height: 28,
    display: "grid", placeItems: "center",
    border: "1px dashed rgba(201,162,91,0.4)",
    color: "var(--gold)",
    cursor: "pointer",
  },
  linkField: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 10px",
    border: "1px solid var(--rule-strong)",
    background: "rgba(20,26,38,0.5)",
    fontSize: 12.5,
    color: "var(--ink-2)",
    cursor: "pointer",
  },
  linkEmpty: {
    fontFamily: "var(--serif)", fontStyle: "italic",
    color: "var(--ink-dim)",
  },
  linkPill: {
    fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1, color: "var(--gold)",
    border: "1px solid rgba(201,162,91,0.4)", padding: "1px 6px",
    background: "rgba(201,162,91,0.08)",
  },
  toggleRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 10,
    padding: "10px 12px",
    border: "1px solid var(--rule-strong)",
    background: "rgba(20,26,38,0.5)",
  },
  toggle: (on) => ({
    width: 32, height: 18,
    background: on ? "var(--gold)" : "rgba(232,226,210,0.12)",
    position: "relative",
    cursor: "pointer",
    transition: "background 120ms",
  }),
  toggleKnob: (on) => ({
    position: "absolute",
    top: 2, left: on ? 16 : 2,
    width: 14, height: 14,
    background: on ? "#0c1018" : "var(--ink-mute)",
    transition: "left 120ms",
  }),
};

function SectionTree({ sections, activeId, onSelect, expanded, onToggle }) {
  return (
    <div style={lxStyles.treeBody}>
      {sections.map(s => (
        <SectionNode key={s.id} node={s} depth={0} activeId={activeId} onSelect={onSelect} expanded={expanded} onToggle={onToggle} />
      ))}
    </div>
  );
}

function SectionNode({ node, depth, activeId, onSelect, expanded, onToggle }) {
  const FolderIcon = I[node.icon] || I.Box;
  const open = expanded.includes(node.id);
  const isActive = node.id === activeId;
  return (
    <div>
      <div style={lxStyles.treeNode(isActive, depth)} onClick={() => onSelect(node.id)}>
        {node.children ? (
          <button onClick={(e) => { e.stopPropagation(); onToggle(node.id); }} style={{ width: 14, height: 14, display: "grid", placeItems: "center", color: "var(--ink-mute)" }}>
            {open ? <I.ChevronD size={11} /> : <I.Chevron size={11} />}
          </button>
        ) : (
          <span style={{ width: 14 }} />
        )}
        <FolderIcon size={13} stroke={isActive ? "var(--gold)" : (depth === 0 ? "var(--ink-2)" : "var(--ink-mute)")} />
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {node.label}
        </span>
        {node.pinned && <I.Star size={10} stroke="var(--gold)" fill="var(--gold)" strokeWidth={1} />}
        {node.shared && <I.Users size={10} stroke="var(--rarity-uncommon)" />}
        {node.count != null && <span style={lxStyles.treeCount}>{node.count}</span>}
      </div>
      {open && node.children && node.children.map(c => (
        <SectionNode key={c.id} node={c} depth={depth + 1} activeId={activeId} onSelect={onSelect} expanded={expanded} onToggle={onToggle} />
      ))}
    </div>
  );
}

function EntryRow({ entry, active, onClick }) {
  return (
    <div style={lxStyles.entryRow(active)} onClick={onClick}>
      <div style={lxStyles.entryThumb(entry.tone)}>
        <div style={lxStyles.entryThumbPattern} />
        {entry.hero ? <I.Map size={18} stroke="rgba(232,226,210,0.4)" /> : <I.Scroll size={18} stroke="rgba(232,226,210,0.25)" />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
          <h4 style={{ ...lxStyles.entryTitle, flex: 1, minWidth: 0 }}>{entry.title}</h4>
          {entry.pinned && <I.Star size={11} stroke="var(--gold)" fill="var(--gold)" strokeWidth={1} style={{ flexShrink: 0, marginTop: 4 }} />}
        </div>
        <p style={lxStyles.entryExcerpt}>{entry.excerpt}</p>
        <div style={lxStyles.entryMeta}>
          <span>{entry.updated}</span>
          {entry.shared && <span style={lxStyles.sharedBadge}>
            <I.Users size={9} stroke="var(--rarity-uncommon)" /> Shared
          </span>}
        </div>
      </div>
    </div>
  );
}

function ProseRender({ blocks }) {
  if (!blocks) return null;
  return (
    <div style={lxStyles.prose}>
      {blocks.map((b, i) => {
        if (b.kind === "h2") return <h2 key={i} style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 500, color: "var(--ink)", margin: "20px 0 10px", letterSpacing: 0.3 }}>{b.text}</h2>;
        if (b.kind === "h3") return <h3 key={i} style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 500, color: "var(--ink)", margin: "20px 0 8px", fontStyle: "italic" }}>{b.text}</h3>;
        if (b.kind === "ul") return (
          <ul key={i} style={{ margin: "8px 0 14px 0", paddingLeft: 0, listStyle: "none" }}>
            {b.items.map((it, j) => (
              <li key={j} style={{ position: "relative", paddingLeft: 22, marginBottom: 6, color: "var(--ink-2)" }}>
                <span style={{ position: "absolute", left: 4, top: "0.6em", width: 6, height: 6, background: "var(--gold)", transform: "rotate(45deg)" }} />
                {it}
              </li>
            ))}
          </ul>
        );
        return <p key={i} style={{ margin: "0 0 14px" }}>{
          b.text.includes("**") ? renderBoldInline(b.text) : b.text
        }</p>;
      })}
    </div>
  );
}
function renderBoldInline(text) {
  // Not used by data, kept for completeness
  return text;
}

window.LX = lxStyles;
window.SectionTree = SectionTree;
window.EntryRow = EntryRow;
window.ProseRender = ProseRender;
