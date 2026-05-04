export interface MemberShareResponse {
  campaignMemberId: number;
  characterName: string;
  characterImageUrl: string | null;
  role: string;
}

export interface EntryResponse {
  entryId:   number;
  sectionId: number;
  content:   string | null;
  isDmOnly:  boolean;
  sortOrder: number;
  isPinned:  boolean;
  updatedAt: string;
  shares:    MemberShareResponse[];
}