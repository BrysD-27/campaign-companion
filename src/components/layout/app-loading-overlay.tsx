import AppSpinner from "@/components/app-spinner";

function AppLoadingOverlay({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <AppSpinner />
        </div>
    )
}

export default AppLoadingOverlay
