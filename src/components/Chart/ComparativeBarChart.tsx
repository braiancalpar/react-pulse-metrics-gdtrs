import React from 'react';
import { BarChart } from './BarChart';

interface ComparativeBarChartProps {
  labels: string[];
  current: number[];
  previous: number[];
  height?: number;
}

export function ComparativeBarChart({ labels, current, previous, height = 300 }: ComparativeBarChartProps) {
  return (
    <BarChart
      labels={labels}
      datasets={[
        { label: 'Período atual', data: current, color: '#2563eb' },
        { label: 'Período anterior', data: previous, color: '#bfdbfe' },
      ]}
      height={height}
    />
  );
}
