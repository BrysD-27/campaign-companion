import type { MemberShareResponse } from './sections';

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