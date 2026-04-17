import { useAuth } from "@/context/auth-context"
import { useLoading } from "@/hooks/use-loading"
import { api } from "@/lib/api"
import type { CampaignDashboard } from "@/types/campaign"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

function DeleteCampaignModal({ dialogOpen, setDialogOpen, campaign }: { dialogOpen: boolean, setDialogOpen: (open: boolean) => void, campaign: CampaignDashboard }) {
    const { token } = useAuth();
    const queryClient = useQueryClient();
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const { mutate: deleteCampaign, isPending } = useMutation({
        mutationFn: () =>
            api.delete(`/campaigns/${campaign.campaignId}`, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            queryClient.invalidateQueries({ queryKey: ['campaign'] });
            setDialogOpen(false);
            toast.success('Campaign deleted');
            navigate('/');
        },
        onError: () => {
            toast.error('Error deleting Campaign.')
        }
    });

    useEffect(() => {
        setLoading(isPending);
    }, [isPending]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Campaign</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <p>Are you sure you want to delete <strong>{campaign.title}</strong>?</p>
                        <p className="text-muted-foreground small">This action cannot be undone.</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant={"destructive"} onClick={() => deleteCampaign()} disabled={isPending}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteCampaignModal