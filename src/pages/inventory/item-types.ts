export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
export type ItemType = 'weapon' | 'armor' | 'artifact' | 'consumable' | 'misc'

export const RARITY_COLORS: Record<string, string> = {
  common:    'var(--rarity-common)',
  uncommon:  'var(--rarity-uncommon)',
  rare:      'var(--rarity-rare)',
  epic:      'var(--rarity-epic)',
  legendary: 'var(--rarity-legendary)',
}

export const RARITY_RGB: Record<string, string> = {
  common:    '138,134,118',
  uncommon:  '122,156,90',
  rare:      '90,122,156',
  epic:      '156,122,201',
  legendary: '201,162,91',
}

export const RARITY_ORDER = ['legendary', 'epic', 'rare', 'uncommon', 'common'] as const

export const ITEM_TYPES = [
  { id: 'weapon',     label: 'Weapon' },
  { id: 'armor',      label: 'Armor' },
  { id: 'artifact',   label: 'Artifact' },
  { id: 'consumable', label: 'Consumable' },
  { id: 'misc',       label: 'Misc' },
] as const

export const RARITIES = [
  { id: 'common',    label: 'Common' },
  { id: 'uncommon',  label: 'Uncommon' },
  { id: 'rare',      label: 'Rare' },
  { id: 'epic',      label: 'Epic' },
  { id: 'legendary', label: 'Legendary' },
] as const

export interface ItemProperty {
  k: string
  v: string
}

export interface InventoryRow {
  who: string
  qty: number
}

export interface Item {
  id: string
  name: string
  type: string
  rarity: string
  dmOnly: boolean
  tagline?: string
  description?: string
  properties: ItemProperty[]
  lore?: string | null
  inventory: InventoryRow[]
}

// Static reference data — embedded since no dedicated API endpoints exist yet
export const PARTY_MEMBERS = [
  { id: 'kael',  name: 'Kael Vance',      role: 'Warden',      initials: 'KV', tone: '#7a9c5a' },
  { id: 'sera',  name: 'Sera Ilenne',     role: 'Stormcaller', initials: 'SI', tone: '#5a7a9c' },
  { id: 'thom',  name: 'Thom Underbrook', role: 'Trickster',   initials: 'TU', tone: '#c9a25b' },
  { id: 'vex',   name: 'Vex of Ash',      role: 'Beastbound',  initials: 'VA', tone: '#8a3a3a' },
  { id: 'party', name: 'Party Stash',     role: 'Shared',      initials: '★',  tone: '#8a8676' },
]

export const LORE_ENTRIES = [
  { id: 'l1', title: 'The Sundered Crown',          kind: 'Artifact Lore' },
  { id: 'l2', title: 'House Veyrun, Fall of',       kind: 'House' },
  { id: 'l3', title: 'The Glassmere Pact',          kind: 'Treaty' },
  { id: 'l4', title: 'Wyrmsong Hollow',             kind: 'Location' },
  { id: 'l5', title: 'The Pale Choir',              kind: 'Faction' },
  { id: 'l6', title: 'Embergloss Forge, ruins of',  kind: 'Location' },
  { id: 'l7', title: 'Saint Orenna the Quiet',      kind: 'Figure' },
]
