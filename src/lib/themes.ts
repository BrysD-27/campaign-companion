export type BaseColorId = 'neutral' | 'stone' | 'zinc' | 'mauve' | 'olive' | 'mist' | 'taupe'
export type ThemeColorId = 'amber' | 'blue' | 'cyan' | 'emerald' | 'fuchsia' | 'gold' | 'green' | 'indigo' | 'lime' | 'orange' | 'pink' | 'purple' | 'red' | 'rose' | 'sky' | 'teal' | 'violet' | 'yellow'

interface VarMap { light: Record<string, string>; dark: Record<string, string> }
export interface ColorMeta { label: string; swatch: string }

function f(n: number) { return parseFloat(n.toFixed(4)) }

function makeBase(H: number, C: number): VarMap {
    return {
        light: {
            '--background': 'oklch(1 0 0)',
            '--foreground': `oklch(0.147 ${f(C * 0.8)} ${H})`,
            '--card': 'oklch(1 0 0)',
            '--card-foreground': `oklch(0.147 ${f(C * 0.8)} ${H})`,
            '--popover': 'oklch(1 0 0)',
            '--popover-foreground': `oklch(0.147 ${f(C * 0.8)} ${H})`,
            '--secondary': `oklch(0.967 ${f(C * 0.2)} ${H})`,
            '--secondary-foreground': `oklch(0.21 ${f(C)} ${H})`,
            '--muted': `oklch(0.96 ${f(C * 0.4)} ${H})`,
            '--muted-foreground': `oklch(0.547 ${f(Math.min(C * 4.2, 0.1))} ${H})`,
            '--accent': `oklch(0.96 ${f(C * 0.4)} ${H})`,
            '--accent-foreground': `oklch(0.214 ${f(C * 1.8)} ${H})`,
            '--border': `oklch(0.922 ${f(C)} ${H})`,
            '--input': `oklch(0.922 ${f(C)} ${H})`,
            '--ring': `oklch(0.714 ${f(Math.min(C * 2.8, 0.08))} ${H})`,
            '--sidebar': `oklch(0.986 ${f(C * 0.4)} ${H})`,
            '--sidebar-foreground': `oklch(0.147 ${f(C * 0.8)} ${H})`,
            '--sidebar-accent': `oklch(0.96 ${f(C * 0.4)} ${H})`,
            '--sidebar-accent-foreground': `oklch(0.214 ${f(C * 1.8)} ${H})`,
            '--sidebar-border': `oklch(0.922 ${f(C)} ${H})`,
            '--sidebar-ring': `oklch(0.714 ${f(Math.min(C * 2.8, 0.08))} ${H})`,
        },
        dark: {
            '--background': `oklch(0.147 ${f(C * 0.8)} ${H})`,
            '--foreground': `oklch(0.986 ${f(C * 0.4)} ${H})`,
            '--card': `oklch(0.214 ${f(C * 1.8)} ${H})`,
            '--card-foreground': `oklch(0.986 ${f(C * 0.4)} ${H})`,
            '--popover': `oklch(0.214 ${f(C * 1.8)} ${H})`,
            '--popover-foreground': `oklch(0.986 ${f(C * 0.4)} ${H})`,
            '--secondary': `oklch(0.274 ${f(C)} ${H})`,
            '--secondary-foreground': 'oklch(0.985 0 0)',
            '--muted': `oklch(0.268 ${f(C * 2.2)} ${H})`,
            '--muted-foreground': `oklch(0.714 ${f(Math.min(C * 2.8, 0.08))} ${H})`,
            '--accent': `oklch(0.268 ${f(C * 2.2)} ${H})`,
            '--accent-foreground': `oklch(0.986 ${f(C * 0.4)} ${H})`,
            '--border': 'oklch(1 0 0 / 10%)',
            '--input': 'oklch(1 0 0 / 15%)',
            '--ring': `oklch(0.547 ${f(Math.min(C * 4.2, 0.1))} ${H})`,
            '--sidebar': `oklch(0.214 ${f(C * 1.8)} ${H})`,
            '--sidebar-foreground': `oklch(0.986 ${f(C * 0.4)} ${H})`,
            '--sidebar-accent': `oklch(0.268 ${f(C * 2.2)} ${H})`,
            '--sidebar-accent-foreground': `oklch(0.986 ${f(C * 0.4)} ${H})`,
            '--sidebar-border': 'oklch(1 0 0 / 10%)',
            '--sidebar-ring': `oklch(0.547 ${f(Math.min(C * 4.2, 0.1))} ${H})`,
        },
    }
}

function makeTheme(H: number, C: number, warmLight = false): VarMap {
    const L = warmLight ? 0.72 : 0.52
    const fg = warmLight ? `oklch(0.20 ${f(C * 0.2)} ${H})` : `oklch(0.984 0.014 ${H})`
    const charts = {
        '--chart-1': `oklch(0.855 ${f(C * 0.8)} ${H})`,
        '--chart-2': `oklch(0.704 ${f(C)} ${H})`,
        '--chart-3': `oklch(0.6 ${f(C * 0.85)} ${H})`,
        '--chart-4': `oklch(0.511 ${f(C)} ${H})`,
        '--chart-5': `oklch(0.437 ${f(C * 0.85)} ${H})`,
    }
    return {
        light: {
            '--primary': `oklch(${L} ${C} ${H})`,
            '--primary-foreground': fg,
            '--sidebar-primary': `oklch(${f(L + 0.06)} ${C} ${H})`,
            '--sidebar-primary-foreground': fg,
            ...charts,
        },
        dark: {
            '--primary': `oklch(0.44 ${f(C * 0.85)} ${H})`,
            '--primary-foreground': `oklch(0.984 0.014 ${H})`,
            '--sidebar-primary': `oklch(0.62 ${C} ${H})`,
            '--sidebar-primary-foreground': `oklch(0.25 ${f(C * 0.5)} ${H})`,
            ...charts,
        },
    }
}

export const BASE_COLOR_DATA: Record<BaseColorId, ColorMeta & VarMap> = {
    neutral: { label: 'Neutral', swatch: '#8b8b8b', ...makeBase(0, 0) },
    stone: { label: 'Stone', swatch: '#8c8072', ...makeBase(67, 0.003) },
    zinc: { label: 'Zinc', swatch: '#71717a', ...makeBase(286, 0.002) },
    mauve: { label: 'Mauve', swatch: '#9b7fa6', ...makeBase(300, 0.007) },
    olive: { label: 'Olive', swatch: '#7d8a5a', ...makeBase(100, 0.007) },
    mist: { label: 'Mist', swatch: '#6b8ea8', ...makeBase(215, 0.006) },
    taupe: {
        label: 'Taupe', swatch: '#8a7e72',
        light: {
            '--background': 'oklch(1 0 0)',
            '--foreground': 'oklch(0.147 0.004 49.3)',
            '--card': 'oklch(1 0 0)',
            '--card-foreground': 'oklch(0.147 0.004 49.3)',
            '--popover': 'oklch(1 0 0)',
            '--popover-foreground': 'oklch(0.147 0.004 49.3)',
            '--secondary': 'oklch(0.967 0.001 286.375)',
            '--secondary-foreground': 'oklch(0.21 0.006 285.885)',
            '--muted': 'oklch(0.96 0.002 17.2)',
            '--muted-foreground': 'oklch(0.547 0.021 43.1)',
            '--accent': 'oklch(0.96 0.002 17.2)',
            '--accent-foreground': 'oklch(0.214 0.009 43.1)',
            '--border': 'oklch(0.922 0.005 34.3)',
            '--input': 'oklch(0.922 0.005 34.3)',
            '--ring': 'oklch(0.714 0.014 41.2)',
            '--sidebar': 'oklch(0.986 0.002 67.8)',
            '--sidebar-foreground': 'oklch(0.147 0.004 49.3)',
            '--sidebar-accent': 'oklch(0.96 0.002 17.2)',
            '--sidebar-accent-foreground': 'oklch(0.214 0.009 43.1)',
            '--sidebar-border': 'oklch(0.922 0.005 34.3)',
            '--sidebar-ring': 'oklch(0.714 0.014 41.2)',
        },
        dark: {
            '--background': 'oklch(0.147 0.004 49.3)',
            '--foreground': 'oklch(0.986 0.002 67.8)',
            '--card': 'oklch(0.214 0.009 43.1)',
            '--card-foreground': 'oklch(0.986 0.002 67.8)',
            '--popover': 'oklch(0.214 0.009 43.1)',
            '--popover-foreground': 'oklch(0.986 0.002 67.8)',
            '--secondary': 'oklch(0.274 0.006 286.033)',
            '--secondary-foreground': 'oklch(0.985 0 0)',
            '--muted': 'oklch(0.268 0.011 36.5)',
            '--muted-foreground': 'oklch(0.714 0.014 41.2)',
            '--accent': 'oklch(0.268 0.011 36.5)',
            '--accent-foreground': 'oklch(0.986 0.002 67.8)',
            '--border': 'oklch(1 0 0 / 10%)',
            '--input': 'oklch(1 0 0 / 15%)',
            '--ring': 'oklch(0.547 0.021 43.1)',
            '--sidebar': 'oklch(0.214 0.009 43.1)',
            '--sidebar-foreground': 'oklch(0.986 0.002 67.8)',
            '--sidebar-accent': 'oklch(0.268 0.011 36.5)',
            '--sidebar-accent-foreground': 'oklch(0.986 0.002 67.8)',
            '--sidebar-border': 'oklch(1 0 0 / 10%)',
            '--sidebar-ring': 'oklch(0.547 0.021 43.1)',
        },
    },
}

export const THEME_COLOR_DATA: Record<ThemeColorId, ColorMeta & VarMap> = {
    amber: { label: 'Amber', swatch: '#f59e0b', ...makeTheme(70, 0.18, true) },
    blue: { label: 'Blue', swatch: '#3b82f6', ...makeTheme(260, 0.20) },
    cyan: { label: 'Cyan', swatch: '#06b6d4', ...makeTheme(200, 0.13) },
    emerald: { label: 'Emerald', swatch: '#10b981', ...makeTheme(162, 0.14) },
    fuchsia: { label: 'Fuchsia', swatch: '#d946ef', ...makeTheme(320, 0.22) },
    gold: {
        label: 'Gold', swatch: '#c9a25b',
        light: {
            '--primary': 'oklch(0.733 0.101 81)',
            '--primary-foreground': 'oklch(0.20 0.02 81)',
            '--sidebar-primary': 'oklch(0.693 0.101 81)',
            '--sidebar-primary-foreground': 'oklch(0.20 0.02 81)',
            '--chart-1': 'oklch(0.855 0.081 81)',
            '--chart-2': 'oklch(0.704 0.101 81)',
            '--chart-3': 'oklch(0.600 0.086 81)',
            '--chart-4': 'oklch(0.511 0.101 81)',
            '--chart-5': 'oklch(0.437 0.086 81)',
        },
        dark: {
            '--primary': 'oklch(0.65 0.101 81)',
            '--primary-foreground': 'oklch(0.20 0.02 81)',
            '--sidebar-primary': 'oklch(0.70 0.101 81)',
            '--sidebar-primary-foreground': 'oklch(0.20 0.02 81)',
            '--chart-1': 'oklch(0.855 0.081 81)',
            '--chart-2': 'oklch(0.704 0.101 81)',
            '--chart-3': 'oklch(0.600 0.086 81)',
            '--chart-4': 'oklch(0.511 0.101 81)',
            '--chart-5': 'oklch(0.437 0.086 81)',
        },
    },
    green: { label: 'Green', swatch: '#22c55e', ...makeTheme(145, 0.17) },
    indigo: { label: 'Indigo', swatch: '#6366f1', ...makeTheme(275, 0.20) },
    lime: { label: 'Lime', swatch: '#84cc16', ...makeTheme(130, 0.20, true) },
    orange: { label: 'Orange', swatch: '#f97316', ...makeTheme(55, 0.22, true) },
    pink: { label: 'Pink', swatch: '#ec4899', ...makeTheme(355, 0.20) },
    purple: { label: 'Purple', swatch: '#a855f7', ...makeTheme(300, 0.20) },
    red: { label: 'Red', swatch: '#ef4444', ...makeTheme(22, 0.24) },
    rose: { label: 'Rose', swatch: '#f43f5e', ...makeTheme(10, 0.20) },
    sky: { label: 'Sky', swatch: '#0ea5e9', ...makeTheme(220, 0.17) },
    teal: {
        label: 'Teal', swatch: '#14b8a6',
        light: {
            '--primary': 'oklch(0.511 0.096 186.391)',
            '--primary-foreground': 'oklch(0.984 0.014 180.72)',
            '--sidebar-primary': 'oklch(0.6 0.118 184.704)',
            '--sidebar-primary-foreground': 'oklch(0.984 0.014 180.72)',
            '--chart-1': 'oklch(0.855 0.138 181.071)',
            '--chart-2': 'oklch(0.704 0.14 182.503)',
            '--chart-3': 'oklch(0.6 0.118 184.704)',
            '--chart-4': 'oklch(0.511 0.096 186.391)',
            '--chart-5': 'oklch(0.437 0.078 188.216)',
        },
        dark: {
            '--primary': 'oklch(0.437 0.078 188.216)',
            '--primary-foreground': 'oklch(0.984 0.014 180.72)',
            '--sidebar-primary': 'oklch(0.704 0.14 182.503)',
            '--sidebar-primary-foreground': 'oklch(0.277 0.046 192.524)',
            '--chart-1': 'oklch(0.855 0.138 181.071)',
            '--chart-2': 'oklch(0.704 0.14 182.503)',
            '--chart-3': 'oklch(0.6 0.118 184.704)',
            '--chart-4': 'oklch(0.511 0.096 186.391)',
            '--chart-5': 'oklch(0.437 0.078 188.216)',
        },
    },
    violet: { label: 'Violet', swatch: '#8b5cf6', ...makeTheme(290, 0.21) },
    yellow: { label: 'Yellow', swatch: '#eab308', ...makeTheme(85, 0.20, true) },
}

export function applyTheme(base: BaseColorId, themeColor: ThemeColorId) {
    const b = BASE_COLOR_DATA[base]
    const t = THEME_COLOR_DATA[themeColor]
    const vars = (obj: Record<string, string>) =>
        Object.entries(obj).map(([k, v]) => `  ${k}: ${v};`).join('\n')
    const css = `:root {\n${vars({ ...b.light, ...t.light })}\n}\n.dark {\n${vars({ ...b.dark, ...t.dark })}\n}`
    let el = document.getElementById('cc-theme') as HTMLStyleElement | null
    if (!el) {
        el = document.createElement('style')
        el.id = 'cc-theme'
        document.head.appendChild(el)
    }
    el.textContent = css
}
