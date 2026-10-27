import React from 'react';
import { MetricsCard } from './MetricsCard';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercentage } from '../../utils/formatPercentage';
import { mockMetrics } from '../../mocks/metrics';

// Componente que ficou aqui mas deveria estar no Dashboard.tsx
// dívida: dupla responsabilidade
export function MetricsSummary({ metrics }: { metrics?: any }) {
  const data = metrics || mockMetrics.overview;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <MetricsCard title="Impressões" value={data.totalImpressions} change={12.5} color="#2563eb" dataTestId="total-impressions" />
      <MetricsCard title="Cliques" value={data.totalClicks} change={8.3} color="#7c3aed" />
      <MetricsCard title="Conversões" value={data.totalConversions} change={-3.2} color="#10b981" />
      <MetricsCard title="ROAS Médio" value={data.averageROAS?.toFixed(1) ?? '0'} change={5.1} suffix="x" color="#f59e0b" />
    </div>
  );
}
