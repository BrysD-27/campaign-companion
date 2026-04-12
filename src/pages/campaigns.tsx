import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import { CustomTrigger } from "@/components/custom-trigger";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { CampaignResponse } from "@/types/campaign";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";

function Campaigns() {
  const { campaignId } = useParams();
  const { token } = useAuth();

  const { data: campaign, isPending, isError } = useQuery({
    queryKey: ['campaign'],
    queryFn: () => api.get<CampaignResponse>(`/campaigns/${campaignId}`, token!)
  });

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider >
          <AppSidebar
            campaignTitle={campaign?.title}
            role={campaign?.role}
            sections={[]}
          />
          <main className="flex-1 overflow-y-auto p-6 relative">
            <CustomTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </div>
  )
}

export default Campaigns