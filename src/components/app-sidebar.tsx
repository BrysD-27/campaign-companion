import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import type { AppSidebarProps } from "@/props/AppSidebarProps"
import { EarthIcon, List, Plus } from "lucide-react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

function AppSidebar({ campaignTitle, role, sections }: AppSidebarProps) {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path

  return (
    <Sidebar className="border border-sidebar-border">
      <SidebarHeader>
        <SidebarMenuButton onClick={() => navigate(`/campaigns/${campaignId}`)}
          isActive={isActive(`/campaigns/${campaignId}`)}>
          <div className="px-2 py-1">
            <p className="text-sm font-medium text-foreground">{campaignTitle}</p>
            <p className="text-xs text-muted-foreground">
              {role === 'DM' ? 'Dungeon Master' : 'Player'}
            </p>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive(`/campaigns/${campaignId}/sessions`)}
                  onClick={() => navigate(`/campaigns/${campaignId}/sessions`)}
                >
                  <List />
                  Sessions
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive(`/campaigns/${campaignId}/map`)}
                  onClick={() => navigate(`/campaigns/${campaignId}/map`)}
                >
                  <EarthIcon />
                  World Map
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Lore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((section) => (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate(`/campaigns/${campaignId}/sections/${section.id}`)}>
                    {/* <Icon /> */}
                    {section.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {role === 'DM' && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => console.log('add section')}>
                <Plus />
                Add section
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}

export default AppSidebar