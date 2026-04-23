import type { MemberShareResponse } from './sections';

export interface MapResponse {
    mapId: number;
    campaignId: number;
    title: string;
    imageUrl: string;
    isDmOnly: boolean;
    uploadedAt: string;
    isPinned: boolean;
    shares: MemberShareResponse[];
}

export interface CreateMapRequest {
    title: string;
    imageUrl: string;
    isDmOnly: boolean;
}

export interface UpdateMapRequest {
    title: string;
    isDmOnly: boolean;
}
