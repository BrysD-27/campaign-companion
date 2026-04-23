import { CreateSectionModal } from "@/components/create-section-modal";
import { ReorderSectionsModal } from "@/components/reorder-sections-modal";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
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
import { ArrowUpDown, BookOpen, Calendar, Castle, Compass, Crown, Flag, Flame, Gem, Globe, List, type LucideIcon, Map, MapIcon, MessageSquare, Package, Pin, PinOff, Plus, ScrollText, Shield, Skull, Star, Sword, Swords, TreePine, Users, Zap } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ICON_MAP: Record<string, LucideIcon> = {
  Map, Swords, Users, BookOpen, ScrollText, Castle, Skull, Crown, Gem, Flame,
  Star, Shield, Globe, TreePine, Package, Calendar, Flag, Compass, Zap, MessageSquare,
};

function SectionIcon({ name }: { name: string | null }) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  return Icon ? <Icon /> : null;
}

function AppSidebar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reorderOpen, setReorderOpen] = useState(false);
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

  const { mutate: pinSection } = useMutation({
    mutationFn: (section: SectionResponse) => section.isPinned
      ? api.delete(`/campaigns/${campaign.campaignId}/pins`, token!, { resourceType: 'section', resourceId: section.sectionId })
      : api.post(`/campaigns/${campaign.campaignId}/pins`, { resourceType: 'section', resourceId: section.sectionId }, token!),
    onMutate: async (section) => {
      await queryClient.cancelQueries({ queryKey: ['sections', campaign.campaignId] });
      const previous = queryClient.getQueryData<SectionResponse[]>(['sections', campaign.campaignId]);
      queryClient.setQueryData<SectionResponse[]>(['sections', campaign.campaignId], (old = []) => {
        const updated = old.map(s => s.sectionId === section.sectionId ? { ...s, isPinned: !s.isPinned } : s);
        return [...updated].sort((a, b) => {
          if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
          return a.sortOrder - b.sortOrder;
        });
      });
      return { previous };
    },
    onError: (_, __, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(['sections', campaign.campaignId], ctx.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['sections', campaign.campaignId] }),
  });

  const { mutate: reorderSections, isPending: isReorderPending } = useMutation({
    mutationFn: (ordered: SectionResponse[]) => api.patch(
      `/campaigns/${campaign.campaignId}/sections/reorder`,
      { sections: ordered.map((s, i) => ({ sectionId: s.sectionId, sortOrder: i, parentSectionId: s.parentSectionId })) },
      token!
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', campaign.campaignId] });
      setReorderOpen(false);
    }
  });

  const { mutate: createSection, isPending } = useMutation({
    mutationFn: (request: CreateSectionRequest) =>
      api.post<SectionResponse>(`/campaigns/${campaign.campaignId}/sections`, request, token!),
    onSuccess: (section: SectionResponse) => {
      queryClient.invalidateQueries({ queryKey: ['sections', campaign.campaignId] });
      setDialogOpen(false);
      navigateTo(`/campaigns/${campaign.campaignId}/sections/${section.sectionId}`);
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
                    isActive={isActive(`/campaigns/${campaign.campaignId}/maps`)}
                    onClick={() => navigateTo(`/campaigns/${campaign.campaignId}/maps`)}
                  >
                    <MapIcon />
                    Maps
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
              Lore
              {isDM && sections.length > 1 && (
                <button onClick={() => setReorderOpen(true)} className="text-muted-foreground transition-colors group/pin p-1 rounded transition-all hover:!bg-foreground/15">
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              )}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sections.length > 0 && sections.map((section) => (
                  <SidebarMenuItem key={section.sectionId}>
                    <SidebarMenuButton
                      isActive={isActive(`/campaigns/${campaign.campaignId}/sections/${section.sectionId}`)}
                      onClick={() => navigateTo(`/campaigns/${campaign.campaignId}/sections/${section.sectionId}`)}>
                      <SectionIcon name={section.icon} />
                      {section.title}
                    </SidebarMenuButton>
                    <SidebarMenuAction
                      showOnHover={!section.isPinned}
                      onClick={() => pinSection(section)}
                      title={section.isPinned ? 'Unpin' : 'Pin'}
                      className="group/pin hover:!bg-foreground/15 text-muted-foreground hover:text-foregroundp p-1"
                    >
                      {section.isPinned ? (
                        <>
                          <Pin className="h-3 w-3 fill-current group-hover/pin:hidden text-primary" />
                          <PinOff className="h-3 w-3 hidden group-hover/pin:block text-primary" />
                        </>
                      ) : (
                        <Pin className="h-3 w-3 text-muted-foreground" />
                      )}
                    </SidebarMenuAction>
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
                  Add lore section
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        )}
      </Sidebar>
      <ReorderSectionsModal open={reorderOpen}
        onOpenChange={setReorderOpen}
        onSave={reorderSections}
        isPending={isReorderPending}
        parentSectionId={null}
        campaignId={String(campaign.campaignId)}
        token={token!} />
      <CreateSectionModal open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={createSection}
        isPending={isPending}
        parentSectionId={null} />
    </>
  )
}

export default AppSidebar
