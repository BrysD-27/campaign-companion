import { useAuth } from '@/context/auth-context';
import { CampaignContext } from '@/context/campaign-context';
import { api } from '@/lib/api';
import { type CampaignResponse } from '@/types/campaign';
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

    const { data: campaign, isPending, isError } = useQuery({
        queryKey: ['campaign', campaignId],
        queryFn: () => api.get<CampaignResponse>(`/campaigns/${campaignId}`, token!),
        enabled: !!campaignId && !!token,
    });

    useEffect(() => {
        if (isError) {
            toast.error('Campaign not found.');
            navigate('/');
        }
    }, [isError]);

    useEffect(() => {
        setLoading(isPending);
    }, [isPending]);

    if (isPending || isError) return null;
    if (!campaign) return null;

    return (
        <CampaignContext.Provider value={{ campaign }}>
            {children}
        </CampaignContext.Provider>
    );
}