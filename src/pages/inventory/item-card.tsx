import { Box, EyeOff, FlaskConical, Gem, Shield, Sword } from 'lucide-react'
import type { Item } from './item-types'
import { ITEM_TYPES, RARITIES, RARITY_COLORS, RARITY_RGB } from './item-types'

export function ThumbGlyph({ type, rarity }: { type: string; rarity: string }) {
  const color = RARITY_COLORS[rarity] ?? 'rgba(232,226,210,0.28)'
  const stroke = 'rgba(232,226,210,0.28)'
  const p = { size: 42, strokeWidth: 1.2 }
  if (type === 'weapon')     return <Sword        {...p} stroke={stroke} />
  if (type === 'armor')      return <Shield       {...p} stroke={stroke} />
  if (type === 'artifact')   return <Gem          {...p} stroke={color} />
  if (type === 'consumable') return <FlaskConical {...p} stroke={stroke} />
  return <Box {...p} stroke={stroke} />
}

export function ItemCard({
  item,
  active,
  onClick,
}: {
  item: Item
  active: boolean
  onClick: () => void
}) {
  const typeLabel   = ITEM_TYPES.find(t => t.id === item.type)?.label   ?? item.type
  const rarityLabel = RARITIES.find(r  => r.id === item.rarity)?.label  ?? item.rarity
  const color       = RARITY_COLORS[item.rarity] ?? 'var(--rarity-common)'
  const rgb         = RARITY_RGB[item.rarity]    ?? '138,134,118'

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col self-start overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-[120ms]"
      style={{
        minHeight: 280,
        background: active
          ? `linear-gradient(180deg, rgba(201,162,91,0.07), hsl(var(--card)))`
          : 'hsl(var(--card))',
        border: active
          ? '1px solid rgba(201,162,91,0.55)'
          : '1px solid hsl(var(--border))',
        boxShadow: active
          ? '0 0 0 1px rgba(201,162,91,0.18), 0 8px 24px rgba(0,0,0,0.25)'
          : '0 2px 8px rgba(0,0,0,0.12)',
      }}
    >
      {/* Thumb */}
      <div
        className="relative flex-shrink-0 overflow-hidden border-b border-border"
        style={{
          height: 110,
          background: `linear-gradient(135deg, rgba(${rgb},0.18), rgba(10,14,21,0.85))`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(232,226,210,0.04) 0 1px, transparent 1px 9px)',
          }}
        />
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ color: 'rgba(232,226,210,0.18)' }}
        >
          <ThumbGlyph type={item.type} rarity={item.rarity} />
        </div>
        {/* Rarity bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
      </div>

      {/* DM-only badge */}
      {item.dmOnly && (
        <div
          className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5"
          style={{
            color: 'var(--crimson)',
            border: '1px solid rgba(138,58,58,0.5)',
            background: 'rgba(20,10,10,0.7)',
          }}
        >
          <EyeOff size={9} strokeWidth={1.8} /> DM Only
        </div>
      )}

      {/* Body */}
      <div className="p-3 pb-3.5 flex flex-col flex-1">
        <div
          className="text-[18px] leading-tight text-foreground font-medium mb-1.5"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.01em' }}
        >
          {item.name}
        </div>
        {item.tagline && (
          <div className="text-[11.5px] text-muted-foreground/60 italic leading-[1.3] min-h-[28px]">
            {item.tagline}
          </div>
        )}
        <div className="flex items-center gap-2 mt-auto pt-2.5">
          <span className="font-mono text-[9.5px] tracking-widest uppercase text-muted-foreground/70 border border-border px-1.5 py-0.5">
            {typeLabel}
          </span>
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-widest uppercase"
            style={{ color }}
          >
            <span
              className="inline-block w-[7px] h-[7px] rotate-45 shrink-0"
              style={{ background: color, boxShadow: `0 0 5px ${color}` }}
            />
            {rarityLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
