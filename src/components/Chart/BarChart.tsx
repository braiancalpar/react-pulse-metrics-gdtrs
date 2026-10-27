import React from 'react';
import { ChartWrapper } from './ChartWrapper';

interface BarChartProps {
  labels: string[];
  datasets: Array<{ label: string; data: number[]; color?: string }>;
  height?: number;
  horizontal?: boolean;
}

export function BarChart({ labels, datasets, height = 300, horizontal = false }: BarChartProps) {
  const config = {
    type: horizontal ? 'bar' as const : 'bar' as const,
    data: {
      labels,
      datasets: datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.color || ['#2563eb', '#7c3aed', '#db2777', '#10b981'][i % 4],
        borderRadius: 4,
      })),
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      indexAxis: horizontal ? 'y' as const : 'x' as const,
      plugins: { legend: { position: 'top' as const } },
      scales: { x: { grid: { display: false } }, y: { grid: { color: '#f3f4f6' } } },
    },
  };

  return <ChartWrapper config={config} height={height} />;
}
