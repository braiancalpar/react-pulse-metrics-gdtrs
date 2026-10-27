import React, { useState } from 'react';
import { LineChart } from './LineChart';

interface MetricsChartProps {
  impressions?: Array<{ date: string; value: number }>;
  clicks?: Array<{ date: string; value: number }>;
  conversions?: Array<{ date: string; value: number }>;
  height?: number;
}

export function MetricsChart({ impressions = [], clicks = [], conversions = [], height = 300 }: MetricsChartProps) {
  const [active, setActive] = useState<'impressions' | 'clicks' | 'conversions'>('impressions');
  const dataMap = { impressions, clicks, conversions };
  const colorMap = { impressions: '#2563eb', clicks: '#7c3aed', conversions: '#10b981' };
  const labelMap = { impressions: 'Impressões', clicks: 'Cliques', conversions: 'Conversões' };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['impressions', 'clicks', 'conversions'] as const).map(k => (
          <button key={k} onClick={() => setActive(k)}
            style={{
              padding: '4px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13,
              background: active === k ? colorMap[k] : '#f3f4f6',
              color: active === k ? '#fff' : '#374151', fontWeight: 500,
            }}>
            {labelMap[k]}
          </button>
        ))}
      </div>
      <LineChart data={dataMap[active]} label={labelMap[active]} color={colorMap[active]} height={height} />
    </div>
  );
}
