import { CreateSectionModal } from "@/components/create-section-modal";
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
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { useCampaignContext } from "@/context/campaign-context";
import { useCampaignRole } from "@/hooks/use-campaign-role";
import { api } from "@/lib/api";
import type { CreateSectionRequest, SectionResponse } from "@/types/sections";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EarthIcon, List, Plus, Sword } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AppSidebar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { isDM } = useCampaignRole();
  const { campaign } = useCampaignContext();
  const { pathname } = useLocation();
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { toggleSidebar, isMobile } = useSidebar();


  const { data: sections = [] } = useQuery({
    queryKey: ['sections', campaign.campaignId],
    queryFn: () => api.get<SectionResponse[]>(`/campaigns/${campaign.campaignId}/sections`, token!)
  });

  const { mutate: createSection, isPending } = useMutation({
    mutationFn: (request: CreateSectionRequest) =>
      api.post<SectionResponse>(`/campaigns/${campaign.campaignId}/sections`, request, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', campaign.campaignId] });
      setDialogOpen(false);
    }
  });

  const navigateTo = (path: string) => {
    if (isMobile)
      toggleSidebar();
    navigate(path);
  }

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Sidebar className="border border-border">
        <SidebarHeader>
          <SidebarMenuButton onClick={() => navigateTo(`/campaigns/${campaign.campaignId}`)}
            isActive={isActive(`/campaigns/${campaign.campaignId}`)}>
            <div className="px-2 py-1">
              <p className="text-sm font-medium text-foreground">{campaign.title}</p>
              <p className="text-xs text-muted-foreground">
                {isDM ? 'Dungeon Master' : 'Player'}
              </p>
            </div>
          </SidebarMenuButton>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={'sessions'}>
                  <SidebarMenuButton
                    isActive={isActive(`/campaigns/${campaign.campaignId}/sessions`)}
                    onClick={() => navigateTo(`/campaigns/${campaign.campaignId}/sessions`)}
                  >
                    <List />
                    Sessions
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem key={'inventory'}>
                  <SidebarMenuButton
                    isActive={isActive(`/campaigns/${campaign.campaignId}/inventory`)}
                    onClick={() => navigateTo(`/campaigns/${campaign.campaignId}/inventory`)}
                  >
                    <Sword />
                    Inventory
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem key={'map'}>
                  <SidebarMenuButton
                    isActive={isActive(`/campaigns/${campaign.campaignId}/map`)}
                    onClick={() => navigateTo(`/campaigns/${campaign.campaignId}/map`)}
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
                {sections.length > 0 && sections.map((section) => (
                  <SidebarMenuItem key={section.sectionId}>
                    <SidebarMenuButton
                      isActive={isActive(`/campaigns/${campaign.campaignId}/sections/${section.sectionId}`)}
                      onClick={() => navigateTo(`/campaigns/${campaign.campaignId}/sections/${section.sectionId}`)}>
                      {/* <Icon /> */}
                      {section.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {isDM && (
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setDialogOpen(true)}>
                  <Plus />
                  Add section
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        )}
      </Sidebar>
      <CreateSectionModal open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={createSection}
        isPending={isPending} />
    </>
  )
}

export default AppSidebar
