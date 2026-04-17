export interface EntryBlockResponse {
    entryBlockId: number;
    content: string;
    isDmOnly: boolean;
}

export interface EntryResponse {
    entryId: number;
    title: string;
}

export interface AncestryItem {
    sectionId: number;
    title: string;
}

export interface MemberShareResponse {
    campaignMemberId: number;
    characterName: string;
    characterImageUrl: string | null;
    role: string;
}

export interface SectionResponse {
    sectionId: number;
    campaignId: number;
    parentSectionId: number | null;
    title: string;
    icon: string | null;
    isSystem: boolean;
    isDmOnly: boolean;
    sortOrder: number;
    blocks: EntryBlockResponse[];
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
