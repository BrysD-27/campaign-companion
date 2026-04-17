import CreateCampaignModal from '@/components/create-campaign-modal'
import AppHeader from '@/components/layout/app-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { useAuth } from '@/context/auth-context'
import { useLoading } from '@/hooks/use-loading'
import { api } from '@/lib/api'
import type { CampaignResponse } from '@/types/campaign'
import { useQuery } from '@tanstack/react-query'
import { ChevronRightIcon, CircleSlash, DotIcon, MoveRightIcon, PlusIcon, UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

function getLastActiveLabel(date: string | Date): string {
    const now = new Date();
    const last = new Date(date);

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());

    const diffDays = Math.floor((today.getTime() - lastDay.getTime()) / 86_400_000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
}


function HomePage() {
    const { token } = useAuth();
    const { setLoading } = useLoading();
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data: campaigns, isPending, isError } = useQuery({
        queryKey: ['campaigns'],
        queryFn: () => api.get<CampaignResponse[]>('/campaigns', token!)
    });

    useEffect(() => {
        setLoading(isPending);
    }, [isPending]);

    const active = campaigns?.filter(c => !c.isArchived) ?? []
    const archived = campaigns?.filter(c => c.isArchived) ?? []

    return (
        <>
            <AppHeader />
            <main className='flex min-h-0 flex-1 flex-col'>
                <div className='mx-auto flex w-full max-w-[80rem] min-w-0 flex-col flex-1 gap-6 px-4 py-6 md:px-0 lg:py-8'>
                    <div className='flex flex-1 justify-between md:justify-start md:gap-6'>
                        <Button onClick={() => setDialogOpen(true)}>
                            <PlusIcon />
                            Create a campaign
                        </Button>
                        <Button>
                            <MoveRightIcon />
                            Join a campaign
                        </Button>
                    </div>
                    <div>
                        <h5 className='font-semibold'>Your Campaigns</h5>
                    </div>
                    <div className='flex w-full max-w flex-col gap-6'>
                        {
                            active.length < 1 && (
                                <Item>
                                    <ItemMedia variant="icon">
                                        <CircleSlash />
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>No active campaigns found</ItemTitle>
                                        <ItemDescription>
                                            Create or Join a campaign to get started
                                        </ItemDescription>
                                    </ItemContent>
                                </Item>
                            )
                        }
                        {
                            active.map((campaign: CampaignResponse) => {
                                return (
                                    <Item key={campaign.campaignId} variant="outline" asChild className='shadow-sm'>
                                        <a href={"/campaigns/" + campaign.campaignId} >
                                            <ItemContent>
                                                <ItemTitle>{campaign.title}</ItemTitle>
                                                <ItemDescription>
                                                    <span className='flex items-center'>
                                                        <Badge variant="outline">{campaign.role === 'DM' ? 'Dungeon Master' : 'Player'}</Badge>
                                                        {
                                                            campaign.lastSessionNumber && (
                                                                <>
                                                                    <DotIcon />
                                                                    <span className='text-xs'>
                                                                        Session {campaign.lastSessionNumber} {campaign.lastSessionStatus && ` &middot; ${campaign.lastSessionStatus}`}
                                                                    </span>
                                                                </>
                                                            )
                                                        }
                                                    </span>
                                                </ItemDescription>
                                            </ItemContent>
                                            <ItemActions>
                                                <div className='flex items-center'>
                                                    <UsersIcon className='size-3 me-1' />
                                                    <span className='text-xs'>
                                                        {campaign.memberCount}
                                                    </span>
                                                </div>
                                                <span className='text-xs'>
                                                    {campaign.lastSessionEndDate && `Active ${getLastActiveLabel(campaign.lastSessionEndDate)}`}
                                                </span>
                                                <ChevronRightIcon className="size-4" />
                                            </ItemActions>
                                        </a>
                                    </Item>
                                )
                            })
                        }
                    </div>
                    {
                        archived.length > 0 &&
                        (
                            <>
                                <div>
                                    <h5 className='font-semibold'>Archived Campaigns</h5>
                                </div>
                                <div className='flex w-full max-w flex-col gap-6'>
                                    {
                                        archived.map((campaign: CampaignResponse) => {
                                            return (
                                                <Item variant="outline" asChild className='shadow-sm'>
                                                    <a href="/campaigns/1" >
                                                        <ItemContent>
                                                            <ItemTitle>{campaign.title}</ItemTitle>
                                                            <ItemDescription>
                                                                <span className='flex items-center'>
                                                                    <Badge variant="outline">{campaign.role === 'DM' ? 'Dungeon Master' : 'Player'}</Badge>
                                                                    {
                                                                        campaign.lastSessionNumber && (
                                                                            <>
                                                                                <DotIcon />
                                                                                <span className='text-xs'>
                                                                                    Session {campaign.lastSessionNumber} {campaign.lastSessionStatus && ` &middot; ${campaign.lastSessionStatus}`}
                                                                                </span>
                                                                            </>
                                                                        )
                                                                    }
                                                                </span>
                                                            </ItemDescription>
                                                        </ItemContent>
                                                        <ItemActions>
                                                            <div className='flex items-center'>
                                                                <UsersIcon className='size-3 me-1' />
                                                                <span className='text-xs'>
                                                                    {campaign.memberCount}
                                                                </span>
                                                            </div>
                                                            <span className='text-xs'>
                                                                {campaign.lastSessionEndDate && `Active ${getLastActiveLabel(campaign.lastSessionEndDate)}`}
                                                            </span>
                                                            <ChevronRightIcon className="size-4" />
                                                        </ItemActions>
                                                    </a>
                                                </Item>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </main>
            <CreateCampaignModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        </>
    )
}

export default HomePage
