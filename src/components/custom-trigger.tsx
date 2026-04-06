import { useSidebar } from "@/components/ui/sidebar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

export function CustomTrigger() {
  const { toggleSidebar, state, isMobile } = useSidebar();

  return (
    <div onClick={toggleSidebar} className="absolute top-1/2 px-1 py-3 border rounded-sm border-l-0 rounded-s-none hover:bg-[#e8e4dd] border-sidebar-border">
        { isMobile ? <ChevronRight/> : state == 'collapsed' ? <ChevronRight/> : <ChevronLeft /> }
    </div>
  )
}