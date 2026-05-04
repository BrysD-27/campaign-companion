import { api } from "@/lib/api";
import type { CampaignMember } from "@/types/campaign";
import type { MemberShareResponse, SectionResponse } from "@/types/sections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

interface ShareSectionPopoverProps {
    section: SectionResponse;
    members: CampaignMember[];
    campaignId: string;
    sectionId: string;
    token: string;
}

function MemberRow({ member, isShared, onToggle, isPending }: {
    member: CampaignMember;
    isShared: boolean;
    onToggle: () => void;
    isPending: boolean;
}) {
    return (
        <label className="flex items-center gap-3 py-2 px-1 rounded cursor-pointer hover:bg-accent">
            <Checkbox
                checked={isShared}
                onCheckedChange={onToggle}
                disabled={isPending}
                className="ms-2"
            />
            <div className="min-w-0">
                <p className="text-sm font-medium truncate">{member.displayName}</p>
                {member.characterName && (
                    <p className="text-xs text-muted-foreground truncate">{member.characterName}</p>
                )}
            </div>
            {isPending && <Loader2 className="size-3 animate-spin ml-auto shrink-0" />}
        </label>
    );
}

export function ShareSectionPopover({ section, members, campaignId, sectionId, token }: ShareSectionPopoverProps) {
    const queryClient = useQueryClient();
    const players = members.filter(m => m.role !== 'dm');

    const sharedIds = new Set(section.shares.map((s: MemberShareResponse) => s.campaignMemberId));

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['section', sectionId] });

    const { mutate: share, isPending: isSharing, variables: sharingId } = useMutation({
        mutationFn: (memberIds: number[]) =>
            api.post(`/campaigns/${campaignId}/sections/${sectionId}/shares`, { campaignMemberIds: memberIds }, token),
        onSuccess: invalidate,
    });

    const { mutate: unshare, isPending: isUnsharing, variables: unsharingId } = useMutation({
        mutationFn: (memberId: number) =>
            api.delete(`/campaigns/${campaignId}/sections/${sectionId}/shares/${memberId}`, token),
        onSuccess: invalidate,
    });

    const allShared = players.length > 0 && players.every(m => sharedIds.has(m.campaignMemberId));
    const isBulkPending = isSharing && Array.isArray(sharingId) && sharingId.length > 1;

    const handleToggleAll = () => {
        if (allShared) {
            players.forEach(m => unshare(m.campaignMemberId));
        } else {
            const unsharedIds = players.filter(m => !sharedIds.has(m.campaignMemberId)).map(m => m.campaignMemberId);
            if (unsharedIds.length > 0) share(unsharedIds);
        }
    };

    return (
        <Popover>
            <PopoverTrigger render={
                <Button variant="outline" size="sm">
                    <Eye />
                    Share
                </Button>
            }>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="end">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">Share with players</p>
                {players.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2">No players in this campaign.</p>
                ) : (
                    <>
                        <label className="flex items-center gap-3 py-2 px-1 rounded cursor-pointer hover:bg-accent">
                            <Checkbox
                                checked={allShared}
                                onCheckedChange={handleToggleAll}
                                disabled={isBulkPending || isUnsharing}
                                className="ms-2"
                            />
                            <span className="text-sm font-medium">All players</span>
                            {isBulkPending && <Loader2 className="size-3 animate-spin ml-auto shrink-0" />}
                        </label>
                        <Separator className="my-1" />
                        <div className="space-y-0.5">
                            {players.map(member => {
                                const shared = sharedIds.has(member.campaignMemberId);
                                const pending = (isSharing && sharingId?.includes(member.campaignMemberId)) ||
                                    (isUnsharing && unsharingId === member.campaignMemberId);
                                return (
                                    <MemberRow
                                        key={member.campaignMemberId}
                                        member={member}
                                        isShared={shared}
                                        isPending={pending}
                                        onToggle={() => shared
                                            ? unshare(member.campaignMemberId)
                                            : share([member.campaignMemberId])
                                        }
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </PopoverContent>
        </Popover>
    );
}
