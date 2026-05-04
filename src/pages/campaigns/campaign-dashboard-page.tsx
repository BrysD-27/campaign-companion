import ArchiveCampaignModal from '@/components/archive-campaign-modal'
import EditCampaignModal from '@/components/edit-campaign-modal'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCampaignContext } from '@/context/campaign-context'
import { useCampaignRole } from '@/hooks/use-campaign-role'
import { Archive, Pencil, RefreshCw, UserMinus } from 'lucide-react'
import { useState } from 'react'

const avatarColors = [
    'bg-purple-100 text-purple-800',
    'bg-teal-100 text-teal-800',
    'bg-orange-100 text-orange-800',
    'bg-amber-100 text-amber-800',
]

const CampaignDashboardPage = () => {
    const { campaign, members, isCampaignPending, isMemberPending, isMembersPending } = useCampaignContext();
    const { isDM } = useCampaignRole();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

    const players = members.filter(m => m.role === 'player');

    if (isCampaignPending || isMemberPending || isMembersPending) return <CampaignDashboardSkeleton />

    if (!campaign) return <p className="p-6 text-sm text-muted-foreground">Campaign not found.</p>

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-medium">{campaign.title}</h1>
                    <p className="text-sm text-muted-foreground">Dungeon Master — {members.find(m => m.role === 'DM')?.displayName}</p>
                    {campaign.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl pt-1">
                            {campaign.description}
                        </p>
                    )}
                </div>
                {
                    isDM && (
                        <div className="flex items-center gap-2 shrink-0">
                            <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
                                <Pencil />
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setArchiveDialogOpen(true)}
                            >
                                <Archive />
                                Archive
                            </Button>
                        </div>
                    )
                }
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Players', value: players.length },
                    { label: 'Sessions', value: 0 },
                    { label: 'Lore entries', value: 0 },
                ].map(({ label, value }) => (
                    <div key={label} className="bg-muted rounded-lg p-4">
                        <p className="text-2xl font-medium">{value}</p>
                        <p className="text-sm text-muted-foreground">{label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Party */}
                <div className="border border-border rounded-lg p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Party</p>
                        <Button variant="outline" size="sm">+ Invite</Button>
                    </div>

                    <div className="space-y-1">
                        {players.map((player, i) => (
                            <div key={player.campaignMemberId} className="flex items-center gap-3 py-2 border-b last:border-0">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                                    {player.displayName.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{player.displayName}</p>
                                    <p className="text-xs text-muted-foreground truncate">{player.role}</p>
                                </div>
                                {isDM && (
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive shrink-0">
                                        <UserMinus className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}

                        {players.length === 0 && (
                            <p className="text-sm text-muted-foreground py-2">No players yet — invite some using the code or link to the right.</p>
                        )}
                    </div>
                </div>

                {/* Invite */}
                <div className="border border-border rounded-lg p-5 space-y-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Invite players</p>

                    {/* <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Join code</p>
                        <div className="flex items-center justify-between bg-muted rounded-md px-3 py-2">
                            <span className="font-mono text-base font-medium tracking-widest">
                                {campaign.joinCode}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(campaign.joinCode)}
                            >
                                <Copy className="h-3 w-3" />
                                Copy
                            </Button>
                        </div>
                    </div> */}

                    {/* <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Join link</p>
                        <div className="flex items-center justify-between bg-muted rounded-md px-3 py-2 gap-2">
                            <span className="font-mono text-xs text-muted-foreground truncate">
                                {campaign.joinLink}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="shrink-0"
                                onClick={() => copyToClipboard(campaign.joinLink)}
                            >
                                <Copy className="h-3 w-3" />
                                Copy
                            </Button>
                        </div>
                    </div> */}

                    <Button variant="outline" size="sm" className="w-full">
                        <RefreshCw className="h-3 w-3" />
                        Regenerate code
                    </Button>
                </div>

            </div>
            <EditCampaignModal dialogOpen={editDialogOpen} setDialogOpen={setEditDialogOpen} />
            <ArchiveCampaignModal dialogOpen={archiveDialogOpen} setDialogOpen={setArchiveDialogOpen} />
        </div>
    )
}

const CampaignDashboardSkeleton = () => (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
            </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
        </div>
    </div>
)

export default CampaignDashboardPage
