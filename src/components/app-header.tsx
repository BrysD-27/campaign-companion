
export function AppHeader() {
    return (
        <header className="top-0 z-50 w-full bg-background">
            <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
                <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
                    <a
                        href="/"
                        className="hidden size-10 shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px lg:flex"
                        aria-label="Campaign Companion"
                    >
                        <svg
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-8"
                            aria-hidden="true"
                        >
                            <defs>
                                <linearGradient id="header-icon-bg" x1="64" y1="64" x2="448" y2="448" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#241C3A" />
                                    <stop offset="1" stopColor="#3E2F6B" />
                                </linearGradient>

                                <linearGradient id="header-icon-d20" x1="228" y1="230" x2="284" y2="300" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#8B7CFF" />
                                    <stop offset="1" stopColor="#5ED3F3" />
                                </linearGradient>
                            </defs>

                            <rect width="512" height="512" rx="112" fill="url(#header-icon-bg)" />

                            <g transform="translate(256 256) scale(1.28) translate(-256 -256)">
                                <path
                                    d="M256 356
                        C238 344 215 338 188 338
                        H156
                        C132 338 116 322 116 298
                        V180
                        C116 156 132 140 156 140
                        H198
                        C225 140 244 146 256 158
                        C268 146 287 140 314 140
                        H356
                        C380 140 396 156 396 180
                        V298
                        C396 322 380 338 356 338
                        H324
                        C297 338 274 344 256 356Z"
                                    stroke="#F4F1E8"
                                    strokeWidth="14"
                                    strokeLinejoin="round"
                                    fill="none"
                                />

                                <path
                                    d="M256 158V356"
                                    stroke="#F4F1E8"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    opacity="0.7"
                                />

                                <path d="M154 196H214" stroke="#F4F1E8" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
                                <path d="M154 225H214" stroke="#DCCFFF" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
                                <path d="M154 255H214" stroke="#F4F1E8" strokeWidth="10" strokeLinecap="round" opacity="0.75" />
                                <path d="M154 285H206" stroke="#DCCFFF" strokeWidth="10" strokeLinecap="round" opacity="0.7" />

                                <path d="M298 196H358" stroke="#F4F1E8" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
                                <path d="M298 225H358" stroke="#DCCFFF" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
                                <path d="M298 255H358" stroke="#F4F1E8" strokeWidth="10" strokeLinecap="round" opacity="0.75" />
                                <path d="M306 285H358" stroke="#DCCFFF" strokeWidth="10" strokeLinecap="round" opacity="0.7" />

                                <path
                                    d="M256 230L282 248L272 280H240L230 248L256 230Z"
                                    fill="url(#header-icon-d20)"
                                />
                            </g>
                        </svg>
                    </a>

                </div>
            </div>
        </header>
    );
}