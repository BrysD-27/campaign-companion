import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { Button } from "./ui/button";

export function CustomTrigger() {
  const { toggleSidebar, open, isMobile } = useSidebar();

  return (
    <div className="absolute top-3/8 left-0">
      <Button variant={"outline"} className="border-l-0 rounded-l-none" onClick={toggleSidebar}>
        {isMobile ? <PanelLeftOpenIcon /> : open ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
      </Button>
    </div>
  )
}