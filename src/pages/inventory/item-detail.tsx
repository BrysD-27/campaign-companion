import { useState } from 'react'
import {
  Bold, BookOpen, Check, ChevronRight, Eye, EyeOff,
  Heading, Italic, Link, List, Pencil, Plus, Quote, Search, Trash2, X,
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { ThumbGlyph } from './item-card'
import type { Item, ItemProperty } from './item-types'
import {
  ITEM_TYPES, LORE_ENTRIES, PARTY_MEMBERS, RARITIES,
  RARITY_COLORS, RARITY_RGB,
} from './item-types'

function SectionHead({
  title,
  badge,
  children,
}: {
  title: string
  badge?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2.5 mt-6 mb-3">
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 shrink-0">
        {title}
      </span>
      {badge}
      <span className="flex-1 h-px bg-border/40" />
      {children}
    </div>
  )
}

export function ItemDetail({
  item,
  onPatch,
  onClose,
  isDM = true,
}: {
  item: Item | null
  onPatch: (p: Partial<Item>) => void
  onClose: () => void
  isDM?: boolean
}) {
  const [loreSearchOpen, setLoreSearchOpen] = useState(false)
  const [loreQuery, setLoreQuery] = useState('')
  const [description, setDescription] = useState(item?.description ?? '')
  const [hoveredProp, setHoveredProp] = useState<number | null>(null)

  if (!item) {
    return (
      <aside
        className="border-l border-border bg-card flex-shrink-0 grid place-items-center text-center px-10 overflow-auto"
        style={{ width: 460 }}
      >
        <div>
          <div
            className="text-[22px] text-muted-foreground/40 mb-2"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            No item selected.
          </div>
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-muted-foreground/30">
            CHOOSE AN ENTRY FROM THE VAULT
          </div>
        </div>
      </aside>
    )
  }

  const color       = RARITY_COLORS[item.rarity] ?? 'var(--rarity-common)'
  const rgb         = RARITY_RGB[item.rarity]    ?? '138,134,118'
  const rarityLabel = RARITIES.find(r   => r.id  === item.rarity)?.label ?? item.rarity
  const typeLabel   = ITEM_TYPES.find(t => t.id  === item.type)?.label   ?? item.type
  const linkedLore  = LORE_ENTRIES.find(l => l.id === item.lore)
  const totalHeld   = item.inventory.reduce((s, r) => s + r.qty, 0)

  const filteredLore = LORE_ENTRIES.filter(l =>
    !loreQuery ||
    l.title.toLowerCase().includes(loreQuery.toLowerCase()) ||
    l.kind.toLowerCase().includes(loreQuery.toLowerCase())
  )

  function setProp(idx: number, key: keyof ItemProperty, val: string) {
    onPatch({ properties: item?.properties.map((p, i) => i === idx ? { ...p, [key]: val } : p) })
  }
  function delProp(idx: number) {
    onPatch({ properties: item?.properties.filter((_, i) => i !== idx) })
  }
  function adjustQty(who: string, delta: number) {
    onPatch({
      inventory: item?.inventory
        .map(r => r.who === who ? { ...r, qty: Math.max(0, r.qty + delta) } : r)
        .filter(r => r.qty > 0),
    })
  }

  return (
    <aside
      className="border-l border-border bg-card flex-shrink-0 overflow-auto"
      style={{ width: 460 }}
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden border-b border-border/60 flex-shrink-0"
        style={{
          height: 220,
          background: `linear-gradient(180deg, rgba(${rgb},0.22) 0%, hsl(var(--card)) 100%)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: color, boxShadow: `0 0 12px ${color}` }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(232,226,210,0.04) 0 1px, transparent 1px 11px), radial-gradient(circle at 50% 60%, rgba(232,226,210,0.08), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="absolute w-[130px] h-[130px] rotate-45 border"
            style={{ borderColor: `${color}55` }}
          />
          <div style={{ color: 'rgba(232,226,210,0.18)' }}>
            <ThumbGlyph type={item.type} rarity={item.rarity} />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-[30px] h-[30px] grid place-items-center border border-border/60 bg-background/70 text-muted-foreground/70 hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>
        <div className="absolute bottom-2.5 left-4 font-mono text-[9.5px] tracking-widest text-muted-foreground/40 uppercase">
          ENTRY · {item.id.toUpperCase()}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-8 pt-5">
        <h2
          className="text-[28px] leading-[1.05] text-foreground font-medium"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.01em' }}
        >
          {item.name}
        </h2>
        {item.tagline && (
          <div
            className="text-[14px] text-muted-foreground/60 mt-2 leading-[1.4]"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            "{item.tagline}"
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2.5 flex-wrap mt-3.5">
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase"
            style={{
              color,
              padding: '3px 8px',
              border: `1px solid ${color}`,
              background: `rgba(${rgb},0.07)`,
            }}
          >
            <span
              className="w-[7px] h-[7px] rotate-45 inline-block shrink-0"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
            {rarityLabel}
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground border border-border px-2 py-0.5">
            {typeLabel}
          </span>
          {isDM && (
            <button
              type="button"
              onClick={() => onPatch({ dmOnly: !item.dmOnly })}
              className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-2.5 py-1.5 transition-colors"
              style={{
                border:      item.dmOnly ? '1px solid rgba(138,58,58,0.6)' : '1px solid hsl(var(--border))',
                background:  item.dmOnly ? 'rgba(60,20,20,0.5)'            : 'transparent',
                color:       item.dmOnly ? 'var(--crimson)'                 : 'hsl(var(--muted-foreground))',
              }}
            >
              {item.dmOnly ? <EyeOff size={12} /> : <Eye size={12} />}
              {item.dmOnly ? 'DM Only' : 'Visible'}
            </button>
          )}
        </div>

        {/* Description */}
        <SectionHead title="Description">
          <Pencil size={12} className="text-muted-foreground/40" />
        </SectionHead>
        <div className="border border-border/50" style={{ background: 'rgba(10,14,21,0.3)' }}>
          <div
            className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border/30"
            style={{ background: 'rgba(20,26,38,0.5)' }}
          >
            {([Heading, Bold, Italic, Quote] as const).map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="w-[26px] h-[26px] grid place-items-center text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                <Icon size={13} />
              </button>
            ))}
            <span className="w-px h-3.5 bg-border/30 mx-1.5" />
            {([List, Link] as const).map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="w-[26px] h-[26px] grid place-items-center text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                <Icon size={13} />
              </button>
            ))}
            <span className="ml-auto font-mono text-[9px] tracking-widest text-muted-foreground/30 uppercase">
              SAVED · 2m
            </span>
          </div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => onPatch({ description })}
            placeholder="Add a description…"
            className="border-none bg-transparent resize-none text-[15px] leading-[1.55] text-foreground min-h-[100px] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none placeholder:text-muted-foreground/30"
            style={{ fontFamily: 'Georgia, serif', padding: '14px 16px 16px' }}
          />
        </div>

        {/* Properties */}
        <SectionHead
          title="Properties"
          badge={
            <span className="font-mono text-[10px] text-muted-foreground/40">
              {item.properties.length}
            </span>
          }
        />
        <div className="border-t border-border/30">
          {item.properties.map((p, i) => (
            <div
              key={i}
              className="grid items-center border-b border-border/30 py-2.5"
              style={{ gridTemplateColumns: '1fr 1.2fr 24px' }}
              onMouseEnter={() => setHoveredProp(i)}
              onMouseLeave={() => setHoveredProp(null)}
            >
              <input
                className="font-mono text-[11px] tracking-[0.05em] uppercase text-muted-foreground/70 bg-transparent border-none outline-none pr-2"
                value={p.k}
                onChange={(e) => setProp(i, 'k', e.target.value)}
              />
              <input
                className="text-[14.5px] text-foreground bg-transparent border-none outline-none px-1.5"
                style={{ fontFamily: 'Georgia, serif' }}
                value={p.v}
                onChange={(e) => setProp(i, 'v', e.target.value)}
              />
              <button
                type="button"
                onClick={() => delProp(i)}
                className="w-[22px] h-[22px] grid place-items-center text-muted-foreground/30 hover:text-destructive transition-all"
                style={{ opacity: hoveredProp === i ? 1 : 0 }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onPatch({ properties: [...item.properties, { k: 'Property', v: '—' }] })}
          className="inline-flex items-center gap-1.5 mt-3 font-mono text-[10.5px] tracking-widest uppercase"
          style={{ color: 'var(--gold)', border: '1px dashed rgba(201,162,91,0.4)', padding: '7px 12px' }}
        >
          <Plus size={11} /> Add Property
        </button>

        {/* Linked Lore */}
        <SectionHead title="Linked Lore Entry" />
        {!loreSearchOpen ? (
          linkedLore ? (
            <button
              type="button"
              onClick={() => setLoreSearchOpen(true)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 border border-border/50 bg-card/50 hover:border-border transition-colors text-left"
            >
              <BookOpen size={14} className="shrink-0" style={{ color: 'var(--gold)' }} />
              <div className="flex-1 min-w-0">
                <div
                  className="text-[15px] text-foreground leading-tight"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {linkedLore.title}
                </div>
                <div className="font-mono text-[9.5px] tracking-widest uppercase text-muted-foreground/50 mt-0.5">
                  {linkedLore.kind}
                </div>
              </div>
              <ChevronRight size={14} className="text-muted-foreground/40 shrink-0" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setLoreSearchOpen(true)}
              className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-widest uppercase text-muted-foreground/60"
              style={{ border: '1px dashed hsl(var(--border))', padding: '7px 12px' }}
            >
              <Link size={11} /> Link a lore entry
            </button>
          )
        ) : (
          <div>
            <div className="flex items-center gap-2 px-3 py-2 border border-border/50 bg-card/50">
              <Search size={13} className="text-muted-foreground/50 shrink-0" />
              <input
                autoFocus
                placeholder="Search the codex…"
                value={loreQuery}
                onChange={(e) => setLoreQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[13px] text-foreground placeholder:text-muted-foreground/40"
              />
              <button
                type="button"
                onClick={() => { setLoreSearchOpen(false); setLoreQuery('') }}
              >
                <X size={13} className="text-muted-foreground/50" />
              </button>
            </div>
            <div className="border border-t-0 border-border/50 max-h-[220px] overflow-auto">
              {filteredLore.map(l => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    onPatch({ lore: l.id })
                    setLoreSearchOpen(false)
                    setLoreQuery('')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 border-b border-border/30 text-left transition-colors hover:bg-accent/30"
                  style={{ background: l.id === item.lore ? 'rgba(201,162,91,0.08)' : undefined }}
                >
                  <BookOpen
                    size={13}
                    className="shrink-0"
                    style={{ color: l.id === item.lore ? 'var(--gold)' : undefined }}
                  />
                  <div className="flex-1">
                    <div
                      className="text-[14px] text-foreground"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {l.title}
                    </div>
                    <div className="font-mono text-[9.5px] tracking-widest uppercase text-muted-foreground/50">
                      {l.kind}
                    </div>
                  </div>
                  {l.id === item.lore && <Check size={13} style={{ color: 'var(--gold)' }} />}
                </button>
              ))}
              {!filteredLore.length && (
                <div className="py-4 text-center font-mono text-[10.5px] tracking-widest text-muted-foreground/30">
                  NO ENTRIES MATCH
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inventory */}
        <SectionHead
          title="Inventory"
          badge={
            <span className="font-mono text-[10px] text-muted-foreground/40">
              {totalHeld} held
            </span>
          }
        />
        <div>
          {item.inventory.length === 0 && (
            <div
              className="py-3 text-[14px] text-muted-foreground/40 italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Held by no one yet.
            </div>
          )}
          {item.inventory.map(row => {
            const member = PARTY_MEMBERS.find(p => p.id === row.who)
            if (!member) return null
            return (
              <div
                key={row.who}
                className="grid items-center gap-3 py-2.5 border-b border-border/30"
                style={{ gridTemplateColumns: '30px 1fr auto auto' }}
              >
                <div
                  className="w-7 h-7 grid place-items-center text-foreground font-semibold text-[12px] shrink-0"
                  style={{
                    fontFamily: 'Georgia, serif',
                    background: `linear-gradient(135deg, ${member.tone}55, ${member.tone}22)`,
                    border: `1px solid ${member.tone}66`,
                  }}
                >
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <div
                    className="text-[14.5px] text-foreground leading-tight truncate"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {member.name}
                  </div>
                  <div className="font-mono text-[9.5px] tracking-widest uppercase text-muted-foreground/50 mt-0.5">
                    {member.role}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => adjustQty(row.who, -1)}
                    className="w-[22px] h-[22px] grid place-items-center text-muted-foreground/60 border border-border/50 hover:text-foreground transition-colors text-sm leading-none"
                  >
                    −
                  </button>
                  <span className="font-mono text-[11px] tracking-[0.03em] text-muted-foreground border border-border/40 px-2 py-0.5">
                    ×{row.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => adjustQty(row.who, +1)}
                    className="w-[22px] h-[22px] grid place-items-center text-muted-foreground/60 border border-border/50 hover:text-foreground transition-colors text-sm leading-none"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onPatch({ inventory: item.inventory.filter(r => r.who !== row.who) })}
                  className="text-muted-foreground/30 hover:text-muted-foreground/70 transition-colors p-1"
                >
                  <X size={13} />
                </button>
              </div>
            )
          })}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 mt-2.5 font-mono text-[10.5px] tracking-widest uppercase text-muted-foreground/60"
          style={{ border: '1px dashed hsl(var(--border))', padding: '7px 12px' }}
        >
          <Plus size={11} /> Assign to holder
        </button>

        {/* Footer */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-border/40">
          <button
            type="button"
            className="flex-1 py-2.5 px-3.5 font-mono text-[11px] tracking-widest uppercase font-semibold"
            style={{
              color: '#0c1018',
              background: 'linear-gradient(180deg, #d6b06a, #a8843e)',
              border: '1px solid rgba(201,162,91,0.7)',
            }}
          >
            Save changes
          </button>
          <button
            type="button"
            className="py-2.5 px-3.5 font-mono text-[11px] tracking-widest uppercase text-muted-foreground border border-border/50 hover:border-border transition-colors"
          >
            Duplicate
          </button>
          {isDM && (
            <button
              type="button"
              className="py-2.5 px-3 border grid place-items-center hover:opacity-80 transition-opacity"
              style={{ color: 'var(--crimson)', borderColor: 'rgba(138,58,58,0.5)' }}
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
