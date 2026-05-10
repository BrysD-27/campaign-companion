// Left navigation sidebar for Campaign Companion
const sidebarStyles = {
  root: {
    width: 232,
    flex: "0 0 232px",
    background: "linear-gradient(180deg, #0a0e15 0%, #0c1018 100%)",
    borderRight: "1px solid var(--rule)",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  brand: {
    padding: "20px 20px 18px",
    borderBottom: "1px solid var(--rule)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 30, height: 30,
    display: "grid", placeItems: "center",
    background: "radial-gradient(circle at 30% 30%, #2a2233, #0c1018)",
    border: "1px solid rgba(201,162,91,0.35)",
    boxShadow: "inset 0 0 12px rgba(201,162,91,0.15)",
    color: "var(--gold)",
  },
  brandName: {
    fontFamily: "var(--serif)",
    fontSize: 17,
    letterSpacing: 0.3,
    color: "var(--ink)",
    lineHeight: 1.1,
  },
  brandSub: {
    fontFamily: "var(--mono)",
    fontSize: 9.5,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "var(--ink-mute)",
    marginTop: 2,
  },
  campaignBox: {
    margin: "14px 14px 8px",
    padding: "10px 12px",
    border: "1px solid var(--rule)",
    background: "rgba(20,26,38,0.6)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  campaignLabel: {
    fontFamily: "var(--mono)",
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "var(--ink-dim)",
  },
  campaignName: {
    fontFamily: "var(--serif)",
    fontSize: 15,
    color: "var(--ink)",
    fontStyle: "italic",
  },
  sectionLabel: {
    fontFamily: "var(--mono)",
    fontSize: 9,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "var(--ink-dim)",
    padding: "16px 20px 8px",
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "8px 20px",
    fontSize: 13,
    color: active ? "var(--ink)" : "var(--ink-2)",
    background: active ? "linear-gradient(90deg, rgba(201,162,91,0.10), transparent 80%)" : "transparent",
    borderLeft: active ? "2px solid var(--gold)" : "2px solid transparent",
    cursor: "pointer",
    fontWeight: active ? 600 : 500,
    letterSpacing: 0.1,
  }),
  count: (active) => ({
    marginLeft: "auto",
    fontFamily: "var(--mono)",
    fontSize: 10,
    color: active ? "var(--gold)" : "var(--ink-dim)",
  }),
  user: {
    marginTop: "auto",
    padding: "12px 16px",
    borderTop: "1px solid var(--rule)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 28, height: 28,
    background: "linear-gradient(135deg, #5a2424, #8a3a3a)",
    color: "var(--ink)",
    display: "grid", placeItems: "center",
    fontFamily: "var(--serif)",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: 0.5,
  },
};

const NAV = [
  { id: "overview",  label: "Overview",       icon: "Compass",  count: null },
  { id: "sessions",  label: "Sessions",       icon: "Calendar", count: 14 },
  { id: "party",     label: "Party",          icon: "Users",    count: 4 },
  { id: "lore",      label: "Lore & Codex",   icon: "Book",     count: 87 },
  { id: "items",     label: "Items",          icon: "Gem",      count: 42 },
  { id: "places",    label: "Places & Maps",  icon: "Map",      count: 23 },
  { id: "scenes",    label: "Scenes",         icon: "Scroll",   count: 9 },
];

const NAV_HREFS = {
  items: "Items.html",
  sessions: "Sessions.html",
  lore: "Lore.html",
  places: "Maps.html",
};

function Sidebar({ active = "items" }) {
  return (
    <aside style={sidebarStyles.root}>
      <div style={sidebarStyles.brand}>
        <div style={sidebarStyles.brandMark}>
          <I.Star size={14} stroke="var(--gold)" />
        </div>
        <div>
          <div style={sidebarStyles.brandName}>Campaign Companion</div>
          <div style={sidebarStyles.brandSub}>DM Console</div>
        </div>
      </div>

      <div style={sidebarStyles.campaignBox} title="Switch campaign">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={sidebarStyles.campaignLabel}>Active Campaign</div>
          <div style={sidebarStyles.campaignName}>The Sundered Crown</div>
        </div>
        <I.ChevronD size={14} stroke="var(--ink-mute)" />
      </div>

      <div style={sidebarStyles.sectionLabel}>Campaign</div>
      {NAV.map(n => {
        const Cmp = I[n.icon];
        const isActive = n.id === active;
        const href = NAV_HREFS[n.id];
        const inner = (
          <React.Fragment>
            <Cmp size={15} stroke={isActive ? "var(--gold)" : "var(--ink-mute)"} />
            <span>{n.label}</span>
            {n.count != null && <span style={sidebarStyles.count(isActive)}>{n.count}</span>}
          </React.Fragment>
        );
        if (href && !isActive) {
          return (
            <a key={n.id} href={href} style={{ ...sidebarStyles.navItem(false), textDecoration: "none" }}>
              {inner}
            </a>
          );
        }
        return (
          <div key={n.id} style={sidebarStyles.navItem(isActive)}>
            {inner}
          </div>
        );
      })}

      <div style={sidebarStyles.sectionLabel}>Workspace</div>
      <div style={sidebarStyles.navItem(false)}>
        <I.Settings size={15} stroke="var(--ink-mute)" />
        <span>Settings</span>
      </div>

      <div style={sidebarStyles.user}>
        <div style={sidebarStyles.avatar}>R</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 500 }}>Rowan, the DM</div>
          <div style={{ fontSize: 10.5, color: "var(--ink-dim)", fontFamily: "var(--mono)" }}>Session 14 · Sun</div>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
