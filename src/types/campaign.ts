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