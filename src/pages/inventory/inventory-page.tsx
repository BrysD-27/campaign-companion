import { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpDown, EyeOff, Filter, LayoutGrid, List, Plus, Search } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { useCampaignContext } from '@/context/campaign-context'
import { useCampaignRole } from '@/hooks/use-campaign-role'
import { api } from '@/lib/api'
import { ItemCard } from './item-card'
import { ItemDetail } from './item-detail'
import type { Item } from './item-types'
import { ITEM_TYPES, RARITIES, RARITY_COLORS, RARITY_ORDER, RARITY_RGB } from './item-types'
import { Button } from '@/components/ui/button'

function normalizeItem(s: any, idx: number): Item {
  return {
    id:          s.itemId      ?? s.id          ?? `item-${idx}`,
    name:        s.name        ?? s.title        ?? 'Untitled Item',
    type:        s.type        ?? s.itemType     ?? 'misc',
    rarity:      s.rarity                        ?? 'common',
    dmOnly:      s.dmOnly      ?? s.isDmOnly     ?? false,
    tagline:     s.tagline     ?? s.subtitle     ?? '',
    description: s.description                   ?? '',
    properties:  s.properties                    ?? [],
    lore:        s.lore        ?? s.loreId       ?? null,
    inventory:   s.inventory                     ?? [],
  }
}

const InventoryPage = () => {
  const { campaignId } = useParams()
  const { token }     = useAuth()
  const { campaign }  = useCampaignContext()
  const { isDM }      = useCampaignRole()

  const { data: rawItems = [], isLoading } = useQuery({
    queryKey: ['items', campaignId],
    queryFn:  () => api.get<any[]>(`/campaigns/${campaignId}/items`, token!),
  })

  const baseItems: Item[] = rawItems.map(normalizeItem)

  const [newItems,   setNewItems]   = useState<Item[]>([])
  const [localEdits, setLocalEdits] = useState<Record<string, Partial<Item>>>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query,      setQuery]      = useState('')
  const [typeFilter,   setTypeFilter]   = useState('all')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [dmOnlyFilter, setDmOnlyFilter] = useState<'all' | 'dm'>('all')

  const allItems = [...baseItems, ...newItems].map(s => ({ ...s, ...(localEdits[s.id] ?? {}) }))

  function patchItem(id: string, patch: Partial<Item>) {
    setLocalEdits(prev => ({ ...prev, [id]: { ...(prev[id] ?? {}), ...patch } }))
  }

  function newItem() {
    const id: string = `new-${Date.now()}`
    const item: Item = {
      id,
      name: 'Untitled Item',
      type: 'misc',
      rarity: 'common',
      dmOnly: false,
      tagline: 'An entry awaiting a name.',
      description: '',
      properties: [],
      lore: null,
      inventory: [],
    }
    setNewItems(prev => [item, ...prev])
    setSelectedId(id)
  }

  const filtered = allItems.filter(it => {
    if (typeFilter !== 'all' && it.type !== typeFilter) return false
    if (rarityFilter !== 'all' && it.rarity !== rarityFilter) return false
    if (dmOnlyFilter === 'dm' && !it.dmOnly) return false
    if (!isDM && it.dmOnly) return false
    if (query) {
      const q = query.toLowerCase()
      if (!it.name.toLowerCase().includes(q) && !(it.tagline ?? '').toLowerCase().includes(q)) return false
    }
    return true
  })

  const grouped = RARITY_ORDER
    .map(r => ({ rarity: r, items: filtered.filter(i => i.rarity === r) }))
    .filter(g => g.items.length > 0)

  const effectiveSelectedId = selectedId ?? allItems[0]?.id ?? null
  const selected = allItems.find(i => i.id === effectiveSelectedId) ?? null
  const hiddenCount = allItems.filter(i => i.dmOnly).length

  return (
    <div
      className="-m-6 flex flex-col overflow-hidden"
      style={{ height: 'calc(100vh - var(--header-height))' }}
    >
      {/* Topbar */}
      <div
        className="flex items-center gap-4 border-b border-border bg-card shrink-0"
        style={{ padding: '16px 24px 14px' }}
      >
        <div>
          <div className="flex items-baseline gap-3.5 mt-1">
            <h1
              className="text-[26px] leading-[1.05] text-foreground font-medium"
            >
              Items
            </h1>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
              {allItems.length} ENTRIES · {hiddenCount} HIDDEN
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant={'outline'}
          >
            <Filter /> Bulk Actions
          </Button>
          <Button
            onClick={newItem}
          >
            <Plus size={13} strokeWidth={2.5} /> New Item
          </Button>
        </div>
      </div>

      {/* Content row */}
      <div className="flex flex-1 min-h-0">
        {/* List column */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Search + view toggles */}
          <div className="flex items-center gap-2.5 px-6 py-3 border-b border-border/30 shrink-0 bg-background/50">
            <div
              className="flex-1 flex items-center gap-2 px-3 py-2 border border-border/50"
              style={{ background: 'rgba(10,14,21,0.4)' }}
            >
              <Search size={14} className="text-muted-foreground/40 shrink-0" />
              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-[13px] text-foreground placeholder:text-muted-foreground/35"
                placeholder="Search items, taglines, lore…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="font-mono text-[10px] text-muted-foreground/35 border border-border/30 px-1 py-px">⌘K</span>
            </div>
            <button
              type="button"
              className="w-8 h-8 grid place-items-center border border-border/50 text-muted-foreground/60 hover:text-muted-foreground transition-colors bg-background/50"
            >
              <ArrowUpDown size={14} />
            </button>
            <button
              type="button"
              className="w-8 h-8 grid place-items-center border rounded"
              style={{ color: 'var(--primary)', border: '1px solid var(--primary)', background: 'rgba(201,162,91,0.10)' }}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              type="button"
              className="w-8 h-8 grid place-items-center border border-border/50 text-muted-foreground/60 hover:text-muted-foreground transition-colors bg-background/50"
            >
              <List size={14} />
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-border/30 shrink-0 flex-wrap">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40 pr-1">Type</span>
            {(['all', ...ITEM_TYPES.map(t => t.id)] as const).map(id => {
              const label  = id === 'all' ? 'All' : ITEM_TYPES.find(t => t.id === id)?.label ?? id
              const active = typeFilter === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTypeFilter(id)}
                  className="font-mono text-[10.5px] tracking-wide uppercase px-2.5 py-1 transition-colors"
                  style={{
                    border:     active ? '1px solid var(--primary)' : '1px solid hsl(var(--border))',
                    color:      active ? 'var(--primary)'           : 'hsl(var(--muted-foreground))',
                    background: active ? 'rgba(201,162,91,0.08)' : 'transparent',
                  }}
                >
                  {label}
                </button>
              )
            })}

            <span className="w-px h-4 bg-border/40 mx-1" />

            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/40 pr-1">Rarity</span>
            {(['all', ...RARITIES.map(r => r.id)] as const).map(id => {
              const active = rarityFilter === id
              if (id === 'all') {
                return (
                  <button
                    key="all"
                    type="button"
                    onClick={() => setRarityFilter('all')}
                    className="font-mono text-[10.5px] tracking-wide uppercase px-2.5 py-1 transition-colors"
                    style={{
                      border:     active ? '1px solid var(--primary)' : '1px solid hsl(var(--border))',
                      color:      active ? 'var(--primary)'           : 'hsl(var(--muted-foreground))',
                      background: active ? 'rgba(201,162,91,0.08)' : 'transparent',
                    }}
                  >
                    Any
                  </button>
                )
              }
              const color  = RARITY_COLORS[id]
              const rgb    = RARITY_RGB[id]
              const label  = RARITIES.find(r => r.id === id)?.label ?? id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRarityFilter(id)}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-wide uppercase px-2.5 py-1 transition-colors"
                  style={{
                    border:     active ? `1px solid ${color}`         : '1px solid hsl(var(--border))',
                    color:      active ? color                         : 'hsl(var(--muted-foreground))',
                    background: active ? `rgba(${rgb},0.08)`          : 'transparent',
                  }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rotate-45 shrink-0"
                    style={{ background: color }}
                  />
                  {label}
                </button>
              )
            })}

            {isDM && (
              <>
                <span className="w-px h-4 bg-border/40 mx-1" />
                <button
                  type="button"
                  onClick={() => setDmOnlyFilter(dmOnlyFilter === 'dm' ? 'all' : 'dm')}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-wide uppercase px-2.5 py-1 transition-colors"
                  style={{
                    border:     dmOnlyFilter === 'dm' ? '1px solid var(--crimson)'        : '1px solid hsl(var(--border))',
                    color:      dmOnlyFilter === 'dm' ? 'var(--crimson)'                  : 'hsl(var(--muted-foreground))',
                    background: dmOnlyFilter === 'dm' ? 'rgba(138,58,58,0.1)'             : 'transparent',
                  }}
                >
                  <EyeOff size={10} /> DM Only
                </button>
              </>
            )}

            <span className="ml-auto font-mono text-[10.5px] text-muted-foreground/40 tracking-[0.04em]">
              {filtered.length} of {allItems.length} entries
            </span>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="flex-1 grid place-items-center font-mono text-[11px] tracking-widest uppercase text-muted-foreground/30">
              Loading…
            </div>
          ) : (
            <div className="overflow-auto flex-1">
              {grouped.length === 0 ? (
                <div className="py-16 text-center">
                  <div
                    className="text-[18px] text-muted-foreground/40 mb-1.5"
                    style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                  >
                    The vault is silent.
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground/30">
                    NO MATCHES — TRY LOOSENING THE FILTERS
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 14,
                    padding: '20px 24px 28px',
                    alignContent: 'start',
                  }}
                >
                  {grouped.map(g => {
                    const color = RARITY_COLORS[g.rarity]
                    const label = RARITIES.find(r => r.id === g.rarity)?.label ?? g.rarity
                    return (
                      <Fragment key={g.rarity}>
                        {/* Group header — spans full grid width */}
                        <div
                          className="flex items-center gap-3 pt-2 pb-1"
                          style={{ gridColumn: '1 / -1' }}
                        >
                          <span
                            className="font-mono text-[10px] tracking-widest uppercase shrink-0"
                            style={{ color }}
                          >
                            {label}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground/40 shrink-0">
                            {g.items.length}
                          </span>
                          <span className="flex-1 h-px bg-border/30" />
                        </div>
                        {g.items.map(it => (
                          <ItemCard
                            key={it.id}
                            item={it}
                            active={it.id === effectiveSelectedId}
                            onClick={() => setSelectedId(it.id)}
                          />
                        ))}
                      </Fragment>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <ItemDetail
          key={effectiveSelectedId ?? 'none'}
          item={selected}
          onPatch={(patch) => selected && patchItem(selected.id, patch)}
          onClose={() => setSelectedId(null)}
          isDM={isDM}
        />
      </div>
    </div>
  )
}

export default InventoryPage
