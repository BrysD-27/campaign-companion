import type { EntryResponse, MemberShareResponse } from './entry';

export type { EntryResponse };

export interface AncestryItem {
    sectionId: number;
    title: string;
}

export type { MemberShareResponse } from './entry';

export interface SectionResponse {
    sectionId: number;
    campaignId: number;
    parentSectionId: number | null;
    title: string;
    icon: string | null;
    isSystem: boolean;
    isDmOnly: boolean;
    sortOrder: number;
    isPinned: boolean;
    subSections: SectionResponse[];
    entries: EntryResponse[];
    ancestry: AncestryItem[];
    shares: MemberShareResponse[];
}

export interface CreateSectionRequest {
    parentSectionId?: number;
    title: string;
    icon?: string;
    isDmOnly: boolean;
    sortOrder: number;
}

export interface UpdateSectionRequest {
    title: string;
    icon?: string;
}

export interface ShareSectionRequest {
    campaignMemberIds: number[];
}