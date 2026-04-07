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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/ui/sidebar"
import type { AppSidebarProps, Section } from "@/props/AppSidebarProps"
import { BookOpen, ChevronRight, EarthIcon, List, MapIcon, Plus } from "lucide-react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

function AppSidebar({ campaignTitle, role, sections }: AppSidebarProps) {
    const navigate = useNavigate()
    const { id: campaignId } = useParams()
    const { pathname } = useLocation()

    const isActive = (path: string) => pathname === path

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="px-2 py-1">
                    <p className="text-sm font-medium text-foreground">{campaignTitle}</p>
                    <p className="text-xs text-muted-foreground">
                        {role === 'DM' ? 'Dungeon Master' : 'Player'}
                    </p>
                </div>
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
                                <SidebarSectionItem
                                    key={section.id}
                                    section={section}
                                    campaignId={campaignId!}
                                    isActive={isActive}
                                    navigate={navigate}
                                />
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

const SidebarSectionItem = ({
  section,
  campaignId,
  isActive,
  navigate,
}: {
  section: Section
  campaignId: string
  isActive: (path: string) => boolean
  navigate: (path: string) => void
}) => {
  if (section.subSections.length > 0) {
    return (
      <Collapsible asChild>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={isActive(`/campaigns/${campaignId}/sections/${section.id}`)}
              onClick={() => navigate(`/campaigns/${campaignId}/sections/${section.id}`)}
            >
              <BookOpen />
              {section.title}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarSubTree
                sections={section.subSections}
                campaignId={campaignId}
                isActive={isActive}
                navigate={navigate}
              />
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem key={section.id}>
      <SidebarMenuButton
        isActive={isActive(`/campaigns/${campaignId}/sections/${section.id}`)}
        onClick={() => navigate(`/campaigns/${campaignId}/sections/${section.id}`)}
      >
        <BookOpen />
        {section.title}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const SidebarSubTree = ({
  sections,
  campaignId,
  isActive,
  navigate,
}: {
  sections: Section[]
  campaignId: string
  isActive: (path: string) => boolean
  navigate: (path: string) => void
}) => {
  return (
    <>
      {sections.map((section) =>
        section.subSections.length > 0 ? (

          <Collapsible key={section.id} asChild>
            <SidebarMenuSubItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuSubButton
                  isActive={isActive(`/campaigns/${campaignId}/sections/${section.id}`)}
                  onClick={() => navigate(`/campaigns/${campaignId}/sections/${section.id}`)}
                >
                  {section.title}
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuSubButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarSubTree
                    sections={section.subSections}
                    campaignId={campaignId}
                    isActive={isActive}
                    navigate={navigate}
                  />
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuSubItem>
          </Collapsible>

        ) : (

          <SidebarMenuSubItem key={section.id}>
            <SidebarMenuSubButton
              isActive={isActive(`/campaigns/${campaignId}/sections/${section.id}`)}
              onClick={() => navigate(`/campaigns/${campaignId}/sections/${section.id}`)}
            >
              {section.title}
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>

        )
      )}
    </>
  )
}

export default AppSidebar