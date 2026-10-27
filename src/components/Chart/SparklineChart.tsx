import React from 'react';

interface SparklineChartProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function SparklineChart({ data, color = '#2563eb', width = 120, height = 40 }: SparklineChartProps) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height}>
      <polyline fill="none" stroke={color} strokeWidth={2} points={points} />
    </svg>
  );
}
