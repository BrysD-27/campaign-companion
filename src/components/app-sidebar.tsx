import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { ChevronDown, LogsIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

function AppSidebar() {
    return (
        <Sidebar className="border-sidebar-border">
            <SidebarHeader className="ps-3 py-3 border-b border-sidebar-border">
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Elasir</span>
                    <span className="truncate text-xs text-muted-foreground">Dungeon Master</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenuItem>
                        <LogsIcon />
                        <SidebarMenuBadge>24</SidebarMenuBadge>
                    </SidebarMenuItem>

                </SidebarGroup>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Help
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent />
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar