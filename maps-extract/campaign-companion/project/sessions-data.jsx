// Sessions data
const SESSION_TAGS = [
  { id: "pale_synod",   label: "Pale Synod Arc",   color: "#8a3a3a" }, // crimson
  { id: "combat",       label: "Combat Heavy",     color: "#5a7a9c" }, // slate blue
  { id: "intrigue",     label: "Intrigue",         color: "#9c7ac9" }, // violet
  { id: "travel",       label: "Travel",           color: "#7a9c5a" }, // muted green
  { id: "downtime",     label: "Downtime",         color: "#8a8676" }, // slate
  { id: "veyrun",       label: "House Veyrun",     color: "#c9a25b" }, // gold
  { id: "tideglass",    label: "Glassmere Pact",   color: "#5a9c97" }, // teal
  { id: "session_zero", label: "Session Zero",     color: "#a86a3a" }, // umber
];

const NPCS = [
  { id: "n1", name: "Magister Olen Sarrow",   tone: "#8a3a3a", initials: "OS" },
  { id: "n2", name: "Chorus-Veil Idis",       tone: "#9c7ac9", initials: "CI" },
  { id: "n3", name: "Harborlord Cael Ven",    tone: "#5a9c97", initials: "CV" },
  { id: "n4", name: "Old Bram, the Innkeep",  tone: "#a86a3a", initials: "OB" },
  { id: "n5", name: "Lady Yssara Veyrun",     tone: "#c9a25b", initials: "YV" },
  { id: "n6", name: "Sister Thren of the Quiet", tone: "#8a8676", initials: "ST" },
  { id: "n7", name: "Wyrmsong's Shade",       tone: "#5a7a9c", initials: "WS" },
];

const SESSIONS = [
  {
    id: "s14",
    no: 14,
    title: "The Censer Speaks",
    date: "May 03, 2026",
    created: "Apr 27, 2026",
    mode: "live",
    tags: ["pale_synod", "intrigue"],
    npcs: ["n2", "n6", "n4"],
    pcs: ["kael", "sera", "thom", "vex"],
    recap: "The party returned to Embergloss with the Choirbound Censer wrapped in salt-cloth. At the inn, Old Bram was uneasy — the smoke from the hearth kept turning west, toward the chapter house. Sister Thren met them in the rectory and confirmed what Idis had hinted at: the Censer is not a relic of the Quiet Order. It is a listener, set there by the Pale Synod, and it has been listening for years.",
    prepDone: 8, prepTotal: 10,
    duration: "in progress",
  },
  {
    id: "s15",
    no: 15,
    title: "Yssara's Petition",
    date: "May 10, 2026",
    created: "May 02, 2026",
    mode: "prep",
    tags: ["veyrun", "intrigue"],
    npcs: ["n5", "n1"],
    pcs: ["kael", "sera", "thom", "vex"],
    recap: "",
    prepDone: 3, prepTotal: 11,
    duration: null,
  },
  {
    id: "s13",
    no: 13,
    title: "Smoke Below the Forge",
    date: "Apr 26, 2026",
    created: "Apr 19, 2026",
    mode: "complete",
    tags: ["pale_synod", "combat"],
    npcs: ["n2", "n7"],
    pcs: ["kael", "sera", "thom", "vex"],
    recap: "Descent into the lower vaults of the Embergloss Forge. The party engaged a chorus of veiled cantors and recovered the Censer at the cost of Vex's familiar. Idis vanished into smoke before she could be questioned.",
    prepDone: 9, prepTotal: 9,
    duration: "4h 12m",
  },
  {
    id: "s12",
    no: 12,
    title: "The Tideglass Inquiry",
    date: "Apr 19, 2026",
    created: "Apr 12, 2026",
    mode: "complete",
    tags: ["tideglass", "intrigue"],
    npcs: ["n3", "n2"],
    pcs: ["kael", "sera", "thom"],
    recap: "Sera turned the Tide-Glass on Glassmere harbor and saw what the Pact concealed. Harborlord Ven offered passage in exchange for silence — for now.",
    prepDone: 7, prepTotal: 7,
    duration: "3h 38m",
  },
  {
    id: "s11",
    no: 11,
    title: "A Long Walk to Ash",
    date: "Apr 12, 2026",
    created: "Apr 05, 2026",
    mode: "complete",
    tags: ["travel", "downtime"],
    npcs: ["n4"],
    pcs: ["kael", "sera", "thom", "vex"],
    recap: "Travel from the Glassmere coast inland to Embergloss. A quiet session — campfire confessions, Thom's ledger grew by three names, and Kael was visited in dream by something wearing his sister's voice.",
    prepDone: 5, prepTotal: 5,
    duration: "2h 50m",
  },
  {
    id: "s10",
    no: 10,
    title: "Salt and the Pact",
    date: "Apr 05, 2026",
    created: "Mar 29, 2026",
    mode: "complete",
    tags: ["tideglass", "combat"],
    npcs: ["n3"],
    pcs: ["kael", "sera", "thom", "vex"],
    recap: "Boarding action against a Synod-funded cutter off the Glassmere shoals. The party recovered the drowned envoy's mantle and a bound ledger of small debts owed to the Pale Choir.",
    prepDone: 8, prepTotal: 8,
    duration: "4h 02m",
  },
  {
    id: "s9",
    no: 9,
    title: "What the Quiet Order Will Not Say",
    date: "Mar 29, 2026",
    created: "Mar 22, 2026",
    mode: "complete",
    tags: ["pale_synod", "intrigue", "downtime"],
    npcs: ["n6", "n1"],
    pcs: ["sera", "thom", "vex"],
    recap: "An audience with Magister Sarrow ended in vague benedictions and one usable name. Sister Thren passed a sealed letter in the cloister garden; it remains unopened.",
    prepDone: 6, prepTotal: 6,
    duration: "3h 15m",
  },
];

window.CC_SESSIONS = { SESSION_TAGS, NPCS, SESSIONS };
