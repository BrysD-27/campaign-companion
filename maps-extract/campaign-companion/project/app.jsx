// App shell
const appStyles = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    height: "100vh",
    overflow: "hidden",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "16px 24px 14px",
    borderBottom: "1px solid var(--rule)",
    background: "linear-gradient(180deg, rgba(20,26,38,0.55), rgba(12,16,24,0.7))",
  },
  crumbs: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "var(--ink-dim)",
  },
  pageTitle: {
    fontFamily: "var(--serif)",
    fontSize: 28,
    lineHeight: 1.05,
    color: "var(--ink)",
    fontWeight: 500,
    letterSpacing: 0.4,
    marginTop: 4,
  },
  pageSub: {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 14,
    color: "var(--ink-mute)",
    marginTop: 4,
  },
  newBtn: {
    marginLeft: "auto",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: 600,
    color: "#0c1018",
    background: "linear-gradient(180deg, #d6b06a, #a8843e)",
    border: "1px solid rgba(201,162,91,0.7)",
    boxShadow: "0 6px 18px rgba(201,162,91,0.12), inset 0 1px 0 rgba(255,255,255,0.18)",
    cursor: "pointer",
  },
  ghostTopBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 12px",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "var(--ink-2)",
    border: "1px solid var(--rule-strong)",
    background: "rgba(20,26,38,0.5)",
  },
  contentRow: {
    display: "flex",
    flex: 1,
    minHeight: 0,
  },
  listCol: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },
};

function App() {
  const [items, setItems] = React.useState(window.CC_DATA.ITEMS);
  const [selectedId, setSelectedId] = React.useState("i2"); // The Sundered Crown — legendary, DM-only — sets a strong active state
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [rarityFilter, setRarityFilter] = React.useState("all");
  const [dmOnlyFilter, setDmOnlyFilter] = React.useState("all");

  const selected = items.find(i => i.id === selectedId);

  function patchSelected(patch) {
    setItems(items.map(i => i.id === selectedId ? { ...i, ...patch } : i));
  }

  function newItem() {
    const id = "i" + (items.length + 1) + "_" + Date.now();
    const item = {
      id,
      name: "Untitled Item",
      type: "misc",
      rarity: "common",
      dmOnly: false,
      tagline: "An entry awaiting a name.",
      description: "",
      properties: [],
      lore: null,
      inventory: [],
    };
    setItems([item, ...items]);
    setSelectedId(id);
  }

  return (
    <div style={appStyles.shell}>
      <Sidebar active="items" />
      <div style={appStyles.main}>
        <div style={appStyles.topbar}>
          <div>
            <div style={appStyles.crumbs}>
              <span>The Sundered Crown</span>
              <I.Chevron size={11} stroke="var(--ink-dim)" />
              <span style={{ color: "var(--gold)" }}>Items</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <h1 style={appStyles.pageTitle}>Items</h1>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.4, color: "var(--ink-dim)" }}>
                {items.length} ENTRIES · {items.filter(i => i.dmOnly).length} HIDDEN
              </span>
            </div>
          </div>
          <button style={appStyles.ghostTopBtn}>
            <I.Filter size={12} /> Bulk Actions
          </button>
          <button style={appStyles.newBtn} onClick={newItem}>
            <I.Plus size={13} stroke="#0c1018" strokeWidth={2.5} /> New Item
          </button>
        </div>

        <div style={appStyles.contentRow}>
          <div style={appStyles.listCol}>
            <ItemList
              items={items}
              query={query}
              setQuery={setQuery}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              rarityFilter={rarityFilter}
              setRarityFilter={setRarityFilter}
              dmOnlyFilter={dmOnlyFilter}
              setDmOnlyFilter={setDmOnlyFilter}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onNew={newItem}
            />
          </div>
          <ItemDetail
            item={selected}
            onPatch={patchSelected}
            onClose={() => setSelectedId(null)}
          />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
