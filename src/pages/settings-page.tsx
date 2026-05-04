import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/context/auth-context'
import { api } from '@/lib/api'
import type { BaseColorId, ThemeColorId } from '@/lib/themes'
import { applyTheme, BASE_COLOR_DATA, THEME_COLOR_DATA } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { ChevronLeft, Loader2, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type ColorMode = 'light' | 'dark' | 'system'

function ColorSwatch({ swatch, label, selected, onClick }: {
    swatch: string; label: string; selected: boolean; onClick: () => void
}) {
    return (
        <button onClick={onClick} className="flex flex-col items-center gap-1.5">
            <div
                className={cn(
                    'w-7 h-7 rounded-full transition-all',
                    selected
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                        : 'ring-1 ring-border hover:scale-105'
                )}
                style={{ backgroundColor: swatch }}
            />
            <span className={cn('text-[10px] leading-none', selected ? 'font-medium text-foreground' : 'text-muted-foreground')}>
                {label}
            </span>
        </button>
    )
}

const COLOR_MODES: { value: ColorMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
]

function SettingsPage() {
    const { user, token, updatePreferences } = useAuth()
    const { setTheme, theme } = useTheme()
    const navigate = useNavigate()

    const dbPrefs = {
        colorMode: (user?.preferences?.colorMode as ColorMode) || 'system',
        baseColor: (user?.preferences?.baseColor as BaseColorId) || 'taupe',
        themeColor: (user?.preferences?.themeColor as ThemeColorId) || 'teal',
    }

    const [colorMode, setColorModeState] = useState<ColorMode>((theme as ColorMode) || dbPrefs.colorMode)
    const [baseColor, setBaseColorState] = useState<BaseColorId>(dbPrefs.baseColor)
    const [themeColor, setThemeColorState] = useState<ThemeColorId>(dbPrefs.themeColor)

    const isDirty =
        colorMode !== dbPrefs.colorMode ||
        baseColor !== dbPrefs.baseColor ||
        themeColor !== dbPrefs.themeColor

    const handleColorMode = (mode: ColorMode) => {
        setColorModeState(mode)
        setTheme(mode)
    }

    const handleBaseColor = (base: BaseColorId) => {
        setBaseColorState(base)
        applyTheme(base, themeColor)
    }

    const handleThemeColor = (tc: ThemeColorId) => {
        setThemeColorState(tc)
        applyTheme(baseColor, tc)
    }

    const handleRevert = () => {
        setColorModeState(dbPrefs.colorMode)
        setBaseColorState(dbPrefs.baseColor)
        setThemeColorState(dbPrefs.themeColor)
        setTheme(dbPrefs.colorMode)
        applyTheme(dbPrefs.baseColor, dbPrefs.themeColor)
    }

    const { mutate: save, isPending } = useMutation({
        mutationFn: () => api.put(
            '/auth/preferences',
            { colorMode, baseColor, themeColor, fontSize: user?.preferences?.fontSize || 'medium' },
            token!
        ),
        onSuccess: () => {
            updatePreferences({ colorMode, baseColor, themeColor, fontSize: user?.preferences?.fontSize || 'medium' })
            toast.success('Preferences saved')
        },
        onError: () => {
            toast.error('Failed to save preferences')
        },
    })

    return (
        <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
                <ChevronLeft />
                Back
            </Button>

            <h1 className="text-2xl font-medium">Settings</h1>

            <section className="border border-border rounded-lg p-5 space-y-5">
                <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Appearance</h2>

                {/* Color Mode */}
                <div className="space-y-2">
                    <p className="text-sm font-medium">Color Mode</p>
                    <div className="flex gap-2">
                        {COLOR_MODES.map(({ value, label, icon }) => (
                            <Button
                                key={value}
                                variant={colorMode === value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleColorMode(value)}
                            >
                                {icon}
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Base Color */}
                <div className="space-y-3">
                    <div>
                        <p className="text-sm font-medium">Base Color</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Surface and neutral tones</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {(Object.entries(BASE_COLOR_DATA) as [BaseColorId, typeof BASE_COLOR_DATA[BaseColorId]][]).map(([id, data]) => (
                            <ColorSwatch
                                key={id}
                                swatch={data.swatch}
                                label={data.label}
                                selected={baseColor === id}
                                onClick={() => handleBaseColor(id)}
                            />
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Theme Color */}
                <div className="space-y-3">
                    <div>
                        <p className="text-sm font-medium">Theme Color</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Accent and interactive elements</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {(Object.entries(THEME_COLOR_DATA) as [ThemeColorId, typeof THEME_COLOR_DATA[ThemeColorId]][]).map(([id, data]) => (
                            <ColorSwatch
                                key={id}
                                swatch={data.swatch}
                                label={data.label}
                                selected={themeColor === id}
                                onClick={() => handleThemeColor(id)}
                            />
                        ))}
                    </div>
                </div>

                {isDirty && (
                    <>
                        <Separator />
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={handleRevert} disabled={isPending}>
                                Revert
                            </Button>
                            <Button onClick={() => save()} disabled={isPending}>
                                {isPending && <Loader2 className="animate-spin" />}
                                Save changes
                            </Button>
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default SettingsPage;