// Item detail panel
const detailStyles = {
  root: {
    width: 460,
    flex: "0 0 460px",
    borderLeft: "1px solid var(--rule)",
    background: "linear-gradient(180deg, #10141d 0%, #0c1018 100%)",
    height: "100vh",
    overflow: "auto",
    position: "relative",
  },
  empty: {
    height: "100%",
    display: "grid",
    placeItems: "center",
    color: "var(--ink-dim)",
    padding: 40,
    textAlign: "center",
  },
  hero: (rarity) => ({
    height: 220,
    background: `linear-gradient(180deg, rgba(${rarityRGB(rarity)},0.22) 0%, rgba(10,14,21,0.95) 100%)`,
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid var(--rule-strong)",
  }),
  heroPattern: {
    position: "absolute", inset: 0,
    backgroundImage:
      `repeating-linear-gradient(45deg, rgba(232,226,210,0.04) 0 1px, transparent 1px 11px),
       radial-gradient(circle at 50% 60%, rgba(232,226,210,0.08), transparent 60%)`,
  },
  heroGlyph: {
    position: "absolute", inset: 0, display: "grid", placeItems: "center",
  },
  rarityBar: (rarity) => ({
    position: "absolute", top: 0, left: 0, right: 0, height: 2,
    background: rarityColor(rarity),
    boxShadow: `0 0 12px ${rarityColor(rarity)}`,
  }),
  closeBtn: {
    position: "absolute", top: 12, right: 12,
    width: 30, height: 30,
    display: "grid", placeItems: "center",
    background: "rgba(10,14,21,0.7)",
    border: "1px solid var(--rule-strong)",
    color: "var(--ink-2)",
  },
  body: { padding: "20px 24px 32px" },
  nameRow: { display: "flex", alignItems: "flex-start", gap: 10 },
  name: {
    fontFamily: "var(--serif)",
    fontSize: 30,
    lineHeight: 1.05,
    fontWeight: 500,
    color: "var(--ink)",
    letterSpacing: 0.3,
    flex: 1,
  },
  tagline: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    color: "var(--ink-mute)",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 1.4,
  },
  metaInline: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    flexWrap: "wrap",
  },
  typeBadge: {
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "var(--ink-2)",
    padding: "3px 8px",
    border: "1px solid var(--rule-strong)",
  },
  rarityBadge: (rarity) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: rarityColor(rarity),
    padding: "3px 8px",
    border: `1px solid ${rarityColor(rarity)}`,
    background: `rgba(${rarityRGB(rarity)},0.07)`,
  }),
  visToggle: (on) => ({
    marginLeft: "auto",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "5px 10px 5px 8px",
    border: on ? "1px solid rgba(138,58,58,0.6)" : "1px solid var(--rule-strong)",
    background: on ? "rgba(60,20,20,0.5)" : "rgba(20,26,38,0.6)",
    color: on ? "var(--crimson)" : "var(--ink-2)",
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    cursor: "pointer",
  }),
  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: "var(--ink-mute)",
  },
  sectionRule: {
    flex: 1, height: 1, background: "var(--rule)",
  },
  editorWrap: {
    border: "1px solid var(--rule-strong)",
    background: "rgba(10,14,21,0.4)",
  },
  editorBar: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: "6px 8px",
    borderBottom: "1px solid var(--rule)",
    background: "rgba(20,26,38,0.5)",
  },
  editorBtn: {
    width: 26, height: 26,
    display: "grid", placeItems: "center",
    color: "var(--ink-2)",
  },
  editorBody: {
    padding: "14px 16px 16px",
    fontFamily: "var(--serif)",
    fontSize: 15.5,
    lineHeight: 1.55,
    color: "var(--ink)",
    minHeight: 100,
    outline: "none",
    whiteSpace: "pre-wrap",
  },
  propRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr 24px",
    alignItems: "center",
    gap: 0,
    borderBottom: "1px solid var(--rule)",
    padding: "10px 0",
  },
  propKey: {
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "var(--ink-mute)",
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "2px 4px 2px 0",
  },
  propVal: {
    fontFamily: "var(--serif)",
    fontSize: 14.5,
    color: "var(--ink)",
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "2px 6px",
  },
  propDel: {
    width: 22, height: 22,
    display: "grid", placeItems: "center",
    color: "var(--ink-dim)",
    opacity: 0.0,
    transition: "opacity 120ms",
  },
  propRowHover: {
    // injected via CSS
  },
  addRowBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: "var(--gold)",
    border: "1px dashed rgba(201,162,91,0.4)",
    padding: "7px 12px",
    background: "transparent",
    cursor: "pointer",
  },
  loreLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    border: "1px solid var(--rule-strong)",
    background: "rgba(20,26,38,0.5)",
    cursor: "pointer",
  },
  loreSearch: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    border: "1px solid var(--rule-strong)",
    background: "rgba(10,14,21,0.5)",
  },
  loreInput: {
    flex: 1, background: "transparent", border: "none", outline: "none",
    fontSize: 13, color: "var(--ink)",
  },
  loreOption: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 12px",
    background: active ? "rgba(201,162,91,0.08)" : "transparent",
    cursor: "pointer",
    borderBottom: "1px solid var(--rule)",
  }),
  invRow: {
    display: "grid",
    gridTemplateColumns: "30px 1fr auto auto",
    alignItems: "center",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid var(--rule)",
  },
  invAvatar: (tone) => ({
    width: 28, height: 28,
    display: "grid", placeItems: "center",
    background: `linear-gradient(135deg, ${tone}55, ${tone}22)`,
    border: `1px solid ${tone}66`,
    color: "var(--ink)",
    fontFamily: "var(--serif)",
    fontWeight: 600,
    fontSize: 12,
  }),
  qtyChip: {
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: 0.5,
    color: "var(--ink-2)",
    border: "1px solid var(--rule-strong)",
    padding: "2px 8px",
  },
  footerActions: {
    display: "flex",
    gap: 8,
    marginTop: 24,
    paddingTop: 16,
    borderTop: "1px solid var(--rule)",
  },
  primaryBtn: {
    flex: 1,
    padding: "10px 14px",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#0c1018",
    background: "linear-gradient(180deg, #d6b06a, #a8843e)",
    border: "1px solid rgba(201,162,91,0.7)",
    cursor: "pointer",
    fontWeight: 600,
  },
  ghostBtn: {
    padding: "10px 14px",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "var(--ink-2)",
    background: "transparent",
    border: "1px solid var(--rule-strong)",
    cursor: "pointer",
  },
};

function ItemDetail({ item, onPatch, onClose }) {
  const [loreSearchOpen, setLoreSearchOpen] = React.useState(false);
  const [loreQuery, setLoreQuery] = React.useState("");

  if (!item) {
    return (
      <aside style={detailStyles.root}>
        <div style={detailStyles.empty}>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, color: "var(--ink-mute)", marginBottom: 8 }}>
              No item selected.
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.4, color: "var(--ink-dim)" }}>
              CHOOSE AN ENTRY FROM THE VAULT
            </div>
          </div>
        </div>
      </aside>
    );
  }

  const { ITEM_TYPES, RARITIES, PARTY, LORE_ENTRIES } = window.CC_DATA;
  const type = ITEM_TYPES.find(t => t.id === item.type);
  const rarity = RARITIES.find(r => r.id === item.rarity);
  const lore = LORE_ENTRIES.find(l => l.id === item.lore);

  const filteredLore = LORE_ENTRIES.filter(l =>
    !loreQuery || l.title.toLowerCase().includes(loreQuery.toLowerCase()) || l.kind.toLowerCase().includes(loreQuery.toLowerCase())
  );

  function setProp(idx, key, val) {
    const next = item.properties.map((p, i) => i === idx ? { ...p, [key]: val } : p);
    onPatch({ properties: next });
  }
  function addProp() {
    onPatch({ properties: [...item.properties, { k: "New Property", v: "—" }] });
  }
  function delProp(idx) {
    onPatch({ properties: item.properties.filter((_, i) => i !== idx) });
  }
  function setInvQty(who, delta) {
    const next = item.inventory.map(r => r.who === who ? { ...r, qty: Math.max(0, r.qty + delta) } : r).filter(r => r.qty > 0);
    onPatch({ inventory: next });
  }

  return (
    <aside style={detailStyles.root}>
      <div style={detailStyles.hero(item.rarity)}>
        <div style={detailStyles.rarityBar(item.rarity)} />
        <div style={detailStyles.heroPattern} />
        <div style={detailStyles.heroGlyph}>
          <ThumbGlyph type={item.type} rarity={item.rarity} />
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <div style={{ width: 130, height: 130, border: `1px solid ${rarityColor(item.rarity)}55`, transform: "rotate(45deg)" }} />
          </div>
        </div>
        <button style={detailStyles.closeBtn} onClick={onClose} title="Close">
          <I.X size={14} />
        </button>
        <div style={{ position: "absolute", bottom: 10, left: 16, fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.6, color: "var(--ink-dim)" }}>
          ENTRY · {item.id.toUpperCase()}
        </div>
      </div>

      <div style={detailStyles.body}>
        <div style={detailStyles.nameRow}>
          <h2 style={detailStyles.name}>{item.name}</h2>
        </div>
        <div style={detailStyles.tagline}>"{item.tagline}"</div>

        <div style={detailStyles.metaInline}>
          <span style={detailStyles.rarityBadge(item.rarity)}>
            <span style={{ width: 7, height: 7, background: rarityColor(item.rarity), transform: "rotate(45deg)", boxShadow: `0 0 6px ${rarityColor(item.rarity)}` }} />
            {rarity.label}
          </span>
          <span style={detailStyles.typeBadge}>{type.label}</span>
          <button
            style={detailStyles.visToggle(item.dmOnly)}
            onClick={() => onPatch({ dmOnly: !item.dmOnly })}
            title={item.dmOnly ? "Hidden from players" : "Visible to players"}
          >
            {item.dmOnly ? <I.EyeOff size={12} /> : <I.Eye size={12} />}
            {item.dmOnly ? "DM Only" : "Visible"}
          </button>
        </div>

        {/* Description */}
        <div style={detailStyles.sectionHead}>
          <span style={detailStyles.sectionTitle}>Description</span>
          <span style={detailStyles.sectionRule} />
          <I.Edit size={12} stroke="var(--ink-dim)" />
        </div>
        <div style={detailStyles.editorWrap}>
          <div style={detailStyles.editorBar}>
            <button style={detailStyles.editorBtn}><I.Heading size={13} /></button>
            <button style={detailStyles.editorBtn}><I.Bold size={13} /></button>
            <button style={detailStyles.editorBtn}><I.Italic size={13} /></button>
            <button style={detailStyles.editorBtn}><I.Quote size={13} /></button>
            <span style={{ width: 1, height: 14, background: "var(--rule)", margin: "0 6px" }} />
            <button style={detailStyles.editorBtn}><I.List size={13} /></button>
            <button style={detailStyles.editorBtn}><I.Link size={13} /></button>
            <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-dim)", letterSpacing: 1.2 }}>
              SAVED · 2m
            </span>
          </div>
          <div
            style={detailStyles.editorBody}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onPatch({ description: e.currentTarget.innerText })}
          >
            {item.description}
          </div>
        </div>

        {/* Properties */}
        <div style={detailStyles.sectionHead}>
          <span style={detailStyles.sectionTitle}>Properties</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)" }}>{item.properties.length}</span>
          <span style={detailStyles.sectionRule} />
        </div>
        <div>
          {item.properties.map((p, i) => (
            <div
              key={i}
              style={detailStyles.propRow}
              className="prop-row"
              onMouseEnter={(e) => { e.currentTarget.querySelector('.prop-del').style.opacity = 1; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector('.prop-del').style.opacity = 0; }}
            >
              <input
                style={detailStyles.propKey}
                value={p.k}
                onChange={(e) => setProp(i, "k", e.target.value)}
              />
              <input
                style={detailStyles.propVal}
                value={p.v}
                onChange={(e) => setProp(i, "v", e.target.value)}
              />
              <button className="prop-del" style={detailStyles.propDel} onClick={() => delProp(i)} title="Remove">
                <I.Trash size={13} />
              </button>
            </div>
          ))}
        </div>
        <button style={detailStyles.addRowBtn} onClick={addProp}>
          <I.Plus size={11} /> Add Property
        </button>

        {/* Linked Lore */}
        <div style={detailStyles.sectionHead}>
          <span style={detailStyles.sectionTitle}>Linked Lore Entry</span>
          <span style={detailStyles.sectionRule} />
        </div>
        {!loreSearchOpen ? (
          lore ? (
            <div style={detailStyles.loreLink} onClick={() => setLoreSearchOpen(true)}>
              <I.Book size={14} stroke="var(--gold)" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--ink)", lineHeight: 1.2 }}>{lore.title}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.2, textTransform: "uppercase", color: "var(--ink-dim)", marginTop: 2 }}>
                  {lore.kind}
                </div>
              </div>
              <I.Chevron size={14} stroke="var(--ink-mute)" />
            </div>
          ) : (
            <button style={{ ...detailStyles.addRowBtn, color: "var(--ink-2)", borderColor: "var(--rule-strong)" }} onClick={() => setLoreSearchOpen(true)}>
              <I.Link size={11} /> Link a lore entry
            </button>
          )
        ) : (
          <div>
            <div style={detailStyles.loreSearch}>
              <I.Search size={13} stroke="var(--ink-mute)" />
              <input
                autoFocus
                placeholder="Search the codex…"
                value={loreQuery}
                onChange={(e) => setLoreQuery(e.target.value)}
                style={detailStyles.loreInput}
              />
              <button onClick={() => { setLoreSearchOpen(false); setLoreQuery(""); }}><I.X size={13} stroke="var(--ink-mute)" /></button>
            </div>
            <div style={{ border: "1px solid var(--rule-strong)", borderTop: "none", maxHeight: 220, overflow: "auto" }}>
              {filteredLore.map(l => (
                <div
                  key={l.id}
                  style={detailStyles.loreOption(l.id === item.lore)}
                  onClick={() => { onPatch({ lore: l.id }); setLoreSearchOpen(false); setLoreQuery(""); }}
                >
                  <I.Book size={13} stroke={l.id === item.lore ? "var(--gold)" : "var(--ink-mute)"} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)" }}>{l.title}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.2, textTransform: "uppercase", color: "var(--ink-dim)" }}>{l.kind}</div>
                  </div>
                  {l.id === item.lore && <I.Check size={13} stroke="var(--gold)" />}
                </div>
              ))}
              {!filteredLore.length && (
                <div style={{ padding: "16px", textAlign: "center", fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-dim)", letterSpacing: 1 }}>
                  NO ENTRIES MATCH
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inventory */}
        <div style={detailStyles.sectionHead}>
          <span style={detailStyles.sectionTitle}>Inventory</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)" }}>
            {item.inventory.reduce((s, r) => s + r.qty, 0)} held
          </span>
          <span style={detailStyles.sectionRule} />
        </div>
        <div>
          {item.inventory.length === 0 && (
            <div style={{ padding: "12px 0", color: "var(--ink-dim)", fontStyle: "italic", fontFamily: "var(--serif)", fontSize: 14 }}>
              Held by no one yet.
            </div>
          )}
          {item.inventory.map(row => {
            const m = window.CC_DATA.PARTY.find(p => p.id === row.who);
            return (
              <div key={row.who} style={detailStyles.invRow}>
                <div style={detailStyles.invAvatar(m.tone)}>{m.initials}</div>
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 14.5, color: "var(--ink)", lineHeight: 1.1 }}>{m.name}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.2, textTransform: "uppercase", color: "var(--ink-dim)", marginTop: 2 }}>{m.role}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <button style={{ width: 22, height: 22, color: "var(--ink-mute)", border: "1px solid var(--rule-strong)" }} onClick={() => setInvQty(row.who, -1)}>−</button>
                  <span style={detailStyles.qtyChip}>×{row.qty}</span>
                  <button style={{ width: 22, height: 22, color: "var(--ink-mute)", border: "1px solid var(--rule-strong)" }} onClick={() => setInvQty(row.who, +1)}>+</button>
                </div>
                <button style={{ color: "var(--ink-dim)", padding: 4 }} title="Remove holder" onClick={() => onPatch({ inventory: item.inventory.filter(r => r.who !== row.who) })}>
                  <I.X size={13} />
                </button>
              </div>
            );
          })}
        </div>
        <button style={{ ...detailStyles.addRowBtn, marginTop: 10 }}>
          <I.Plus size={11} /> Assign to holder
        </button>

        <div style={detailStyles.footerActions}>
          <button style={detailStyles.primaryBtn}>Save changes</button>
          <button style={detailStyles.ghostBtn}>Duplicate</button>
          <button style={{ ...detailStyles.ghostBtn, color: "var(--crimson)", borderColor: "rgba(138,58,58,0.5)" }}>
            <I.Trash size={12} />
          </button>
        </div>
      </div>
    </aside>
  );
}

window.ItemDetail = ItemDetail;
