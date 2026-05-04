import { useAuth } from "@/context/auth-context"
import { useCampaignContext } from "@/context/campaign-context"
import { useLoading } from "@/hooks/use-loading"
import { api } from "@/lib/api"
import type { Campaign } from "@/types/campaign"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

function EditCampaignModal({ dialogOpen, setDialogOpen }: { dialogOpen: boolean, setDialogOpen: (open: boolean) => void }) {
    const { token } = useAuth();
    let { campaign } = useCampaignContext();
    const [title, setTitle] = useState(campaign.title);
    const [description, setDescription] = useState(campaign.description);
    const queryClient = useQueryClient();
    const { setLoading } = useLoading();

    const { mutate: updateCampaign, isPending: isUpdating } = useMutation({
        mutationFn: () => {
            campaign = {
                ...campaign,
                title: title,
                description: description
            };

            return api.put<Campaign>(`/campaigns/${campaign.campaignId}`, campaign, token!);
        },
        onSuccess: (updatedCampaign: Campaign) => {
            queryClient.setQueryData(['campaign', updatedCampaign.campaignId], updatedCampaign)
            queryClient.invalidateQueries({ queryKey: ['campaign'] })
            setDialogOpen(false);
            toast.success('Campaign updated.');
        },
        onError: () => {
            toast.error('Error updating campaign');
        }
    })

    useEffect(() => {
        setLoading(isUpdating);
    }, [isUpdating]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Campaign</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='title'>Title</Label>
                        <Input
                            id='title'
                            placeholder='Campaign title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea
                            id='description'
                            placeholder='A brief description of your campaign...'
                            value={description ?? ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => updateCampaign()} disabled={!title || isUpdating}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCampaignModal