import { useAuth } from "@/context/auth-context"
import { useCampaignContext } from "@/context/campaign-context"
import { useLoading } from "@/hooks/use-loading"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

function ArchiveCampaignModal({ dialogOpen, setDialogOpen }: { dialogOpen: boolean, setDialogOpen: (open: boolean) => void }) {
    const { token } = useAuth();
    const { campaign } = useCampaignContext();
    const queryClient = useQueryClient();
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const { mutate: archiveCampaign, isPending } = useMutation({
        mutationFn: () =>
            api.patch(`/campaigns/${campaign.campaignId}/archive`, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            queryClient.invalidateQueries({ queryKey: ['campaign'] });
            setDialogOpen(false);
            toast.success('Campaign archived.');
            navigate('/');
        },
        onError: () => {
            toast.error('Error archiving Campaign.')
        }
    });

    useEffect(() => {
        setLoading(isPending);
    }, [isPending]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Archive Campaign</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <p>Are you sure you want to archive <strong>{campaign.title}</strong>?</p>
                        <p className="text-muted-foreground small">You can unarchive it anytime.</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => archiveCampaign()} disabled={isPending}>
                        Archive
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ArchiveCampaignModal