import AppHeader from "@/components/app-header"
import AppSidebar from "@/components/app-sidebar"
import { CustomTrigger } from "@/components/custom-trigger"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

function Campaigns({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <AppHeader />
            <div className="flex flex-1 overflow-hidden">
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <CustomTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </div>
        </div>
    )
}

export default Campaigns