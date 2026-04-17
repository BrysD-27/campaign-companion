import DeleteCampaignModal from '@/components/delete-campaign-modal'
import EditCampaignModal from '@/components/edit-campaign-modal'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/auth-context'
import { useCampaignContext } from '@/context/campaign-context'
import { useCampaignRole } from '@/hooks/use-campaign-role'
import { api } from '@/lib/api'
import type { CampaignDashboard } from '@/types/campaign'
import { useQuery } from '@tanstack/react-query'
import { Copy, Pencil, RefreshCw, Trash2, UserMinus } from 'lucide-react'
import { useState } from 'react'

const avatarColors = [
    'bg-purple-100 text-purple-800',
    'bg-teal-100 text-teal-800',
    'bg-orange-100 text-orange-800',
    'bg-amber-100 text-amber-800',
]

const CampaignDashboardPage = () => {
    const { campaign } = useCampaignContext();
    const { isDM } = useCampaignRole();
    const { token } = useAuth();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);


    const { data: campaignDashboard, isLoading } = useQuery({
        queryKey: ['campaign-dashboard', campaign.campaignId],
        queryFn: () => api.get<CampaignDashboard>(`/campaigns/${campaign.campaignId}`, token!),
    })

    const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

    if (isLoading) return <CampaignDashboardSkeleton />
    if (!campaign) return <p className="p-6 text-sm text-muted-foreground">Campaign not found.</p>

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-medium">{campaign.title}</h1>
                    <p className="text-sm text-muted-foreground">Dungeon Master — {campaign.role}</p>
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
                                className="text-destructive border-destructive hover:bg-destructive/10"
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                <Trash2 />
                                Delete
                            </Button>
                        </div>
                    )
                }
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Players', value: !campaign.members && 3 },
                    { label: 'Sessions', value: campaign.sessionCount },
                    { label: 'Lore entries', value: campaign.entryCount },
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
                        {campaign.members && campaign.members.map((member, i) => (
                            <div key={member.campaignMemberId} className="flex items-center gap-3 py-2 border-b last:border-0">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                                    {member.characterName.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{member.characterName}</p>
                                    <p className="text-xs text-muted-foreground truncate">{member.characterClass}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive shrink-0">
                                    <UserMinus className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}

                        {campaign.members && campaign.members.length === 0 && (
                            <p className="text-sm text-muted-foreground py-2">No players yet.</p>
                        )}
                    </div>
                </div>

                {/* Invite */}
                <div className="border border-border rounded-lg p-5 space-y-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Invite players</p>

                    <div className="space-y-2">
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
                    </div>

                    <div className="space-y-2">
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
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                        <RefreshCw className="h-3 w-3" />
                        Regenerate code
                    </Button>
                </div>

            </div>
            <EditCampaignModal dialogOpen={editDialogOpen} setDialogOpen={setEditDialogOpen} campaign={campaign} />
            <DeleteCampaignModal dialogOpen={deleteDialogOpen} setDialogOpen={setDeleteDialogOpen} campaign={campaign} />
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
