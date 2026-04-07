import AppHeader from "@/components/app-header"
import AppSidebar from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { Section } from "@/props/AppSidebarProps"
import { Outlet } from "react-router-dom"

const sections: Section[] = [
  {
    id: 1,
    title: 'Regions',
    subSections: [
      {
        id: 3,
        title: 'Dunhallow',
        subSections: [
          { id: 6, title: 'The Warden\'s Keep', subSections: [] },
          { id: 7, title: 'The Undercroft', subSections: [] },
        ]
      },
      { id: 4, title: 'Moon Tower Spire', subSections: [] },
    ]
  },
]
function Campaigns({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <AppHeader />
            <div className="flex flex-1 overflow-hidden">
                <SidebarProvider>
                    <AppSidebar
                        campaignTitle="Vale of Thorns"
                        role="DM"
                        sections={sections}
                    />
                    <main className="flex-1 overflow-y-auto p-6">
                        <Outlet />
                    </main>
                </SidebarProvider>
            </div>
        </div>
    )
}

export default Campaigns