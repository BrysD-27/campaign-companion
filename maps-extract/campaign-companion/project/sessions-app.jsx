// Sessions page app shell

const sappStyles = {
  shell: { display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 },
  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100vh", overflow: "hidden" },
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
  newBtn: {
    marginLeft: "auto",
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 16px",
    fontFamily: "var(--mono)",
    fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600,
    color: "#0c1018",
    background: "linear-gradient(180deg, #d6b06a, #a8843e)",
    border: "1px solid rgba(201,162,91,0.7)",
    boxShadow: "0 6px 18px rgba(201,162,91,0.12), inset 0 1px 0 rgba(255,255,255,0.18)",
    cursor: "pointer",
  },
  ghostTopBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "10px 12px",
    fontFamily: "var(--mono)",
    fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase",
    color: "var(--ink-2)",
    border: "1px solid var(--rule-strong)",
    background: "rgba(20,26,38,0.5)",
  },
  contentRow: { display: "flex", flex: 1, minHeight: 0 },
};

function SessionsApp() {
  const SX = window.SX;
  const { SESSIONS, SESSION_TAGS } = window.CC_SESSIONS;
  const [sessions, setSessions] = React.useState(SESSIONS);
  const [selectedId, setSelectedId] = React.useState("s14"); // The Censer Speaks — Live
  const [activeTab, setActiveTab] = React.useState("overview");
  const [query, setQuery] = React.useState("");
  const [modeFilter, setModeFilter] = React.useState("all");
  const [tagFilter, setTagFilter] = React.useState(["pale_synod", "intrigue", "tideglass"]);

  function toggleTagFilter(id) {
    setTagFilter(tagFilter.includes(id) ? tagFilter.filter(t => t !== id) : [...tagFilter, id]);
  }

  const filtered = sessions.filter(s => {
    if (modeFilter !== "all" && s.mode !== modeFilter) return false;
    if (tagFilter.length && !s.tags.some(t => tagFilter.includes(t))) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!s.title.toLowerCase().includes(q) && !(s.recap||"").toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Group by month
  const byMonth = {};
  filtered.forEach(s => {
    const month = s.date.split(",")[0].split(" ").slice(0, 1).concat(s.date.split(",")[1].trim()).join(" ");
    (byMonth[month] = byMonth[month] || []).push(s);
  });
  const monthKeys = Object.keys(byMonth);

  const selected = sessions.find(s => s.id === selectedId);

  function patchSelected(patch) {
    setSessions(sessions.map(s => s.id === selectedId ? { ...s, ...patch } : s));
  }

  return (
    <div style={sappStyles.shell}>
      <Sidebar active="sessions" />
      <div style={sappStyles.main}>
        <div style={sappStyles.topbar}>
          <div>
            <div style={sappStyles.crumbs}>
              <span>The Sundered Crown</span>
              <I.Chevron size={11} stroke="var(--ink-dim)" />
              <span style={{ color: "var(--gold)" }}>Sessions</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <h1 style={sappStyles.pageTitle}>Sessions</h1>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.4, color: "var(--ink-dim)" }}>
                {sessions.length} TOTAL · {sessions.filter(s => s.mode === "complete").length} LOGGED · {sessions.filter(s => s.mode === "prep").length} UPCOMING
              </span>
            </div>
          </div>
          <button style={sappStyles.ghostTopBtn}>
            <I.Calendar size={12} /> Calendar View
          </button>
          <button style={sappStyles.newBtn}>
            <I.Plus size={13} stroke="#0c1018" strokeWidth={2.5} /> New Session
          </button>
        </div>

        {/* Search + filters */}
        <div style={SX.toolbar}>
          <div style={SX.search}>
            <I.Search size={14} stroke="var(--ink-mute)" />
            <input
              style={SX.searchInput}
              placeholder="Search session titles, recaps, NPC names…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)", border: "1px solid var(--rule)", padding: "1px 5px", letterSpacing: 0.5 }}>⌘K</span>
          </div>
        </div>
        <div style={SX.filters}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.3, color: "var(--ink-dim)", textTransform: "uppercase", padding: "5px 4px 5px 0" }}>Mode</span>
          {[["all","All"],["prep","Prep"],["live","Live"],["complete","Complete"]].map(([id, label]) => (
            <button key={id} style={SX.modeChip(modeFilter === id)} onClick={() => setModeFilter(id)}>
              {label}
            </button>
          ))}
          <span style={SX.divider} />
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.3, color: "var(--ink-dim)", textTransform: "uppercase", padding: "5px 4px 5px 0" }}>Tags</span>
          {SESSION_TAGS.map(t => (
            <button key={t.id} style={SX.tagPickChip(tagFilter.includes(t.id), t.color)} onClick={() => toggleTagFilter(t.id)}>
              <span style={SX.tagDot(t.color)} />
              {t.label}
            </button>
          ))}
          {tagFilter.length > 0 && (
            <button style={{ ...SX.modeChip(false), color: "var(--ink-dim)", border: "none" }} onClick={() => setTagFilter([])}>
              Clear ({tagFilter.length})
            </button>
          )}
          <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-dim)", letterSpacing: 0.6 }}>
            {filtered.length} of {sessions.length} sessions
          </span>
        </div>

        {/* Content row */}
        <div style={sappStyles.contentRow}>
          <div style={SX.listCol}>
            <div style={SX.list}>
              {monthKeys.map(month => (
                <React.Fragment key={month}>
                  <div style={SX.groupHead}>
                    <span style={SX.groupTitle}>{month}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-dim)" }}>{byMonth[month].length}</span>
                    <span style={SX.groupRule} />
                  </div>
                  {byMonth[month].map(s => (
                    <SessionRow key={s.id} session={s} active={s.id === selectedId} onClick={() => setSelectedId(s.id)} />
                  ))}
                </React.Fragment>
              ))}
              {!filtered.length && (
                <div style={{ padding: "60px 24px", textAlign: "center", color: "var(--ink-dim)" }}>
                  <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, marginBottom: 6 }}>The journal stays closed.</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.2 }}>NO SESSIONS MATCH</div>
                </div>
              )}
            </div>
          </div>

          <div style={SX.detail}>
            <div style={SX.tabs}>
              {[
                { id: "overview",    label: "Overview", count: null },
                { id: "prep",        label: "Prep",     count: selected ? `${selected.prepDone}/${selected.prepTotal}` : null },
                { id: "log",         label: "Log",      count: null },
                { id: "appearances", label: "Appearances", count: selected ? selected.npcs.length + selected.pcs.length : null },
              ].map(t => (
                <button key={t.id} style={SX.tab(activeTab === t.id)} onClick={() => setActiveTab(t.id)}>
                  {t.label}
                  {t.count != null && <span style={SX.tabBadge}>{t.count}</span>}
                </button>
              ))}
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, paddingRight: 4 }}>
                {selected && <ModePill mode={selected.mode} size="sm" />}
                <button style={{ width: 28, height: 28, display: "grid", placeItems: "center", color: "var(--ink-mute)" }}>
                  <I.More size={14} />
                </button>
              </div>
            </div>

            {!selected ? (
              <PlaceholderTab label="No session selected." hint="CHOOSE AN ENTRY FROM THE JOURNAL" />
            ) : activeTab === "overview" ? (
              <OverviewTab session={selected} onPatch={patchSelected} />
            ) : activeTab === "prep" ? (
              <PlaceholderTab label="Prep checklist lives here." hint={`${selected.prepDone} OF ${selected.prepTotal} ITEMS COMPLETE — TAB SWITCH FOR DETAIL`} />
            ) : activeTab === "log" ? (
              <PlaceholderTab label="Live session log." hint="OPEN DURING PLAY TO RECORD BEATS, QUOTES, AND DECISIONS" />
            ) : (
              <PlaceholderTab label="Who showed up." hint={`${selected.pcs.length} PARTY MEMBERS · ${selected.npcs.length} NPCS APPEARED`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SessionsApp />);
