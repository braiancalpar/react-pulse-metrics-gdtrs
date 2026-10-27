import React from 'react';
import { ChartWrapper } from './ChartWrapper';

interface PieChartProps {
  labels: string[];
  data: number[];
  colors?: string[];
  height?: number;
}

const DEFAULT_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#10b981', '#f59e0b', '#ef4444', '#0891b2', '#65a30d'];

export function PieChart({ labels, data, colors = DEFAULT_COLORS, height = 300 }: PieChartProps) {
  const config = {
    type: 'pie' as const,
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors.slice(0, data.length), borderWidth: 2, borderColor: '#fff' }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right' as const } },
    },
  };
  return <ChartWrapper config={config} height={height} />;
}
