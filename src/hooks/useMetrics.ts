// Versão 3 - ainda outra abordagem para carregar dados
// Dívida: terceira variação de padrão de fetch no projeto
import { useState, useEffect } from 'react';
import { metricsService } from '../services/metricsService';
import { analyticsService } from '../services/analyticsService';

export function useMetrics(dateRange?: any) {
  const [overview, setOverview] = useState<any>(null);
  const [timeSeries, setTimeSeries] = useState<any>({});
  const [byChannel, setByChannel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    // Chama dois serviços diferentes (dívida: deveria ser um só)
    Promise.all([
      metricsService.getOverview(dateRange),
      metricsService.getByChannel(),
      analyticsService.getDashboardData(),
    ]).then(([ov, ch, dash]) => {
      setOverview(ov);
      setByChannel(ch);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [dateRange?.startDate, dateRange?.endDate]);

  return { overview, timeSeries, byChannel, loading, error };
}
