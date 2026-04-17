import { CustomTrigger } from "@/components/custom-trigger";
import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCampaignContext } from "@/context/campaign-context";
import CampaignDashboardPage from "@/pages/campaigns/campaign-dashboard-page";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function CampaignsPage() {
  const { campaign } = useCampaignContext();
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(pathname === `/campaigns/${campaign.campaignId}`);
  }, [pathname]);

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-y-auto p-6 relative">
            <CustomTrigger />
            {isActive ? <CampaignDashboardPage /> : <Outlet />}
          </main>
        </SidebarProvider>
      </div>
    </div>
  )
}

export default CampaignsPage
