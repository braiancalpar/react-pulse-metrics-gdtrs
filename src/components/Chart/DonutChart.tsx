import React from 'react';
import { ChartWrapper } from './ChartWrapper';

interface DonutChartProps {
  labels: string[];
  data: number[];
  colors?: string[];
  height?: number;
  centerLabel?: string;
}

const DEFAULT_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#10b981', '#f59e0b', '#ef4444'];

export function DonutChart({ labels, data, colors = DEFAULT_COLORS, height = 300 }: DonutChartProps) {
  const config = {
    type: 'doughnut' as const,
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors.slice(0, data.length), borderWidth: 2, borderColor: '#fff' }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'right' as const } },
    },
  };
  return <ChartWrapper config={config} height={height} />;
}
