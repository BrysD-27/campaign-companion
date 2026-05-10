// Maps & markers data for The Sundered Crown campaign
window.CC_MAPS = (function () {
  const MAPS = [
    {
      id: "eldrune",
      name: "Eldrune, the Sundered Continent",
      sub: "World map · 1:2 000 000",
      updated: "Edited 2 days ago",
      markerCount: 12,
      thumbTone: "#c8b485",
    },
    {
      id: "virelia",
      name: "Virelia, Harbor City",
      sub: "Region · 8 districts",
      updated: "Edited last week",
      markerCount: 7,
      thumbTone: "#9eb1a3",
    },
    {
      id: "crypts",
      name: "Crypts of Saint Aelis",
      sub: "Dungeon · 3 floors",
      updated: "Edited 18 days ago",
      markerCount: 4,
      thumbTone: "#8a7a6a",
    },
  ];

  // Players in the campaign — used for share-with chips
  const PCS = [
    { id: "kael",   name: "Kael",   initials: "K", tone: "#8a3a3a" },
    { id: "mira",   name: "Mira",   initials: "M", tone: "#5a7a9c" },
    { id: "thom",   name: "Thom",   initials: "T", tone: "#7a9c5a" },
    { id: "selene", name: "Selene", initials: "S", tone: "#9c7ac9" },
  ];

  // Markers placed on the active (Eldrune) map. xy are 0..1 of the canvas.
  const MARKERS = [
    {
      id: "mk1", n: 1,
      label: "Virelia",
      kind: "city",
      x: 0.245, y: 0.665,
      dmOnly: false,
      sharedWith: ["kael", "mira", "thom", "selene"],
      linkedSection: "Locations / Virelia",
      notes: "Harbor city. Party's current base of operations. The Drowned Vow tavern sits on the eastern quay.",
    },
    {
      id: "mk2", n: 2,
      label: "The Sundered Spire",
      kind: "ruin",
      x: 0.575, y: 0.31,
      dmOnly: true,
      sharedWith: [],
      linkedSection: "Lore / The Sundered Crown",
      notes: "Resting place of the Crown's third shard. Bound by an oath-warden (CR 11). Players have heard rumours of a 'tower that grew from the ground reversed' — they don't yet know it is here.",
    },
    {
      id: "mk3", n: 3,
      label: "Ash Reach",
      kind: "region",
      x: 0.78, y: 0.5,
      dmOnly: false,
      sharedWith: ["kael", "mira", "thom"],
      linkedSection: "Locations / Ash Reach",
      notes: "Volcanic plateau. Thom's clan once mined fireglass here. Currently held by the Ember Pact.",
    },
    {
      id: "mk4", n: 4,
      label: "Saltspire Pass",
      kind: "passage",
      x: 0.495, y: 0.555,
      dmOnly: false,
      sharedWith: ["kael", "mira"],
      linkedSection: null,
      notes: "Only safe overland route between the harbor and the eastern reach. Brigand toll, ~ 15 gp per cart.",
    },
    {
      id: "mk5", n: 5,
      label: "The Drowned Vow",
      kind: "secret",
      x: 0.355, y: 0.825,
      dmOnly: true,
      sharedWith: [],
      linkedSection: null,
      notes: "Sunken cathedral beneath the southern shoals. Not on any chart the party owns — surfaces only at low tide on the night of a new moon.",
    },
  ];

  return { MAPS, PCS, MARKERS };
})();
