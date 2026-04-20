import { createContext, useContext } from 'react';
import { type CampaignMember, type CampaignResponse } from '@/types/campaign';

interface CampaignContextValue {
  campaign: CampaignResponse;
  currentMember: CampaignMember;
  members: CampaignMember[];
  isCampaignPending: boolean;
  isMemberPending: boolean;
  isMembersPending: boolean;
}

export const CampaignContext = createContext<CampaignContextValue | null>(null);

export function useCampaignContext() {
  const ctx = useContext(CampaignContext);
  if (!ctx) throw new Error('useCampaignContext must be used within CampaignProvider');
  return ctx;
}

export function useOptionalCampaignContext() {
  return useContext(CampaignContext);
}