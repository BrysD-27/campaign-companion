export interface CampaignResponse {
    campaignId: number;
    title: string;
    description: string | null;
    role: string;
    memberCount: number;
    isArchived: boolean;
    archivedAt: Date | null;
    createdAt: Date;
    lastSessionTitle: string | null;
    lastSessionNumber: number | null;
    lastSessionEndDate: Date | null;
    lastSessionStatus: string | null;
}

export interface CampaignMember {
    campaignMemberId: number
    userId: number
    username: string
    role: string
    characterName: string | null
    characterImageUrl: string | null
    joinedAt: string
    displayName: string
}

export interface Campaign {
    campaignId: number;
    dmUserId: number;
    title: string;
    description?: string;
    isArchived?: boolean;
    createdAt: boolean;
}