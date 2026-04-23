import { CreateMapModal } from '@/components/create-map-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useCampaignRole } from '@/hooks/use-campaign-role';
import { api } from '@/lib/api';
import type { CreateMapRequest, MapResponse } from '@/types/maps';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MapIcon, Pin, PinOff, Plus } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function MapItem({ map, onPin }: { map: MapResponse; onPin: (map: MapResponse) => void }) {
    const uploadedAt = new Date(map.uploadedAt).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
    });

    return (
        <div className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer group">
            <div className="h-14 w-20 rounded-md overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                <img
                    src={map.imageUrl}
                    alt={map.title}
                    className="h-full w-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium truncate">{map.title}</p>
                    {map.isDmOnly && <Badge variant="secondary" className="text-xs py-0">DM only</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 transition-colors">{uploadedAt}</p>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onPin(map); }}
                title={map.isPinned ? 'Unpin' : 'Pin'}
                className={`group/pin p-1 rounded transition-all hover:!bg-foreground/15 shrink-0 ${map.isPinned ? 'opacity-100 text-primary' : 'opacity-100 xl:opacity-0 group-hover:opacity-100 text-muted-foreground/60'}`}
            >
                {map.isPinned ? (
                    <>
                        <Pin className="h-3.5 w-3.5 fill-current group-hover/pin:hidden" />
                        <PinOff className="h-3.5 w-3.5 hidden group-hover/pin:block" />
                    </>
                ) : (
                    <Pin className="h-3.5 w-3.5" />
                )}
            </button>
        </div>
    );
}

const MapsPage = () => {
    const { campaignId } = useParams();
    const { token } = useAuth();
    const { isDM } = useCampaignRole();
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);

    const { data: maps = [], isLoading } = useQuery({
        queryKey: ['maps', campaignId],
        queryFn: () => api.get<MapResponse[]>(`/campaigns/${campaignId}/maps`, token!),
    });

    const { mutate: pinMap } = useMutation({
        mutationFn: (target: MapResponse) => target.isPinned
            ? api.delete(`/campaigns/${campaignId}/pins`, token!, { resourceType: 'map', resourceId: target.mapId })
            : api.post(`/campaigns/${campaignId}/pins`, { resourceType: 'map', resourceId: target.mapId }, token!),
        onMutate: async (target) => {
            await queryClient.cancelQueries({ queryKey: ['maps', campaignId] });
            const previous = queryClient.getQueryData<MapResponse[]>(['maps', campaignId]);
            queryClient.setQueryData<MapResponse[]>(['maps', campaignId], (old = []) => {
                const updated = old.map(m => m.mapId === target.mapId ? { ...m, isPinned: !m.isPinned } : m);
                return [...updated].sort((a, b) => {
                    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
                    return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
                });
            });
            return { previous };
        },
        onError: (_, __, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(['maps', campaignId], ctx.previous);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['maps', campaignId] }),
    });

    const { mutate: createMap, isPending } = useMutation({
        mutationFn: (request: CreateMapRequest) =>
            api.post(`/campaigns/${campaignId}/maps`, request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maps', campaignId] });
            setModalOpen(false);
        },
    });

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">Maps</h1>
                {isDM && (
                    <Button size="sm" onClick={() => setModalOpen(true)}>
                        <Plus />
                        Add map
                    </Button>
                )}
            </div>

            {isLoading ? (
                <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-20 rounded-lg border border-border bg-muted/40 animate-pulse" />
                    ))}
                </div>
            ) : maps.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                    <MapIcon className="h-10 w-10 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">No maps yet.</p>
                    {isDM && (
                        <Button size="sm" variant="outline" onClick={() => setModalOpen(true)}>
                            <Plus />
                            Add your first map
                        </Button>
                    )}
                </div>
            ) : (
                <div className="space-y-2">
                    {maps.map((map) => (
                        <MapItem key={map.mapId} map={map} onPin={pinMap} />
                    ))}
                </div>
            )}

            <CreateMapModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                onSubmit={createMap}
                isPending={isPending}
            />
        </div>
    );
};

export default MapsPage;
