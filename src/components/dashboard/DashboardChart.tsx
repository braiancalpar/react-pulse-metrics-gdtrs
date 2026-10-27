import React from 'react';
import { MetricsChart } from '../Chart/MetricsChart';
import { mockMetrics } from '../../mocks/metrics';

export function DashboardChart({ metrics }: { metrics?: any }) {
  const ts = metrics?.timeSeries ?? mockMetrics.timeSeries;
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Performance ao longo do tempo</h3>
      <MetricsChart
        impressions={ts.impressions}
        clicks={ts.clicks}
        conversions={ts.conversions}
        height={280}
      />
    </div>
  );
}
