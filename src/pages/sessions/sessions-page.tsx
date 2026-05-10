import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'
import { useCampaignContext } from '@/context/campaign-context'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SessionDetail } from './session-detail'
import { SessionRow } from './session-row'
import type { Session, SessionMode } from './session-types'

function normalizeSession(s: any): Session {
  return {
    sessionId: s.sessionId ?? s.id ?? String(Math.random()),
    no: s.sessionNumber ?? s.no,
    title: s.title ?? 'Untitled Session',
    date: s.scheduledDate ?? s.date,
    created: s.createdAt ?? s.created,
    mode: s.mode,
    tags: s.tags ?? [],
    npcs: s.npcs ?? [],
    pcs: s.pcs ?? [],
    recap: s.recap ?? s.summary ?? '',
    prepDone: s.prepDone ?? s.prepItemsDone,
    prepTotal: s.prepTotal ?? s.prepItemsTotal,
    duration: s.duration ?? null,
  }
}

function groupByMonth(sessions: Session[]): Record<string, Session[]> {
  const byMonth: Record<string, Session[]> = {}
  sessions.forEach(s => {
    let month = 'Upcoming'
    if (s.date) {
      try {
        const d = new Date(s.date)
        month = isNaN(d.getTime())
          ? s.date.split(',')[0].split(' ').slice(0, 2).join(' ') + (s.date.includes(',') ? ',' + s.date.split(',')[1] : '')
          : d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      } catch {
        month = s.date
      }
    }
    ; (byMonth[month] = byMonth[month] ?? []).push(s)
  })
  return byMonth
}

const SessionsPage = () => {
  const { campaignId } = useParams()
  const { token } = useAuth()
  const { campaign } = useCampaignContext()

  const { data: rawSessions = [], isLoading } = useQuery({
    queryKey: ['sessions', campaignId],
    queryFn: () => api.get<any[]>(`/campaigns/${campaignId}/sessions`, token!),
  })

  const baseSessions: Session[] = rawSessions.map(normalizeSession)

  const [localEdits, setLocalEdits] = useState<Record<string, Partial<Session>>>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [modeFilter, setModeFilter] = useState<SessionMode | 'all'>('all')

  const sessions = baseSessions.map(s => ({ ...s, ...(localEdits[s.sessionId] ?? {}) }))

  function patchSession(id: string, patch: Partial<Session>) {
    setLocalEdits(prev => ({ ...prev, [id]: { ...(prev[id] ?? {}), ...patch } }))
  }

  const filtered = sessions.filter(s => {
    if (modeFilter !== 'all' && s.mode !== modeFilter) return false
    if (query) {
      const q = query.toLowerCase()
      if (!s.title.toLowerCase().includes(q) && !(s.recap ?? '').toLowerCase().includes(q)) return false
    }
    return true
  })

  const byMonth = groupByMonth(filtered)

  const effectiveSelectedId = selectedId ?? sessions[0]?.sessionId ?? null
  const selected = sessions.find(s => s.sessionId === effectiveSelectedId) ?? null

  const totalComplete = sessions.filter(s => s.mode === 'complete').length
  const totalPrep = sessions.filter(s => s.mode === 'prep').length

  return (
    <div
      className="-m-6 flex flex-col overflow-hidden"
      style={{ height: 'calc(100vh - var(--header-height))' }}
    >
      {/* Topbar */}
      <div
        className="flex items-center gap-4 border-b border-border/40 shrink-0 bg-card"
        style={{
          padding: '16px 24px 14px',
        }}
      >
        <div>
          <div className="flex items-baseline gap-3.5 mt-1">
            <h1
              className="text-[26px] leading-[1.05] text-foreground font-medium"
              style={{ letterSpacing: '0.015em' }}
            >
              Sessions
            </h1>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
              {sessions.length} TOTAL · {totalComplete} LOGGED · {totalPrep} UPCOMING
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant={'outline'}
          >
            <Calendar size={12} /> Calendar View
          </Button>
          <Button
            type="button"
          >
            <Plus size={13} strokeWidth={2.5} /> New Session
          </Button>
        </div>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2.5 px-6 py-3 border-b border-border/30 shrink-0"
      >
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 border border-border/50"
        >
          <Search size={14} className="text-muted-foreground/40 shrink-0" />
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-[13px] text-foreground placeholder:text-muted-foreground/35"
            placeholder="Search session titles, recaps, NPC names…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="text-[10px] text-muted-foreground/35 border border-border/30 px-1 py-px tracking-[0.03em]">
            ⌘K
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-border/30 flex-wrap shrink-0">
        <span className="text-[10px] tracking-widest text-muted-foreground/45 uppercase pr-1">
          Mode
        </span>
        {(['all', 'prep', 'live', 'complete'] as const).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setModeFilter(m)}
            className="text-[10.5px] tracking-wide uppercase px-2.5 py-1 transition-colors"
            style={{
              border:
                modeFilter === m ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
              color: modeFilter === m ? 'var(--primary)' : 'var(--muted-foreground)',
              background: modeFilter === m ? 'rgba(201,162,91,0.08)' : 'transparent',
            }}
          >
            {m === 'all' ? 'All' : m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
        <span className="ml-auto font-mono text-[10.5px] text-muted-foreground/40 tracking-[0.04em]">
          {filtered.length} of {sessions.length} sessions
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0">
        {/* Session list */}
        <div
          className="flex flex-col border-r border-border/30 overflow-hidden shrink-0"
          style={{ width: 460 }}
        >
          {isLoading ? (
            <div className="flex-1 grid place-items-center text-[11px] tracking-widest uppercase text-muted-foreground/30">
              Loading…
            </div>
          ) : (
            <div className="overflow-auto flex-1 py-2 pb-6">
              {Object.entries(byMonth).map(([month, group]) => (
                <div key={month}>
                  <div className="flex items-center gap-2.5 px-6 pb-1.5 pt-3.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/45 shrink-0">
                      {month}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/35">
                      {group.length}
                    </span>
                    <span className="flex-1 h-px bg-border/25" />
                  </div>
                  {group.map(s => (
                    <SessionRow
                      key={s.sessionId}
                      session={s}
                      active={s.sessionId === effectiveSelectedId}
                      onClick={() => setSelectedId(s.sessionId)}
                    />
                  ))}
                </div>
              ))}
              {!filtered.length && !isLoading && (
                <div className="px-6 py-16 text-center">
                  <div
                    className="text-[18px] text-muted-foreground/40 mb-1.5"
                    style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                  >
                    The journal stays closed.
                  </div>
                  <div className="font-mono text-[10.5px] tracking-widest uppercase text-muted-foreground/30">
                    NO SESSIONS MATCH
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <SessionDetail
          session={selected}
          onPatch={(patch) => selected && patchSession(selected.sessionId, patch)}
        />
      </div>
    </div>
  )
}

export default SessionsPage
