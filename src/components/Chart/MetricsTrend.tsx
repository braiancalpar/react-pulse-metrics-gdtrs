import React from 'react';
import { SparklineChart } from './SparklineChart';

interface MetricsTrendProps {
  value: number | string;
  trend?: number[];
  change?: number;
  label: string;
  color?: string;
}

export function MetricsTrend({ value, trend = [], change = 0, label, color = '#2563eb' }: MetricsTrendProps) {
  const isPositive = change >= 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
      <div>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
        <div style={{ fontSize: 12, color: isPositive ? '#10b981' : '#ef4444' }}>
          {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
        </div>
      </div>
      {trend.length > 0 && <SparklineChart data={trend} color={color} />}
    </div>
  );
}
