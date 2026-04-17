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
    characterName: string
    characterClass: string
    avatarUrl: string | null
    role: string
}

export interface CampaignDashboard {
    campaignId: number
    title: string
    description: string | null
    dmName: string
    sessionCount: number
    entryCount: number
    joinCode: string
    joinLink: string
    members: CampaignMember[]
}

export interface Campaign {
    campaignId: number;
    dmUserId: number;
    title: string;
    description?: string;
    isArchived?: boolean;
    createdAt: boolean;
}