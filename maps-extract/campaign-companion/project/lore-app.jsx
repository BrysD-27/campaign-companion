// Lore & Codex page app
const lappStyles = {
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
  contentRow: { display: "flex", flex: 1, minHeight: 0 },
};

function LoreApp() {
  const LX = window.LX;
  const { LORE_SECTIONS, LORE_ENTRIES_BY_SECTION, LORE_PCS } = window.CC_LORE;

  const [expanded, setExpanded] = React.useState(["world", "factions", "locations"]);
  const [activeSectionId, setActiveSectionId] = React.useState("virelia");
  const [entries, setEntries] = React.useState(LORE_ENTRIES_BY_SECTION.virelia);
  const [activeEntryId, setActiveEntryId] = React.useState("le1");

  const activeEntry = entries.find(e => e.id === activeEntryId);

  function toggleExpanded(id) {
    setExpanded(expanded.includes(id) ? expanded.filter(x => x !== id) : [...expanded, id]);
  }
  function patchEntry(patch) {
    setEntries(entries.map(e => e.id === activeEntryId ? { ...e, ...patch } : e));
  }
  function toggleShareWith(pcId) {
    if (!activeEntry) return;
    const has = activeEntry.sharedWith.includes(pcId);
    const next = has ? activeEntry.sharedWith.filter(x => x !== pcId) : [...activeEntry.sharedWith, pcId];
    patchEntry({ sharedWith: next, shared: next.length > 0 });
  }

  // Build crumb for active section
  function findCrumb(id, list, trail = []) {
    for (const n of list) {
      if (n.id === id) return [...trail, n];
      if (n.children) {
        const r = findCrumb(id, n.children, [...trail, n]);
        if (r) return r;
      }
    }
    return null;
  }
  const crumb = findCrumb(activeSectionId, LORE_SECTIONS) || [];

  return (
    <div style={lappStyles.shell}>
      <Sidebar active="lore" />
      <div style={lappStyles.main}>
        <div style={lappStyles.topbar}>
          <div>
            <div style={lappStyles.crumbs}>
              <span>The Sundered Crown</span>
              <I.Chevron size={11} stroke="var(--ink-dim)" />
              <span style={{ color: "var(--gold)" }}>Lore & Codex</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <h1 style={lappStyles.pageTitle}>Lore & Codex</h1>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1.4, color: "var(--ink-dim)" }}>
                87 ENTRIES · 4 SECTIONS · 12 SHARED WITH PARTY
              </span>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 12px",
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.4,
              textTransform: "uppercase", color: "var(--ink-2)",
              border: "1px solid var(--rule-strong)", background: "rgba(20,26,38,0.5)",
            }}>
              <I.Search size={12} /> Search Codex
            </button>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 16px",
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.4,
              textTransform: "uppercase", fontWeight: 600,
              color: "#0c1018",
              background: "linear-gradient(180deg, #d6b06a, #a8843e)",
              border: "1px solid rgba(201,162,91,0.7)",
              boxShadow: "0 6px 18px rgba(201,162,91,0.12), inset 0 1px 0 rgba(255,255,255,0.18)",
              cursor: "pointer",
            }}>
              <I.Plus size={13} stroke="#0c1018" strokeWidth={2.5} /> New Entry
            </button>
          </div>
        </div>

        <div style={lappStyles.contentRow}>
          {/* Section tree */}
          <aside style={LX.treeCol}>
            <div style={LX.treeHead}>
              <I.Book size={12} stroke="var(--gold)" />
              <span style={LX.treeHeadTitle}>Codex Sections</span>
              <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-dim)" }}>4</span>
            </div>
            <SectionTree
              sections={LORE_SECTIONS}
              activeId={activeSectionId}
              onSelect={setActiveSectionId}
              expanded={expanded}
              onToggle={toggleExpanded}
            />
            <button style={LX.newSectionBtn}>
              <I.Plus size={11} /> New Section
            </button>
          </aside>

          {/* Entry list */}
          <div style={LX.listCol}>
            <div style={LX.listHead}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={LX.listHeadCrumb}>
                  {crumb.map((c, i) => (
                    <React.Fragment key={c.id}>
                      {i > 0 && " / "}
                      {c.label}
                    </React.Fragment>
                  ))}
                </div>
                <h2 style={LX.listHeadTitle}>{crumb.length ? crumb[crumb.length-1].label : "—"}</h2>
              </div>
              <button style={LX.newEntryBtn}>
                <I.Plus size={10} stroke="#0c1018" strokeWidth={2.5} /> New
              </button>
            </div>
            <div style={LX.listSearch}>
              <I.Search size={13} stroke="var(--ink-mute)" />
              <input placeholder="Filter entries…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 12.5, color: "var(--ink)" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-dim)" }}>{entries.length}</span>
            </div>
            <div style={LX.entryList}>
              {entries.map(e => (
                <EntryRow key={e.id} entry={e} active={e.id === activeEntryId} onClick={() => setActiveEntryId(e.id)} />
              ))}
            </div>
          </div>

          {/* Editor */}
          <div style={LX.editorCol}>
            {activeEntry ? (
              <React.Fragment>
                <div style={LX.editorBar}>
                  <div style={LX.editorCrumbs}>
                    <I.Map size={11} stroke="var(--ink-mute)" />
                    <span>Locations</span>
                    <I.Chevron size={10} />
                    <span style={{ color: "var(--gold)" }}>Virelia</span>
                    <I.Chevron size={10} />
                    <span>{activeEntry.title}</span>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={LX.saveDot}>
                      <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--rarity-uncommon)" }} />
                      Saved · 2 min ago
                    </span>
                    <button style={LX.pinBtn(activeEntry.pinned)} onClick={() => patchEntry({ pinned: !activeEntry.pinned })}>
                      <I.Star size={11} stroke="currentColor" fill={activeEntry.pinned ? "currentColor" : "none"} strokeWidth={1.4} />
                      {activeEntry.pinned ? "Pinned" : "Pin"}
                    </button>
                    <button style={LX.shareBtn}>
                      <I.Users size={11} stroke="#0c1018" strokeWidth={2} />
                      Share
                    </button>
                    <button style={{ width: 28, height: 28, display: "grid", placeItems: "center", color: "var(--ink-mute)" }}>
                      <I.More size={14} />
                    </button>
                  </div>
                </div>

                <div style={LX.editorBody}>
                  <div style={LX.contentScroll}>
                    {/* Hero */}
                    <div style={LX.hero(activeEntry.tone || "#5a7a9c")}>
                      <div style={LX.heroPattern} />
                      <div style={LX.heroLabel}>HERO IMAGE</div>
                      <div style={LX.heroUpload}>
                        <div style={{ textAlign: "center" }}>
                          <I.Map size={40} stroke="rgba(232,226,210,0.35)" strokeWidth={1.2} />
                          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", marginTop: 8, color: "rgba(232,226,210,0.5)", fontSize: 14 }}>
                            City silhouette from the harbor at dusk
                          </div>
                        </div>
                      </div>
                      <button style={LX.heroBtn}>
                        <I.Plus size={11} /> Replace Image
                      </button>
                    </div>

                    {/* Title */}
                    <input style={LX.bigTitle} value={activeEntry.title} onChange={(e) => patchEntry({ title: e.target.value })} />
                    <div style={LX.subTitle}>
                      <span>LOCATION · CITY</span>
                      <span style={{ width: 4, height: 4, background: "var(--ink-dim)", transform: "rotate(45deg)" }} />
                      <span>EDITED {activeEntry.updated.toUpperCase()}</span>
                      <span style={{ width: 4, height: 4, background: "var(--ink-dim)", transform: "rotate(45deg)" }} />
                      <span>VISIBLE TO {activeEntry.sharedWith.length} OF 4</span>
                    </div>

                    {/* Prose toolbar */}
                    <div style={LX.proseToolbar}>
                      <button style={LX.toolBtn(false)}><I.Heading size={13} /></button>
                      <button style={LX.toolBtn(true)}><I.Bold size={13} /></button>
                      <button style={LX.toolBtn(false)}><I.Italic size={13} /></button>
                      <button style={LX.toolBtn(false)}><I.Quote size={13} /></button>
                      <span style={{ width: 1, height: 14, background: "var(--rule)", margin: "0 6px" }} />
                      <button style={LX.toolBtn(true)}><I.List size={13} /></button>
                      <button style={LX.toolBtn(false)}><I.Link size={13} /></button>
                      <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-dim)", letterSpacing: 1.2, paddingRight: 6 }}>
                        {activeEntry.body ? activeEntry.body.length : 0} BLOCKS
                      </span>
                    </div>

                    {/* Body */}
                    <ProseRender blocks={activeEntry.body} />
                  </div>

                  {/* Drawer */}
                  <aside style={LX.drawer}>
                    <div style={LX.drawerSection}>
                      <div style={LX.drawerLabel}>
                        Shared With <span style={LX.drawerRule} /><span>{activeEntry.sharedWith.length}/4</span>
                      </div>
                      <div style={lxStylesAvatarStack}>
                        {activeEntry.sharedWith.map(id => {
                          const pc = LORE_PCS.find(p => p.id === id);
                          if (!pc) return null;
                          return (
                            <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                              <div style={LX.avatar(pc.tone, 26)}>{pc.initials}</div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontFamily: "var(--serif)", fontSize: 13.5, color: "var(--ink)", lineHeight: 1.1 }}>{pc.name}</div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.2, color: "var(--ink-dim)", textTransform: "uppercase", marginTop: 2 }}>
                                  Read access
                                </div>
                              </div>
                              <button style={{ color: "var(--ink-dim)", padding: 4 }} onClick={() => toggleShareWith(id)}>
                                <I.X size={12} />
                              </button>
                            </div>
                          );
                        })}
                        {activeEntry.sharedWith.length === 0 && (
                          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--ink-dim)", fontSize: 13 }}>
                            Not shared with any player.
                          </div>
                        )}
                        <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                          {LORE_PCS.filter(p => !activeEntry.sharedWith.includes(p.id)).map(p => (
                            <button key={p.id}
                              onClick={() => toggleShareWith(p.id)}
                              title={`Share with ${p.name}`}
                              style={{ ...LX.avatar(p.tone, 26), opacity: 0.5, cursor: "pointer", border: `1px dashed ${p.tone}88` }}>
                              {p.initials}
                            </button>
                          ))}
                          <button style={LX.avatarAdd} title="Invite by name">
                            <I.Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div style={LX.drawerSection}>
                      <div style={LX.drawerLabel}>Linked Item <span style={LX.drawerRule} /></div>
                      {activeEntry.linkedItem ? (
                        <div style={LX.linkField}>
                          <I.Gem size={13} stroke="var(--gold)" />
                          <span style={{ flex: 1, fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)" }}>
                            {activeEntry.linkedItem}
                          </span>
                          <span style={LX.linkPill}>ITEM</span>
                        </div>
                      ) : (
                        <div style={LX.linkField}>
                          <I.Link size={12} stroke="var(--ink-mute)" />
                          <span style={{ ...LX.linkEmpty, flex: 1, fontSize: 13 }}>Search items to link…</span>
                          <I.Plus size={12} stroke="var(--ink-mute)" />
                        </div>
                      )}
                    </div>

                    <div style={LX.drawerSection}>
                      <div style={LX.drawerLabel}>Linked Map Marker <span style={LX.drawerRule} /></div>
                      {activeEntry.linkedMarker ? (
                        <div style={LX.linkField}>
                          <I.Map size={13} stroke="var(--slate-blue)" />
                          <span style={{ flex: 1, fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)" }}>
                            Virelia, harbor view
                          </span>
                          <span style={{ ...LX.linkPill, color: "var(--slate-blue)", borderColor: "rgba(90,122,156,0.5)", background: "rgba(90,122,156,0.1)" }}>
                            {activeEntry.linkedMarker}
                          </span>
                        </div>
                      ) : (
                        <div style={LX.linkField}>
                          <I.Map size={12} stroke="var(--ink-mute)" />
                          <span style={{ ...LX.linkEmpty, flex: 1, fontSize: 13 }}>Pin to a map marker…</span>
                          <I.Plus size={12} stroke="var(--ink-mute)" />
                        </div>
                      )}
                    </div>

                    <div style={LX.drawerSection}>
                      <div style={LX.drawerLabel}>Visibility <span style={LX.drawerRule} /></div>
                      <div style={LX.toggleRow}>
                        <div>
                          <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)" }}>Pinned</div>
                          <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.1, color: "var(--ink-dim)", textTransform: "uppercase", marginTop: 2 }}>
                            Floats to top of section
                          </div>
                        </div>
                        <button style={LX.toggle(activeEntry.pinned)} onClick={() => patchEntry({ pinned: !activeEntry.pinned })}>
                          <span style={LX.toggleKnob(activeEntry.pinned)} />
                        </button>
                      </div>
                      <div style={{ ...LX.toggleRow, marginTop: 8 }}>
                        <div>
                          <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)" }}>Player-visible</div>
                          <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1.1, color: "var(--ink-dim)", textTransform: "uppercase", marginTop: 2 }}>
                            Auto-on when shared
                          </div>
                        </div>
                        <button style={LX.toggle(activeEntry.shared)} onClick={() => patchEntry({ shared: !activeEntry.shared })}>
                          <span style={LX.toggleKnob(activeEntry.shared)} />
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </React.Fragment>
            ) : (
              <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--ink-dim)" }}>
                <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22 }}>No entry selected.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const lxStylesAvatarStack = { display: "flex", flexDirection: "column" };

ReactDOM.createRoot(document.getElementById("root")).render(<LoreApp />);
