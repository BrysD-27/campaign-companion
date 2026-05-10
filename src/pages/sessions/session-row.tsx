import type { Session, SessionMode } from './session-types'
import { MODE_COLORS, MODE_LABELS } from './session-types'

export function ModePill({ mode, size = 'md' }: { mode: SessionMode; size?: 'sm' | 'md' }) {
  const color = MODE_COLORS[mode] ?? '#888'
  const sm = size === 'sm'
  return (
    <span
      className="inline-flex items-center font-mono uppercase font-semibold shrink-0"
      style={{
        gap: sm ? 5 : 6,
        fontSize: sm ? 9.5 : 10.5,
        letterSpacing: '0.1em',
        color,
        background: `${color}1a`,
        border: `1px solid ${color}66`,
        padding: sm ? '2px 7px 2px 6px' : '3px 9px 3px 8px',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          flexShrink: 0,
          background: color,
          boxShadow: mode === 'live' ? `0 0 6px ${color}` : 'none',
          animation: mode === 'live' ? 'modePulse 1.6s ease-in-out infinite' : 'none',
        }}
      />
      {MODE_LABELS[mode]}
    </span>
  )
}

export function SessionRow({
  session,
  active,
  onClick,
}: {
  session: Session
  active: boolean
  onClick: () => void
}) {
  const npcCount = session.npcs?.length ?? 0

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer border-b border-border/30"
      style={{
        padding: '14px 24px 14px 22px',
        borderLeft: active ? '2px solid var(--primary)' : '2px solid transparent',
        background: active
          ? 'linear-gradient(90deg, rgba(201,162,91,0.10), transparent 80%)'
          : 'transparent',
      }}
    >
      <div className="flex items-baseline gap-2.5 mb-1">
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 shrink-0 uppercase">
          S{String(session.no ?? '?').padStart(2, '0')}
        </span>
        <h3
          className="flex-1 text-[18px] leading-tight text-foreground font-medium"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {session.title}
        </h3>
        {session.date && (
          <span className="font-mono text-[10px] text-muted-foreground/40 tracking-[0.04em] shrink-0">
            {session.date}
          </span>
        )}
      </div>

      {session.mode && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          <ModePill mode={session.mode} size="sm" />
          {(session.tags ?? []).slice(0, 3).map(tag => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-widest border border-border/40 px-1.5 py-0.5 text-muted-foreground/50"
            >
              {tag.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      )}

      {session.recap && (
        <p
          className="text-[13px] text-muted-foreground/50 mt-2 leading-[1.45] line-clamp-2"
          style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          {session.recap}
        </p>
      )}

      <div className="flex items-center gap-3 mt-2.5">
        <span className="font-mono text-[9.5px] text-muted-foreground/40 tracking-[0.05em] uppercase">
          {npcCount} NPC{npcCount === 1 ? '' : 'S'}
        </span>
        {session.duration && (
          <span className="font-mono text-[9.5px] text-muted-foreground/40 tracking-[0.05em] uppercase ml-auto">
            {session.duration === 'in progress' ? '● IN PROGRESS' : session.duration.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  )
}
