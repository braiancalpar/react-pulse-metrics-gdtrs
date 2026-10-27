import React from 'react';
import { formatNumber } from '../../utils/numberUtils';

interface FunnelStep {
  label: string;
  value: number;
  color?: string;
}

interface FunnelChartProps {
  steps: FunnelStep[];
  height?: number;
}

export function FunnelChart({ steps }: FunnelChartProps) {
  const max = steps[0]?.value || 1;

  return (
    <div style={{ padding: '16px 0' }}>
      {steps.map((step, i) => {
        const pct = (step.value / max) * 100;
        const dropOff = i > 0 ? ((steps[i - 1].value - step.value) / steps[i - 1].value) * 100 : 0;
        return (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span style={{ fontWeight: 500 }}>{step.label}</span>
              <span style={{ color: '#6b7280' }}>{formatNumber(step.value)}{i > 0 && <span style={{ color: '#ef4444', marginLeft: 8 }}>-{dropOff.toFixed(1)}%</span>}</span>
            </div>
            <div style={{ background: '#f3f4f6', borderRadius: 4, height: 32, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: step.color || '#2563eb', transition: 'width 0.5s', borderRadius: 4 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
