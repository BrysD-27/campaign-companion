import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { BadgeCheckIcon, BellIcon, ChevronLeft, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isMoble = useIsMobile();

    const isCampaignRoute = pathname.startsWith('/campaigns/');


    return (
        <header className="top-0 z-50 w-full bg-background">
            <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
                <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
                    {isCampaignRoute && (
                        <>
                            <Button variant={'outline'} className="me-2" onClick={() => navigate('/')}>
                                <ChevronLeft />
                                {!isMoble && ('Campaigns')}
                            </Button>
                            <span className="text-muted-foreground">&#9474;</span>
                        </>
                    )}  
                    <div
                        className="p-1 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap active:not-aria-[haspopup]:translate-y-px lg:flex"
                    >
                        Campaign Companion
                    </div>
                    <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <UserIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheckIcon />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <BellIcon />
                                        Notifications
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <SettingsIcon />
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="focus:bg-red-600">
                                    <LogOutIcon />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AppHeader