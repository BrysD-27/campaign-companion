
export function AppHeader() {
    return (
        <header className="top-0 z-50 w-full bg-background">
            <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
                <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
                    <a
                        href="/"
                        className="shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px lg:flex"
                        aria-label="Campaign Companion"
                    >
                        Campaign Companion
                    </a>

                </div>
            </div>
        </header>
    );
}