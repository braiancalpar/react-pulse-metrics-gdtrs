import React from 'react';
import { BarChart } from '../Chart/BarChart';

export function AudienceComparisonChart({ segments }: { segments: any[] }) {
  return (
    <BarChart
      labels={segments.map(s => s.name.substring(0, 20))}
      datasets={[{ label: 'Tamanho do segmento', data: segments.map(s => s.size), color: '#2563eb' }]}
      horizontal
      height={250}
    />
  );
}
