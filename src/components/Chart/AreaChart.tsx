import React from 'react';
import { ChartWrapper } from './ChartWrapper';

interface AreaChartProps {
  data: Array<{ date: string; value: number }>;
  label?: string;
  color?: string;
  height?: number;
}

export function AreaChart({ data, label = 'Valor', color = '#2563eb', height = 300 }: AreaChartProps) {
  const config = {
    type: 'line' as const,
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        label,
        data: data.map(d => d.value),
        borderColor: color,
        backgroundColor: color + '30',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { grid: { color: '#f3f4f6' }, beginAtZero: true } },
    },
  };
  return <ChartWrapper config={config} height={height} />;
}
