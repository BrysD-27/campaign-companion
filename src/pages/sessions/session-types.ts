export type SessionMode = 'prep' | 'live' | 'complete'

export interface Session {
  sessionId: string
  no?: number
  title: string
  date?: string
  created?: string
  mode?: SessionMode
  tags?: string[]
  npcs?: string[]
  pcs?: string[]
  recap?: string
  prepDone?: number
  prepTotal?: number
  duration?: string | null
}

export const MODE_COLORS: Record<string, string> = {
  prep: '#5a7a9c',
  live: '#c9a25b',
  complete: '#7a9c5a',
}

export const MODE_LABELS: Record<string, string> = {
  prep: 'Prep',
  live: 'Live',
  complete: 'Complete',
}
