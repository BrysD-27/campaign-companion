import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit, Eye, Grid3x3, Link, Map, Minus, Plus, Trash2, X } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { useCampaignContext } from '@/context/campaign-context'
import { useCampaignRole } from '@/hooks/use-campaign-role'
import { api } from '@/lib/api'
import { CreateMapModal } from '@/components/create-map-modal'
import type { CreateMapRequest, MapResponse } from '@/types/maps'
import { ParchmentMap } from './parchment-map'
import { SAMPLE_MARKERS, SAMPLE_PCS, type MapPC, type Marker } from './map-types'
import { Button } from '@/components/ui/button'

// ---- MapPin ----
function MapPin({
  marker,
  selected,
  onClick,
  style,
}: {
  marker: Marker
  selected: boolean
  onClick: () => void
  style?: React.CSSProperties
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        width: 26,
        height: 26,
        cursor: 'pointer',
        zIndex: selected ? 6 : 3,
        ...style,
      }}
    >
      {/* Diamond */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'rotate(45deg)',
          background: marker.dmOnly
            ? 'linear-gradient(135deg, #2a1a1a, #5a2424)'
            : selected
              ? 'linear-gradient(135deg, #efcf80, #a8843e)'
              : 'linear-gradient(135deg, #2a3a52, #15202e)',
          border: marker.dmOnly
            ? '1.5px solid #c9a25b'
            : selected
              ? '1.5px solid #efcf80'
              : '1.5px solid #c9a25b',
          boxShadow: selected
            ? '0 0 0 3px rgba(201,162,91,0.25), 0 0 22px rgba(201,162,91,0.55)'
            : '0 2px 8px rgba(0,0,0,0.5)',
        }}
      />
      {/* Number */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          fontWeight: 700,
          color: selected && !marker.dmOnly ? '#0c1018' : '#e8e2d2',
        }}
      >
        {marker.n}
      </div>
      {/* Label (only when not selected) */}
      {!selected && (
        <div
          style={{
            position: 'absolute',
            top: '120%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(12,16,24,0.92)',
            border: '1px solid rgba(201,162,91,0.4)',
            padding: '3px 8px',
            fontFamily: 'Georgia, serif',
            fontSize: 12.5,
            fontStyle: 'italic',
            color: '#e8e2d2',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {marker.label}
          {marker.dmOnly && (
            <span style={{ color: 'var(--crimson)', marginLeft: 6, fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.2px' }}>
              · DM
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// ---- MarkerPopover ----
function MarkerPopover({
  marker,
  pcs,
  flipLeft,
  onPatch,
  onClose,
}: {
  marker: Marker
  pcs: MapPC[]
  flipLeft: boolean
  onPatch: (p: Partial<Marker>) => void
  onClose: () => void
}) {
  return (
    <div
      style={{
        position: 'absolute',
        transform: flipLeft ? 'translate(calc(-100% - 24px), -50%)' : 'translate(24px, -50%)',
        width: 320,
        background: 'linear-gradient(180deg, rgba(26,32,48,0.98), rgba(12,16,24,0.98))',
        border: '1px solid rgba(201,162,91,0.35)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        zIndex: 10,
      }}
    >
      {/* Arrow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          [flipLeft ? 'right' : 'left']: -6,
          transform: 'translateY(-50%) rotate(45deg)',
          width: 10,
          height: 10,
          background: 'rgba(26,32,48,0.98)',
          border: '1px solid rgba(201,162,91,0.35)',
          borderRight: flipLeft ? '1px solid rgba(201,162,91,0.35)' : 'none',
          borderTop: flipLeft ? 'none' : '1px solid rgba(201,162,91,0.35)',
          borderBottom: flipLeft ? 'none' : '1px solid rgba(201,162,91,0.35)',
          borderLeft: flipLeft ? 'none' : '1px solid rgba(201,162,91,0.35)',
        }}
      />

      {/* Head */}
      <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid hsl(var(--border))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 18, height: 18, flexShrink: 0,
              transform: 'rotate(45deg)',
              background: marker.dmOnly
                ? 'linear-gradient(135deg, #2a1a1a, #5a2424)'
                : 'linear-gradient(135deg, #efcf80, #a8843e)',
              border: marker.dmOnly ? '1px solid var(--crimson)' : '1px solid var(--primary)',
            }}
          />
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: 'hsl(var(--foreground))', flex: 1 }}>
            {marker.label}
          </div>
          <button onClick={onClose} style={{ color: 'hsl(var(--muted-foreground))', padding: 4 }}>
            <X size={14} />
          </button>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-sans)', fontSize: 9.5, letterSpacing: '1.4px',
          textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))',
          marginTop: 6,
        }}>
          <span>Marker {String(marker.n).padStart(2, '0')}</span>
          <span style={{ width: 4, height: 4, background: 'hsl(var(--muted-foreground))', transform: 'rotate(45deg)' }} />
          <span>{marker.kind}</span>
          {marker.dmOnly && (
            <>
              <span style={{ width: 4, height: 4, background: 'hsl(var(--muted-foreground))', transform: 'rotate(45deg)' }} />
              <span style={{ color: 'var(--crimson)' }}>DM ONLY</span>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 16px 14px' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', marginBottom: 5 }}>
          Notes
        </div>
        <div style={{
          fontFamily: 'Georgia, serif', fontSize: 14, lineHeight: 1.5,
          color: 'hsl(var(--foreground) / 0.7)', fontStyle: 'italic',
          background: 'rgba(20,26,38,0.6)', border: '1px solid hsl(var(--border))',
          padding: '10px 12px', minHeight: 60,
        }}>
          {marker.notes}
        </div>

        {/* DM Only toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: '1px solid hsl(var(--border))', marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: 'hsl(var(--foreground))' }}>DM Only</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.2px', color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase', marginTop: 2 }}>
              Hidden from player view
            </div>
          </div>
          <button
            onClick={() => onPatch({ dmOnly: !marker.dmOnly })}
            style={{
              width: 30, height: 16, padding: 2,
              background: marker.dmOnly ? 'rgba(138,58,58,0.5)' : 'rgba(232,226,210,0.10)',
              border: `1px solid ${marker.dmOnly ? 'rgba(138,58,58,0.7)' : 'hsl(var(--border))'}`,
              display: 'flex', alignItems: 'center',
            }}
          >
            <div style={{
              width: 10, height: 10,
              background: marker.dmOnly ? 'var(--crimson)' : 'hsl(var(--muted-foreground))',
              transform: marker.dmOnly ? 'translateX(12px)' : 'translateX(0)',
              transition: 'transform .14s',
            }} />
          </button>
        </div>

        {/* Share with */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
            Share With
          </div>
          <div style={{ flex: 1, height: 1, background: 'hsl(var(--border))', marginBottom: 5 }} />
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: marker.dmOnly ? 'var(--crimson)' : 'var(--primary)' }}>
            {marker.dmOnly ? 'Disabled' : `${marker.sharedWith.length}/${pcs.length}`}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, opacity: marker.dmOnly ? 0.4 : 1 }}>
          {pcs.map(pc => {
            const on = marker.sharedWith.includes(pc.id)
            return (
              <button
                key={pc.id}
                disabled={marker.dmOnly}
                onClick={() => {
                  const next = on
                    ? marker.sharedWith.filter(x => x !== pc.id)
                    : [...marker.sharedWith, pc.id]
                  onPatch({ sharedWith: next })
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 8px',
                  border: on ? `1px solid ${pc.tone}` : '1px solid hsl(var(--border))',
                  background: on ? `${pc.tone}22` : 'rgba(20,26,38,0.6)',
                  fontFamily: 'var(--font-sans)', fontSize: 10.5, letterSpacing: '0.5px',
                  color: on ? pc.tone : 'hsl(var(--muted-foreground))',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 16, height: 16, borderRadius: '50%',
                  background: pc.tone, color: '#fff',
                  fontFamily: 'var(--font-sans)', fontSize: 8, fontWeight: 700,
                }}>
                  {pc.initials}
                </span>
                {pc.name}
              </button>
            )
          })}
        </div>

        {/* Linked section */}
        {marker.linkedSection && (
          <div style={{ marginTop: 10, padding: '8px 10px', border: '1px solid hsl(var(--border))', background: 'rgba(20,26,38,0.5)' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', marginBottom: 4 }}>
              Linked Section
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Georgia, serif', fontSize: 13, color: 'var(--primary)' }}>
              <Link size={11} color="var(--primary)" />
              {marker.linkedSection}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
          <button style={{
            flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            padding: '7px 10px',
            border: '1px solid hsl(var(--border))',
            background: 'rgba(20,26,38,0.6)',
            fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '1.2px',
            textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))',
            cursor: 'pointer',
          }}>
            <Edit size={11} /> Edit
          </button>
          <button style={{
            flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            padding: '7px 10px',
            border: '1px solid hsl(var(--border))',
            background: 'rgba(20,26,38,0.6)',
            fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '1.2px',
            textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))',
            cursor: 'pointer',
          }}>
            <Trash2 size={11} stroke="var(--crimson)" /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- Main page ----
const MapsPage = () => {
  const { campaignId } = useParams()
  const { token }      = useAuth()
  const { campaign }   = useCampaignContext()
  const { isDM }       = useCampaignRole()
  const queryClient    = useQueryClient()

  const [modalOpen,       setModalOpen]       = useState(false)
  const [selectedMapId,   setSelectedMapId]   = useState<number | null>(null)
  const [markers,         setMarkers]         = useState<Marker[]>(SAMPLE_MARKERS)
  const [selectedMarkId,  setSelectedMarkId]  = useState<string | null>('mk2')
  const [showGrid,        setShowGrid]        = useState(true)
  const [zoom,            setZoom]            = useState(100)

  const { data: maps = [], isLoading } = useQuery({
    queryKey: ['maps', campaignId],
    queryFn:  () => api.get<MapResponse[]>(`/campaigns/${campaignId}/maps`, token!),
  })

  const { mutate: createMap, isPending } = useMutation({
    mutationFn: (req: CreateMapRequest) =>
      api.post(`/campaigns/${campaignId}/maps`, req, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maps', campaignId] })
      setModalOpen(false)
    },
  })

  const activeMapId  = selectedMapId ?? maps[0]?.mapId ?? null
  const activeMap    = maps.find(m => m.mapId === activeMapId) ?? null
  const selectedMark = markers.find(m => m.id === selectedMarkId) ?? null
  const visibleMarkers = isDM ? markers : markers.filter(m => !m.dmOnly)

  function patchMarker(id: string, patch: Partial<Marker>) {
    setMarkers(prev => prev.map(m => m.id === id ? { ...m, ...patch } : m))
  }

  const updatedLabel = activeMap
    ? new Date(activeMap.uploadedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div
      className="-m-6 flex flex-col overflow-hidden"
      style={{ height: 'calc(100vh - var(--header-height))' }}
    >
      {/* ---- Topbar ---- */}
      <div
        className="flex items-center gap-4 border-b border-border bg-card shrink-0"
        style={{ padding: '16px 24px 14px' }}
      >
        <div>
          <div className="flex items-baseline gap-3.5 mt-1">
            <h1 className="text-[26px] leading-[1.05] text-foreground font-medium">
              Maps
            </h1>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
              {maps.length} MAPS · {markers.length} MARKERS · {markers.filter(m => m.dmOnly).length} HIDDEN FROM PLAYERS
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {isDM && (
            <Button
              variant={'outline'}
            >
              <Eye /> Player Preview
            </Button>
          )}
          {isDM && (
            <Button
              onClick={() => setModalOpen(true)}
            >
              <Plus size={13} strokeWidth={2.5} /> New Map
            </Button>
          )}
        </div>
      </div>

      {/* ---- Content row ---- */}
      <div className="flex flex-1 min-h-0 ps-12">

        {/* ---- Left panel ---- */}
        <aside
          className="flex flex-col min-h-0 border-r border-border shrink-0"
          style={{
            width: 308,
          }}
        >
          {/* Campaign Maps header */}
          <div
            className="flex items-center gap-2 shrink-0 border-b border-border"
            style={{ padding: '14px 16px 10px', fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}
          >
            <Map size={12} color="var(--primary)" />
            <span>Campaign Maps</span>
            <span className="ml-auto font-mono text-[9.5px] text-muted-foreground/60">{maps.length}</span>
          </div>

          {/* Maps list */}
          <div className="overflow-y-auto shrink-0" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320 }}>
            {isLoading ? (
              <div className="flex flex-col gap-2.5">
                {[1, 2].map(i => (
                  <div key={i} className="h-16 border border-border/30 bg-card/30 animate-pulse" />
                ))}
              </div>
            ) : maps.length === 0 ? (
              <div className="py-4 text-center font-mono text-[9px] tracking-widest uppercase text-muted-foreground/30">
                No maps yet
              </div>
            ) : (
              maps.map(m => {
                const active = m.mapId === activeMapId
                return (
                  <div
                    key={m.mapId}
                    onClick={() => setSelectedMapId(m.mapId)}
                    style={{
                      border: active ? '1.5px solid var(--primary)' : '1px solid hsl(var(--border))',
                      background: active ? 'rgba(201,162,91,0.07)' : 'rgba(20,26,38,0.55)',
                      boxShadow: active ? '0 6px 18px rgba(201,162,91,0.12), inset 0 0 0 1px rgba(201,162,91,0.15)' : 'none',
                      cursor: 'pointer', padding: 8, display: 'flex', gap: 10, alignItems: 'center',
                    }}
                  >
                    {/* Thumb */}
                    <div
                      style={{
                        width: 64, height: 48, flexShrink: 0,
                        background: 'linear-gradient(135deg, #c8b485, #6a553a)',
                        border: '1px solid #3a2d1a',
                        position: 'relative', overflow: 'hidden',
                      }}
                    >
                      {m.imageUrl && (
                        <img
                          src={m.imageUrl}
                          alt={m.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: 14.5, color: 'hsl(var(--foreground))', lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.title}
                      </div>
                      {m.isDmOnly && (
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--crimson)', marginTop: 3 }}>
                          DM Only
                        </div>
                      )}
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', marginTop: 3 }}>
                        <Map size={9} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 4 }} />
                        {markers.length} markers
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Upload button */}
          {isDM && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              style={{
                margin: '4px 12px 12px',
                padding: '10px 12px',
                border: '1px dashed hsl(var(--border))',
                background: 'transparent',
                color: 'hsl(var(--muted-foreground))',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 10.5, letterSpacing: '1.4px',
                textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <Plus size={11} strokeWidth={2} /> Upload Map
            </button>
          )}

          {/* Markers header */}
          <div
            className="flex items-center gap-2 shrink-0"
            style={{
              padding: '12px 16px 10px',
              borderTop: '1px solid hsl(var(--border))',
              borderBottom: '1px solid hsl(var(--border))',
              fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '1.6px',
              textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))',
            }}
          >
            <span>Markers</span>
            {activeMap && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, color: 'hsl(var(--muted-foreground))', letterSpacing: '1.2px' }}>
                · {activeMap.title.split(',')[0]}
              </span>
            )}
            {isDM && (
              <Button
                type="button"
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 9px',
                  fontSize: 9.5,
                  textTransform: 'uppercase', fontWeight: 600,
                }}
              >
                <Plus /> Add
              </Button>
            )}
          </div>

          {/* Markers list */}
          <div className="flex-1 min-h-0 overflow-y-auto" style={{ padding: '6px 0' }}>
            {visibleMarkers.map(m => {
              const active = m.id === selectedMarkId
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMarkId(active ? null : m.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 16px',
                    borderBottom: '1px solid hsl(var(--border))',
                    background: active ? 'linear-gradient(90deg, hsl(from var(--primary) h s l / 0.20) 0%, transparent 80%)' : 'transparent',
                    borderLeft: active ? '2px solid var(--primary)' : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  {/* Pin indicator */}
                  <div
                    style={{
                      width: 22, height: 22, flexShrink: 0,
                      transform: 'rotate(45deg)',
                      background: m.dmOnly
                        ? 'linear-gradient(135deg, #2a1a1a, #5a2424)'
                        : active
                          ? 'linear-gradient(135deg, #e6c170, #a8843e)'
                          : 'linear-gradient(135deg, #2a3242, #1a2030)',
                      border: m.dmOnly
                        ? '1px solid var(--crimson)'
                        : active
                          ? '1px solid var(--primary)'
                          : '1px solid #5a7a9c',
                      boxShadow: active ? '0 0 0 2px rgba(201,162,91,0.18)' : 'none',
                      display: 'grid', placeItems: 'center',
                      color: active && !m.dmOnly ? '#0c1018' : 'hsl(var(--foreground))',
                      fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
                    }}
                  >
                    <span style={{ transform: 'rotate(-45deg)', lineHeight: 1 }}>{m.n}</span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 14.5, color: 'hsl(var(--foreground))', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {m.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>
                        {m.kind}
                      </span>
                      {m.dmOnly && (
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 8.5, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--crimson)', border: '1px solid rgba(138,58,58,0.5)', background: 'rgba(138,58,58,0.10)', padding: '1px 5px' }}>
                          DM
                        </span>
                      )}
                      {!m.dmOnly && m.sharedWith.length > 0 && (
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, color: '#5a7a9c' }}>
                          {m.sharedWith.length} players
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        {/* ---- Canvas ---- */}
        <div
          className="flex-1 min-w-0 relative overflow-hidden"
          style={{ background: 'radial-gradient(700px 400px at 60% 40%, #1a2030, #0a0e15 70%)' }}
        >
          {/* Top floating bar */}
          <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', alignItems: 'center', gap: 10, zIndex: 4, pointerEvents: 'none' }}>
            <div style={{
              pointerEvents: 'auto',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 12px',
              background: 'rgba(12,16,24,0.85)',
              border: '1px solid hsl(var(--border))',
              backdropFilter: 'blur(6px)',
              fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '1.4px',
              textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))',
            }}>
              <Map size={11} color="var(--primary)" />
              <span style={{ color: 'hsl(var(--foreground))', letterSpacing: '1.4px' }}>
                {activeMap ? activeMap.title : 'No map selected'}
              </span>
              <span style={{ width: 4, height: 4, background: 'hsl(var(--muted-foreground))', transform: 'rotate(45deg)' }} />
              <span>{updatedLabel.toUpperCase()}</span>
            </div>
            <div style={{
              marginLeft: 'auto',
              pointerEvents: 'auto',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 12px',
              background: 'rgba(12,16,24,0.85)',
              border: '1px solid hsl(var(--border))',
              backdropFilter: 'blur(6px)',
              fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '1.4px',
              textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))',
            }}>
              <Eye size={11} stroke="#5a7a9c" />
              <span>{visibleMarkers.filter(m => !m.dmOnly).length} VISIBLE TO PARTY</span>
            </div>
          </div>

          {/* Parchment frame */}
          <div
            style={{
              position: 'absolute', inset: 24,
              border: '1px solid #3a2d1a',
              boxShadow:
                '0 30px 80px rgba(0,0,0,0.6),' +
                'inset 0 0 0 6px rgba(58,45,26,0.35),' +
                'inset 0 0 0 9px rgba(232,226,210,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Map content: real image or parchment SVG */}
            {activeMap?.imageUrl ? (
              <img
                src={activeMap.imageUrl}
                alt={activeMap.title}
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            ) : (
              <ParchmentMap showGrid={showGrid} />
            )}

            {/* Pin overlays */}
            {visibleMarkers.map(m => (
              <MapPin
                key={m.id}
                marker={m}
                selected={m.id === selectedMarkId}
                onClick={() => setSelectedMarkId(m.id === selectedMarkId ? null : m.id)}
                style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%` }}
              />
            ))}
          </div>

          {/* Marker popover — positioned relative to canvasWrap, offset by 24px inset */}
          {selectedMark && (() => {
            const flipLeft = selectedMark.x > 0.55
            return (
              <div
                style={{
                  position: 'absolute',
                  left:  `calc(24px + (100% - 48px) * ${selectedMark.x})`,
                  top:   `calc(24px + (100% - 48px) * ${selectedMark.y})`,
                  zIndex: 9,
                  pointerEvents: 'none',
                }}
              >
                <div style={{ pointerEvents: 'auto' }}>
                  <MarkerPopover
                    marker={selectedMark}
                    pcs={SAMPLE_PCS}
                    flipLeft={flipLeft}
                    onPatch={(patch) => patchMarker(selectedMark.id, patch)}
                    onClose={() => setSelectedMarkId(null)}
                  />
                </div>
              </div>
            )
          })()}

          {/* Grid toggle (only show for parchment map) */}
          {!activeMap?.imageUrl && (
            <button
              type="button"
              onClick={() => setShowGrid(!showGrid)}
              style={{
                position: 'absolute', bottom: 36, left: 36,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 12px',
                background: 'var(--background)',
                border: '1px solid hsl(var(--border))',
                backdropFilter: 'blur(6px)',
                fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '1.4px',
                textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))',
                cursor: 'pointer', zIndex: 4,
              }}
            >
              <Grid3x3 size={11} stroke={showGrid ? 'var(--primary)' : 'var(--muted-foreground)'} />
              <span style={{ color: showGrid ? 'hsl(var(--foreground))' : 'var(--muted-foreground)' }}>
                Coordinate Grid
              </span>
              {/* Toggle knob */}
              <span style={{
                width: 20, height: 12, padding: 2,
                background: showGrid ? 'hsl(from var(--primary) h s l / 0.25)' : '',
                border: `1px solid ${showGrid ? 'var(--primary, 0.6)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center',
              }}>
                <span style={{
                  width: 8, height: 8,
                  background: showGrid ? 'var(--primary)' : 'var(--muted-foreground)',
                  transform: showGrid ? 'translateX(8px)' : 'translateX(0)',
                  transition: 'transform .14s',
                }} />
              </span>
            </button>
          )}

          {/* Zoom controls */}
          <div
            style={{
              position: 'absolute', bottom: 36, right: 36,
              display: 'flex', flexDirection: 'column',
              background: 'rgba(12,16,24,0.85)',
              border: '1px solid hsl(var(--border))',
              backdropFilter: 'blur(6px)',
              zIndex: 4,
            }}
          >
            <button
              type="button"
              onClick={() => setZoom(z => Math.min(z + 10, 200))}
              style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', borderBottom: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))', cursor: 'pointer', background: 'transparent' }}
            >
              <Plus size={14} />
            </button>
            <div style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', borderBottom: '1px solid hsl(var(--border))', fontFamily: 'var(--font-sans)', fontSize: 9.5, color: 'hsl(var(--muted-foreground))', letterSpacing: '1px' }}>
              {zoom}%
            </div>
            <button
              type="button"
              onClick={() => setZoom(z => Math.max(z - 10, 40))}
              style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: 'hsl(var(--foreground))', cursor: 'pointer', background: 'transparent' }}
            >
              <Minus size={14} />
            </button>
          </div>
        </div>
      </div>

      <CreateMapModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={createMap}
        isPending={isPending}
      />
    </div>
  )
}

export default MapsPage
