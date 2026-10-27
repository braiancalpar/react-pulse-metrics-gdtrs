// Versão 2 de fetch de campanhas - usa useCallback + dispatch redux
// Dívida: duplica o useCampaigns mas via Redux, confuso para o time
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from '../redux/actions/campaignActions';

export function useCampaignData(filters?: any) {
  const dispatch = useDispatch();
  const { list: campaigns, loading, error } = useSelector((state: any) => state.campaigns);
  const [localFilter, setLocalFilter] = useState(filters);

  const load = useCallback(() => {
    dispatch(fetchCampaigns(localFilter) as any);
  }, [dispatch, localFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = () => load();

  return { campaigns, loading, error, refresh, setFilter: setLocalFilter };
}
