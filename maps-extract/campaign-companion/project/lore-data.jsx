// Lore & Codex data
const LORE_SECTIONS = [
  {
    id: "world", label: "The World", icon: "Compass", pinned: true, shared: true,
    children: [
      { id: "history", label: "Histories", icon: "Scroll", shared: true, count: 14 },
      { id: "cosmology", label: "Cosmology", icon: "Star", shared: false, count: 6 },
    ],
    count: 20,
  },
  {
    id: "factions", label: "Factions", icon: "Users", shared: true,
    children: [
      { id: "pale_synod", label: "The Pale Synod", icon: "Scroll", shared: false, count: 11 },
      { id: "arcane_concord", label: "Arcane Concord", icon: "Scroll", shared: true, count: 7 },
      { id: "quiet_order", label: "The Quiet Order", icon: "Scroll", shared: true, count: 5 },
    ],
    count: 23,
  },
  {
    id: "locations", label: "Locations", icon: "Map", shared: true, expanded: true, active: true,
    children: [
      { id: "vale_of_thorns", label: "Vale of Thorns", icon: "Scroll", shared: true, count: 8 },
      { id: "virelia", label: "Virelia", icon: "Scroll", shared: true, count: 12, active: true },
      { id: "embergloss", label: "Embergloss", icon: "Scroll", shared: false, count: 6 },
      { id: "wyrmsong", label: "Wyrmsong Hollow", icon: "Scroll", shared: false, count: 4 },
    ],
    count: 30,
  },
  {
    id: "figures", label: "Figures", icon: "Users", shared: false,
    children: [
      { id: "saints", label: "Saints & Sinners", icon: "Scroll", shared: false, count: 9 },
      { id: "houses", label: "Noble Houses", icon: "Scroll", shared: true, count: 5 },
    ],
    count: 14,
  },
];

const LORE_ENTRIES_BY_SECTION = {
  virelia: [
    {
      id: "le1",
      title: "Virelia, the City of Slow Bells",
      hero: true,
      tone: "#5a7a9c",
      updated: "2 hrs ago",
      shared: true,
      pinned: true,
      excerpt: "Built in three concentric rings around the drowned cathedral, Virelia keeps time by water-clocks and grief.",
      sharedWith: ["kael", "sera"],
      linkedItem: null,
      linkedMarker: "M-VIR-01",
      body: [
        { kind: "h2", text: "The City of Slow Bells" },
        { kind: "p", text: "Built in three concentric rings around the drowned cathedral, Virelia keeps time not by sun or season but by the muted iron of its slow bells. They sound at odd hours — once when a high lord dies, once when the tide turns, and once, the older folk say, for reasons no living archivist remembers." },
        { kind: "p", text: "The outer ring is salt and trade; the middle ring is law and mourning; the inner ring is forbidden, and not by edict." },
        { kind: "h3", text: "Districts of note" },
        { kind: "ul", items: [
          "The Saltworks — open to all, watched by all.",
          "Mourner's Row — the only quarter where the bells are answered.",
          "The Rookery — where letters go that ought not to arrive.",
          "The Inner Ring — entry by silence, exit by miracle.",
        ]},
        { kind: "p", text: "The current Lord-Archivist, Magister Olen Sarrow, holds his court beneath the cathedral's drowned nave. He is widely believed to be in the pocket of the Pale Synod — a belief he neither confirms nor strenuously denies." },
      ],
    },
    {
      id: "le2",
      title: "The Slow Bells, a Brief History",
      hero: false,
      updated: "Yesterday",
      shared: true,
      pinned: false,
      excerpt: "Cast from cannon-bronze surrendered after the Glassmere Pact, the slow bells were never meant for joy.",
      sharedWith: ["kael"],
    },
    {
      id: "le3",
      title: "Mourner's Row",
      hero: true,
      tone: "#8a3a3a",
      updated: "3 days ago",
      shared: false,
      pinned: true,
      excerpt: "The only quarter of Virelia where the bells are answered. Outsiders are tolerated; questions are not.",
      sharedWith: [],
    },
    {
      id: "le4",
      title: "The Drowned Cathedral",
      hero: true,
      tone: "#9c7ac9",
      updated: "Apr 28",
      shared: true,
      pinned: false,
      excerpt: "What the city was built around, and around, and around. Half-flooded, fully consecrated, no longer entered.",
      sharedWith: ["sera", "thom"],
    },
    {
      id: "le5",
      title: "Magister Olen Sarrow",
      hero: false,
      updated: "Apr 22",
      shared: false,
      pinned: false,
      excerpt: "Lord-Archivist of Virelia. A careful, cordial, and entirely untrustworthy man.",
      sharedWith: [],
    },
  ],
};

const LORE_PCS = [
  { id: "kael",   name: "Kael Vance",      initials: "KV", tone: "#7a9c5a" },
  { id: "sera",   name: "Sera Ilenne",     initials: "SI", tone: "#5a7a9c" },
  { id: "thom",   name: "Thom Underbrook", initials: "TU", tone: "#c9a25b" },
  { id: "vex",    name: "Vex of Ash",      initials: "VA", tone: "#8a3a3a" },
];

window.CC_LORE = { LORE_SECTIONS, LORE_ENTRIES_BY_SECTION, LORE_PCS };
