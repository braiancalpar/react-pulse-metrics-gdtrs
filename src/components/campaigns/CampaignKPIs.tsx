import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercentage } from '../../utils/formatPercentage';
import { formatNumber } from '../../utils/numberUtils';

export function CampaignKPIs({ metrics }: { metrics: any }) {
  const kpis = [
    { label: 'Impressões', value: formatNumber(metrics?.impressions ?? 0) },
    { label: 'Cliques', value: formatNumber(metrics?.clicks ?? 0) },
    { label: 'CTR', value: formatPercentage(metrics?.ctr ?? 0) },
    { label: 'CPC', value: formatCurrency(metrics?.cpc ?? 0) },
    { label: 'Conversões', value: formatNumber(metrics?.conversions ?? 0) },
    { label: 'ROAS', value: `${(metrics?.roas ?? 0).toFixed(1)}x` },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {kpis.map(kpi => (
        <div key={kpi.label} style={{ background: '#f9fafb', borderRadius: 8, padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{kpi.label}</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{kpi.value}</div>
        </div>
      ))}
    </div>
  );
}
