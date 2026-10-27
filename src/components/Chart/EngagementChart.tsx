import React from 'react';
import { BarChart } from './BarChart';

interface EngagementChartProps {
  data: Array<{ channel: string; value: number }>;
  height?: number;
}

export function EngagementChart({ data, height = 250 }: EngagementChartProps) {
  return (
    <BarChart
      labels={data.map(d => d.channel)}
      datasets={[{ label: 'Engajamento', data: data.map(d => d.value), color: '#7c3aed' }]}
      height={height}
    />
  );
}
