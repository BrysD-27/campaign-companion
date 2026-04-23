import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";
import { useOptionalCampaignContext } from "@/context/campaign-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { BadgeCheckIcon, BellIcon, ChevronLeft, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isMoble = useIsMobile();
    const { logout, } = useAuth();
    const campaignCtx = useOptionalCampaignContext();
    const memberAvatar = campaignCtx?.currentMember?.characterImageUrl;

    const isCampaignRoute = pathname.startsWith('/campaigns/');

    return (
        <header className="top-0 z-50 w-full bg-card">
            <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
                <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
                    {isCampaignRoute && (
                        <>
                            <Button variant={'outline'} className="me-2" onClick={() => navigate('/')}>
                                <ChevronLeft />
                                {!isMoble && ('Campaigns')}
                            </Button>
                            <span className="text-muted">&#9474;</span>
                        </>
                    )}
                    <div
                        className="p-1 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap active:not-aria-[haspopup]:translate-y-px lg:flex"
                    >
                        Campaign Companion
                    </div>
                    <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <Button variant="ghost" size="icon" className="rounded-full shadow-sm border border-border overflow-hidden">
                                    {memberAvatar
                                        ? <img src={memberAvatar} alt="avatar" className="h-full w-full object-cover" />
                                        : <UserIcon />
                                    }
                                </Button>
                            }>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => navigate("/account")}>
                                        <BadgeCheckIcon />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate("/notifications")}>
                                        <BellIcon />
                                        Notifications
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                                        <SettingsIcon />
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="focus:bg-red-600" onClick={logout}>
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
