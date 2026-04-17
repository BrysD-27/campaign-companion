import { useAuth } from "@/context/auth-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useLoading } from "@/hooks/use-loading"
import { useNavigate } from "react-router-dom"
import type { CampaignResponse } from "@/types/campaign"

function CreateCampaignModal({ dialogOpen, setDialogOpen }: { dialogOpen: boolean, setDialogOpen: (open: boolean) => void }) {
    const { token } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient();
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const { mutate: createCampaign, isPending: isCreating } = useMutation({
        mutationFn: () => api.post<CampaignResponse>('/campaigns', { title, description }, token!),
        onSuccess: (newCampaign: CampaignResponse) => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            setDialogOpen(false);
            setTitle('');
            setDescription('');
            navigate(`campaigns/${newCampaign.campaignId}`);
        }
    });

    useEffect(() => {
        setLoading(isCreating);
    }, [isCreating]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Campaign</DialogTitle>
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => createCampaign()} disabled={!title || isCreating}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCampaignModal