import { useState } from 'react'
import {
  Bold, Calendar, Check, ChevronRight, Heading, Italic, Link,
  List, MoreHorizontal, Plus, Quote, Sparkles, Users, X,
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { ModePill } from './session-row'
import type { Session, SessionMode } from './session-types'
import { MODE_COLORS, MODE_LABELS } from './session-types'

function SectionHeader({
  title,
  badge,
  children,
}: {
  title: string
  badge?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2.5 mt-7 mb-3.5">
      <span className="font-mono text-[10.5px] tracking-widest text-muted-foreground/50 uppercase shrink-0">
        {title}
      </span>
      {badge}
      <span className="flex-1 h-px bg-border/30" />
      {children}
    </div>
  )
}

function ModeStepper({
  mode,
  onChange,
}: {
  mode: SessionMode
  onChange: (m: SessionMode) => void
}) {
  const order: SessionMode[] = ['prep', 'live', 'complete']
  const idx = order.indexOf(mode)

  const items: React.ReactNode[] = []
  order.forEach((m, i) => {
    const active = i === idx
    const done = i < idx
    const color = MODE_COLORS[m]
    items.push(
      <button
        key={m}
        type="button"
        onClick={() => onChange(m)}
        className="flex items-center justify-center gap-2.5 font-mono uppercase transition-colors"
        style={{
          padding: '10px 14px',
          fontSize: 11,
          letterSpacing: '0.1em',
          fontWeight: active ? 600 : 500,
          background: active ? `${color}1f` : 'transparent',
          border: active ? `1px solid ${color}` : '1px solid transparent',
          color: active ? color : 'var(--muted-foreground)',
          cursor: 'pointer',
        }}
      >
        <span
          className="grid place-items-center font-mono text-[10px] shrink-0"
          style={{
            width: 22,
            height: 22,
            border: `1px solid ${active ? color : done ? 'var(--muted-foreground)' : 'rgba(255,255,255,0.15)'}`,
            color: active ? color : done ? 'var(--muted-foreground)' : 'rgba(255,255,255,0.3)',
            background: active ? 'rgba(0,0,0,0.3)' : 'transparent',
          }}
        >
          {done ? <Check size={10} strokeWidth={2.2} /> : i + 1}
        </span>
        {MODE_LABELS[m]}
      </button>
    )
    if (i < order.length - 1) {
      items.push(
        <span
          key={`div-${i}`}
          style={{
            height: 1,
            minWidth: 16,
            background: i < idx ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
          }}
        />
      )
    }
  })

  return (
    <div
      className="grid items-center border border-border/50"
      style={{
        gridTemplateColumns: '1fr auto 1fr auto 1fr',
        background: 'rgba(10,14,21,0.4)',
        padding: 4,
      }}
    >
      {items}
    </div>
  )
}

function OverviewTab({
  session,
  onPatch,
}: {
  session: Session
  onPatch: (p: Partial<Session>) => void
}) {
  const [recap, setRecap] = useState(session.recap ?? '')

  return (
    <div className="flex-1 overflow-auto" style={{ padding: '28px 32px 40px' }}>
      <div className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase mb-1.5">
        SESSION {String(session.no ?? '?').padStart(2, '0')} ·{' '}
        {session.mode === 'live' ? 'RECORDING' : 'DRAFT'}
      </div>

      <input
        type="text"
        className="w-full bg-transparent border-none outline-none text-foreground p-0"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 34,
          lineHeight: 1.05,
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}
        value={session.title}
        onChange={(e) => onPatch({ title: e.target.value })}
      />

      <div className="flex items-center gap-4 flex-wrap mt-3.5 font-mono text-[10.5px] tracking-wide text-muted-foreground/50 uppercase">
        {session.date && (
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} /> {session.date}
          </span>
        )}
        {session.created && (
          <>
            <span className="w-1 h-1 bg-muted-foreground/30 rotate-45 inline-block" />
            <span>Created {session.created}</span>
          </>
        )}
        <span className="w-1 h-1 bg-muted-foreground/30 rotate-45 inline-block" />
        <span className="inline-flex items-center gap-1.5">
          <Users size={12} />
          {session.pcs?.length ?? 0} PC · {session.npcs?.length ?? 0} NPC
        </span>
        {session.duration && (
          <>
            <span className="w-1 h-1 bg-muted-foreground/30 rotate-45 inline-block" />
            <span>
              {session.duration === 'in progress' ? '● IN PROGRESS' : `Ran ${session.duration}`}
            </span>
          </>
        )}
      </div>

      {/* Mode */}
      <SectionHeader title="Session Mode">
        {session.mode && session.mode !== 'complete' && (
          <button
            type="button"
            onClick={() => onPatch({ mode: session.mode === 'prep' ? 'live' : 'complete' })}
            className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-widest uppercase font-semibold"
            style={{
              color: 'var(--primary)',
              border: '1px solid rgba(201,162,91,0.5)',
              background: 'rgba(201,162,91,0.06)',
              padding: '6px 12px',
            }}
          >
            Advance to {session.mode === 'prep' ? 'Live' : 'Complete'}
            <ChevronRight size={11} />
          </button>
        )}
      </SectionHeader>
      {session.mode && (
        <ModeStepper mode={session.mode} onChange={(m) => onPatch({ mode: m })} />
      )}

      {/* Tags */}
      <SectionHeader
        title="Tags"
        badge={
          <span className="font-mono text-[10px] text-muted-foreground/40">
            {session.tags?.length ?? 0}
          </span>
        }
      />
      <div className="flex flex-wrap gap-2">
        {(session.tags ?? []).map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-wide uppercase text-muted-foreground border border-border/50 px-2.5 py-1"
          >
            <span className="w-1.5 h-1.5 bg-muted-foreground/50 rotate-45 inline-block shrink-0" />
            {tag.replace(/_/g, ' ')}
            <button
              type="button"
              onClick={() => onPatch({ tags: session.tags?.filter(t => t !== tag) })}
              className="w-4 h-4 grid place-items-center opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={9} />
            </button>
          </span>
        ))}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-wide uppercase"
          style={{
            color: 'var(--primary)',
            border: '1px dashed rgba(201,162,91,0.4)',
            padding: '4px 10px',
          }}
        >
          <Plus size={11} /> Add Tag
        </button>
      </div>

      {/* Recap */}
      <SectionHeader
        title="Recap"
        badge={
          <span className="font-mono text-[10px] text-muted-foreground/40">
            {recap.trim() ? `${recap.trim().split(/\s+/).length} words` : 'empty'}
          </span>
        }
      />
      <div className="border border-border/50" style={{ background: 'rgba(10,14,21,0.4)' }}>
        <div
          className="flex items-center gap-1 px-2.5 py-1.5 border-b border-border/30"
          style={{ background: 'rgba(20,26,38,0.5)' }}
        >
          {([Heading, Bold, Italic, Quote] as const).map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="grid place-items-center text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              style={{ width: 26, height: 26 }}
            >
              <Icon size={13} />
            </button>
          ))}
          <span className="w-px h-3.5 bg-border/30 mx-1.5" />
          {([List, Link] as const).map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="grid place-items-center text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              style={{ width: 26, height: 26 }}
            >
              <Icon size={13} />
            </button>
          ))}
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase"
            style={{
              color: 'var(--primary)',
              border: '1px solid rgba(201,162,91,0.45)',
              background: 'rgba(201,162,91,0.06)',
              padding: '5px 10px 5px 8px',
            }}
          >
            <Sparkles size={11} /> Generate with AI
          </button>
        </div>
        <Textarea
          value={recap}
          onChange={(e) => setRecap(e.target.value)}
          onBlur={() => onPatch({ recap })}
          placeholder="Begin the recap, or pull a draft from the session log…"
          className="border-none bg-transparent resize-none text-[15px] leading-[1.6] text-foreground min-h-[140px] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none placeholder:text-muted-foreground/30 placeholder:italic"
          style={{ fontFamily: 'Georgia, serif', padding: '16px 20px 20px' }}
        />
        <div
          className="flex items-center gap-3.5 px-3.5 py-2 border-t border-border/30 font-mono text-[9.5px] tracking-widest uppercase text-muted-foreground/30"
          style={{ background: 'rgba(20,26,38,0.4)' }}
        >
          <span>AUTOSAVED</span>
          <span className="w-1 h-1 bg-muted-foreground/20 rotate-45 inline-block" />
          <span>VISIBLE TO PARTY AFTER SESSION</span>
          <span className="ml-auto">MARKDOWN OK</span>
        </div>
      </div>
    </div>
  )
}

function PlaceholderTab({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex-1 grid place-items-center text-center px-6">
      <div>
        <div
          className="text-[22px] text-muted-foreground/40 mb-2"
          style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          {label}
        </div>
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-muted-foreground/30">
          {hint}
        </div>
      </div>
    </div>
  )
}

type Tab = 'overview' | 'prep' | 'log' | 'appearances'

export function SessionDetail({
  session,
  onPatch,
}: {
  session: Session | null
  onPatch: (patch: Partial<Session>) => void
}) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs: { id: Tab; label: string; count?: string | number | null }[] = [
    { id: 'overview', label: 'Overview' },
    {
      id: 'prep',
      label: 'Prep',
      count: session ? `${session.prepDone ?? 0}/${session.prepTotal ?? 0}` : null,
    },
    { id: 'log', label: 'Log' },
    {
      id: 'appearances',
      label: 'Appearances',
      count: session ? (session.npcs?.length ?? 0) + (session.pcs?.length ?? 0) : null,
    },
  ]

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
      <div
        className="flex items-center px-6 border-b border-border/30 shrink-0"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className="font-mono text-[11px] tracking-widest uppercase inline-flex items-center gap-1.5 mr-4 transition-colors shrink-0"
            style={{
              padding: '14px 0 12px',
              borderBottom:
                activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--foreground)' : 'var(--muted-foreground)',
              fontWeight: activeTab === tab.id ? 600 : 500,
            }}
          >
            {tab.label}
            {tab.count != null && (
              <span className="font-mono text-[9.5px] text-muted-foreground/40 bg-foreground/5 px-1.5 py-px">
                {tab.count}
              </span>
            )}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 pr-1">
          {session?.mode && <ModePill mode={session.mode} size="sm" />}
          <button
            type="button"
            className="w-7 h-7 grid place-items-center text-muted-foreground/40 hover:text-muted-foreground transition-colors"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {!session ? (
        <PlaceholderTab
          label="No session selected."
          hint="CHOOSE AN ENTRY FROM THE JOURNAL"
        />
      ) : activeTab === 'overview' ? (
        <OverviewTab key={session.sessionId} session={session} onPatch={onPatch} />
      ) : activeTab === 'prep' ? (
        <PlaceholderTab
          label="Prep checklist lives here."
          hint={`${session.prepDone ?? 0} OF ${session.prepTotal ?? 0} ITEMS COMPLETE`}
        />
      ) : activeTab === 'log' ? (
        <PlaceholderTab
          label="Live session log."
          hint="OPEN DURING PLAY TO RECORD BEATS, QUOTES, AND DECISIONS"
        />
      ) : (
        <PlaceholderTab
          label="Who showed up."
          hint={`${session.pcs?.length ?? 0} PARTY MEMBERS · ${session.npcs?.length ?? 0} NPCS APPEARED`}
        />
      )}
    </div>
  )
}
