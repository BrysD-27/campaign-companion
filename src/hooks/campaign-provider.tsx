import { useAuth } from '@/context/auth-context';
import { CampaignContext } from '@/context/campaign-context';
import { api } from '@/lib/api';
import { type CampaignMember, type CampaignResponse } from '@/types/campaign';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useLoading } from './use-loading';

export function CampaignProvider({ children }: { children: React.ReactNode }) {
    const { campaignId } = useParams();
    const { token } = useAuth();
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const { data: campaign, isPending: isCampaignPending, isError } = useQuery({
        queryKey: ['campaign', campaignId],
        queryFn: () => api.get<CampaignResponse>(`/campaigns/${campaignId}`, token!),
        enabled: !!campaignId && !!token,
    });

    const { data: currentMember, isPending: isMemberPending } = useQuery({
        queryKey: ['campaign-member', campaignId],
        queryFn: () => api.get<CampaignMember>(`/campaigns/${campaignId}/me`, token!),
        enabled: !!campaignId && !!token,
    });

    const { data: members, isPending: isMembersPending } = useQuery({
        queryKey: ['campaign-members', campaignId],
        queryFn: () => api.get<CampaignMember[]>(`/campaigns/${campaignId}/members`, token!),
        enabled: !!campaignId && !!token,
    });

    useEffect(() => {
        if (isError) {
            toast.error('Campaign not found.');
            navigate('/');
        }
    }, [isError]);

    useEffect(() => {
        setLoading(isCampaignPending || isMemberPending || isMembersPending);
    }, [isCampaignPending, isMemberPending, isMembersPending]);

    if (isCampaignPending || isMemberPending || isMembersPending || isError) return null;
    if (!campaign || !currentMember || !members) return null;

    return (
        <CampaignContext.Provider value={{ campaign, currentMember, members, isCampaignPending, isMemberPending, isMembersPending }}>
            {children}
        </CampaignContext.Provider>
    );
}