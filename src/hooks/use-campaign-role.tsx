import { useCampaignContext } from "@/context/campaign-context";

export function useCampaignRole() {
  const { campaign } = useCampaignContext();
  return {
    role: campaign.role,
    isDM: campaign.role === 'DM',
    isPlayer: campaign.role === 'Player',
  };
}