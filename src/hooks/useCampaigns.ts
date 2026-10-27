// Versão 1 de fetch de campanhas - usa useEffect + axios direto
// Dívida: 3 hooks fazem a mesma coisa de formas diferentes (useCampaignData e useMetrics também)
import { useState, useEffect } from 'react';
import { campaignService } from '../services/campaignService';

export function useCampaigns(initialFilters?: any) {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(initialFilters ?? { status: 'all' });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    campaignService.getAll(filters).then(data => {
      if (!cancelled) {
        setCampaigns(data as any[]);
        setLoading(false);
      }
    }).catch(err => {
      if (!cancelled) {
        setError(err.message);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  return { campaigns, loading, error, filters, setFilters };
}
