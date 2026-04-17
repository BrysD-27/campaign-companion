import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { Button } from "./ui/button";

export function CustomTrigger() {
  const { toggleSidebar, open, isMobile } = useSidebar();

  return (
    <div className="fixed top-1/2 transition-[left] duration-200 ease-linear"
      style={{ left: !isMobile && open ? 'var(--sidebar-width)' : '0px' }}>
      <Button className="border-l-0 rounded-l-none bg-primary" onClick={toggleSidebar}>
        {isMobile ? <PanelLeftOpenIcon /> : open ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
      </Button>
    </div>
  )
}