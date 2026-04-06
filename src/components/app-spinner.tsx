import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { Spinner } from "./ui/spinner";

function AppSpinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <div className="w-full h-svh flex items-center justify-center">
            <LoaderIcon
                role="status"
                aria-label="Loading"
                className={cn("size-14 animate-spin", className)}
                {...props}
            />
        </div>
    )
}

export default AppSpinner