// Item list / grid
const listStyles = {
  wrap: { display: "flex", flexDirection: "column", height: "100%", minHeight: 0 },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 24px",
    borderBottom: "1px solid var(--rule)",
    background: "rgba(10,14,21,0.6)",
    backdropFilter: "blur(6px)",
  },
  search: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    background: "rgba(10,14,21,0.7)",
    border: "1px solid var(--rule-strong)",
    color: "var(--ink-2)",
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: 13,
    color: "var(--ink)",
  },
  kbd: {
    fontFamily: "var(--mono)",
    fontSize: 10,
    color: "var(--ink-dim)",
    border: "1px solid var(--rule)",
    padding: "1px 5px",
    letterSpacing: 0.5,
  },
  iconBtn: {
    width: 32, height: 32,
    display: "grid", placeItems: "center",
    border: "1px solid var(--rule-strong)",
    background: "rgba(10,14,21,0.7)",
    color: "var(--ink-2)",
  },
  iconBtnActive: {
    width: 32, height: 32,
    display: "grid", placeItems: "center",
    border: "1px solid rgba(201,162,91,0.4)",
    background: "rgba(201,162,91,0.10)",
    color: "var(--gold)",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 24px",
    borderBottom: "1px solid var(--rule)",
    overflowX: "auto",
    flexWrap: "wrap",
  },
  chip: (active) => ({
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    padding: "5px 10px",
    border: active ? "1px solid var(--gold)" : "1px solid var(--rule-strong)",
    color: active ? "var(--gold)" : "var(--ink-2)",
    background: active ? "rgba(201,162,91,0.08)" : "transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
  }),
  divider: {
    width: 1, height: 18, background: "var(--rule)", margin: "0 6px",
  },
  resultMeta: {
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    color: "var(--ink-dim)",
    letterSpacing: 0.6,
    marginLeft: "auto",
    whiteSpace: "nowrap",
  },
  grid: {
    overflow: "auto",
    padding: "20px 24px 28px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 14,
    alignContent: "start",
  },
  groupHead: {
    gridColumn: "1 / -1",
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  groupTitle: {
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "var(--ink-dim)",
  },
  groupRule: {
    flex: 1, height: 1, background: "var(--rule)",
  },
};

const cardStyles = {
  card: (active) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignSelf: "start",
    minHeight: 280,
    background: active
      ? "linear-gradient(180deg, rgba(201,162,91,0.07), rgba(20,26,38,0.95))"
      : "linear-gradient(180deg, rgba(26,32,48,0.7), rgba(20,26,38,0.95))",
    border: active ? "1px solid rgba(201,162,91,0.55)" : "1px solid var(--rule-strong)",
    boxShadow: active
      ? "0 0 0 1px rgba(201,162,91,0.18), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(232,226,210,0.04)"
      : "0 4px 14px rgba(0,0,0,0.25), inset 0 1px 0 rgba(232,226,210,0.03)",
    padding: 0,
    cursor: "pointer",
    transition: "transform 120ms ease, border-color 120ms ease",
    overflow: "hidden",
  }),
  thumb: (rarity) => ({
    height: 110,
    flexShrink: 0,
    background: `linear-gradient(135deg, rgba(${rarityRGB(rarity)},0.18), rgba(10,14,21,0.85))`,
    borderBottom: "1px solid var(--rule-strong)",
    position: "relative",
    overflow: "hidden",
  }),
  thumbInner: {
    position: "absolute", inset: 0,
    backgroundImage: `repeating-linear-gradient(45deg, rgba(232,226,210,0.04) 0 1px, transparent 1px 9px)`,
  },
  thumbCenter: {
    position: "absolute", inset: 0,
    display: "grid", placeItems: "center",
    color: "rgba(232,226,210,0.18)",
  },
  rarityBar: (rarity) => ({
    position: "absolute",
    top: 0, left: 0, right: 0, height: 2,
    background: rarityColor(rarity),
  }),
  body: { padding: "12px 14px 14px" },
  topRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 },
  name: {
    fontFamily: "var(--serif)",
    fontSize: 18,
    fontWeight: 500,
    color: "var(--ink)",
    lineHeight: 1.15,
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  typeBadge: {
    fontFamily: "var(--mono)",
    fontSize: 9.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: "var(--ink-2)",
    padding: "2px 6px",
    border: "1px solid var(--rule-strong)",
  },
  rarityChip: (rarity) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--mono)",
    fontSize: 9.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: rarityColor(rarity),
  }),
  gem: (rarity) => ({
    width: 7, height: 7,
    background: rarityColor(rarity),
    transform: "rotate(45deg)",
    boxShadow: `0 0 6px ${rarityColor(rarity)}`,
  }),
  dmTag: {
    position: "absolute",
    top: 8, right: 8,
    fontFamily: "var(--mono)",
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "var(--crimson)",
    border: "1px solid rgba(138,58,58,0.5)",
    background: "rgba(20,10,10,0.7)",
    padding: "2px 6px",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
};

function rarityColor(r) {
  return ({
    common: "var(--rarity-common)",
    uncommon: "var(--rarity-uncommon)",
    rare: "var(--rarity-rare)",
    epic: "var(--rarity-epic)",
    legendary: "var(--rarity-legendary)",
  })[r] || "var(--ink-mute)";
}
function rarityRGB(r) {
  return ({
    common: "138,134,118",
    uncommon: "122,156,90",
    rare: "90,122,156",
    epic: "156,122,201",
    legendary: "201,162,91",
  })[r] || "138,134,118";
}

function ItemThumb({ item }) {
  // Stylized placeholder per item type — geometric, never figurative.
  const t = item.type;
  return (
    <div style={cardStyles.thumb(item.rarity)}>
      <div style={cardStyles.thumbInner} />
      <div style={cardStyles.thumbCenter}>
        <ThumbGlyph type={t} rarity={item.rarity} />
      </div>
      <div style={cardStyles.rarityBar(item.rarity)} />
    </div>
  );
}

function ThumbGlyph({ type, rarity }) {
  const c = rarityColor(rarity);
  const stroke = "rgba(232,226,210,0.28)";
  const accent = c;
  if (type === "weapon")    return <I.Sword   size={42} stroke={stroke} strokeWidth={1.2} />;
  if (type === "armor")     return <I.Shield  size={42} stroke={stroke} strokeWidth={1.2} />;
  if (type === "artifact")  return <I.Gem     size={42} stroke={accent} strokeWidth={1.2} />;
  if (type === "consumable")return <I.Flask   size={42} stroke={stroke} strokeWidth={1.2} />;
  return <I.Box size={42} stroke={stroke} strokeWidth={1.2} />;
}

function ItemCard({ item, active, onClick }) {
  const type = window.CC_DATA.ITEM_TYPES.find(t => t.id === item.type);
  const rarity = window.CC_DATA.RARITIES.find(r => r.id === item.rarity);
  return (
    <div
      style={cardStyles.card(active)}
      onClick={onClick}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = "rgba(232,226,210,0.22)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--rule-strong)"; }}
    >
      <ItemThumb item={item} />
      {item.dmOnly && (
        <div style={cardStyles.dmTag}>
          <I.EyeOff size={9} stroke="var(--crimson)" /> DM Only
        </div>
      )}
      <div style={cardStyles.body}>
        <div style={cardStyles.name}>{item.name}</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-mute)", fontStyle: "italic", lineHeight: 1.3, minHeight: 30 }}>
          {item.tagline}
        </div>
        <div style={cardStyles.metaRow}>
          <span style={cardStyles.typeBadge}>{type.label}</span>
          <span style={cardStyles.rarityChip(item.rarity)}>
            <span style={cardStyles.gem(item.rarity)}></span>
            {rarity.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function ItemList({ items, query, setQuery, typeFilter, setTypeFilter, rarityFilter, setRarityFilter, dmOnlyFilter, setDmOnlyFilter, selectedId, onSelect, onNew }) {
  const { ITEM_TYPES, RARITIES } = window.CC_DATA;

  const filtered = items.filter(it => {
    if (typeFilter !== "all" && it.type !== typeFilter) return false;
    if (rarityFilter !== "all" && it.rarity !== rarityFilter) return false;
    if (dmOnlyFilter === "dm" && !it.dmOnly) return false;
    if (dmOnlyFilter === "visible" && it.dmOnly) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!it.name.toLowerCase().includes(q) && !(it.tagline||"").toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Group by rarity (legendary first)
  const order = ["legendary","epic","rare","uncommon","common"];
  const grouped = order.map(r => ({ rarity: r, items: filtered.filter(i => i.rarity === r) })).filter(g => g.items.length);

  return (
    <div style={listStyles.wrap}>
      <div style={listStyles.toolbar}>
        <div style={listStyles.search}>
          <I.Search size={14} stroke="var(--ink-mute)" />
          <input
            style={listStyles.searchInput}
            placeholder="Search items, taglines, lore…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span style={listStyles.kbd}>⌘K</span>
        </div>
        <button style={listStyles.iconBtn} title="Sort"><I.Sort size={14} /></button>
        <button style={listStyles.iconBtnActive} title="Grid view"><I.Grid size={14} /></button>
        <button style={listStyles.iconBtn} title="List view"><I.List size={14} /></button>
      </div>

      <div style={listStyles.filters}>
        <span style={{ ...listStyles.chip(false), border: "none", color: "var(--ink-dim)", padding: "5px 4px 5px 0" }}>Type</span>
        <button style={listStyles.chip(typeFilter === "all")} onClick={() => setTypeFilter("all")}>All</button>
        {ITEM_TYPES.map(t => (
          <button key={t.id} style={listStyles.chip(typeFilter === t.id)} onClick={() => setTypeFilter(t.id)}>
            {t.label}
          </button>
        ))}
        <span style={listStyles.divider} />
        <span style={{ ...listStyles.chip(false), border: "none", color: "var(--ink-dim)", padding: "5px 4px 5px 0" }}>Rarity</span>
        <button style={listStyles.chip(rarityFilter === "all")} onClick={() => setRarityFilter("all")}>Any</button>
        {RARITIES.map(r => (
          <button
            key={r.id}
            style={{
              ...listStyles.chip(rarityFilter === r.id),
              borderColor: rarityFilter === r.id ? rarityColor(r.id) : "var(--rule-strong)",
              color: rarityFilter === r.id ? rarityColor(r.id) : "var(--ink-2)",
            }}
            onClick={() => setRarityFilter(r.id)}
          >
            <span style={{ display: "inline-block", width: 6, height: 6, background: rarityColor(r.id), transform: "rotate(45deg)", marginRight: 6, verticalAlign: "middle" }} />
            {r.label}
          </button>
        ))}
        <span style={listStyles.divider} />
        <button
          style={{ ...listStyles.chip(dmOnlyFilter === "dm"), borderColor: dmOnlyFilter === "dm" ? "var(--crimson)" : "var(--rule-strong)", color: dmOnlyFilter === "dm" ? "var(--crimson)" : "var(--ink-2)" }}
          onClick={() => setDmOnlyFilter(dmOnlyFilter === "dm" ? "all" : "dm")}
        >
          <I.EyeOff size={10} style={{ marginRight: 4, verticalAlign: "middle" }} />
          DM Only
        </button>

        <span style={listStyles.resultMeta}>{filtered.length} of {items.length} entries</span>
      </div>

      <div style={listStyles.grid}>
        {grouped.map(g => (
          <React.Fragment key={g.rarity}>
            <div style={listStyles.groupHead}>
              <span style={{ ...listStyles.groupTitle, color: rarityColor(g.rarity) }}>
                {RARITIES.find(r => r.id === g.rarity).label}
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)" }}>{g.items.length}</span>
              <span style={listStyles.groupRule} />
            </div>
            {g.items.map(it => (
              <ItemCard key={it.id} item={it} active={it.id === selectedId} onClick={() => onSelect(it.id)} />
            ))}
          </React.Fragment>
        ))}
        {!filtered.length && (
          <div style={{ gridColumn: "1 / -1", padding: "60px 0", textAlign: "center", color: "var(--ink-dim)" }}>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, marginBottom: 6 }}>The vault is silent.</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1 }}>NO MATCHES — TRY LOOSENING THE FILTERS</div>
          </div>
        )}
      </div>
    </div>
  );
}

window.ItemList = ItemList;
window.rarityColor = rarityColor;
window.rarityRGB = rarityRGB;
window.ThumbGlyph = ThumbGlyph;
