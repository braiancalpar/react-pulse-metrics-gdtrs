import React from 'react';
import { LineChart } from './LineChart';

interface ConversionChartProps {
  data: Array<{ date: string; value: number }>;
  height?: number;
}

export function ConversionChart({ data, height = 250 }: ConversionChartProps) {
  return <LineChart data={data} label="Conversões" color="#10b981" height={height} />;
}
