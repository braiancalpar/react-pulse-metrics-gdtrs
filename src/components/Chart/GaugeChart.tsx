import React from 'react';

interface GaugeChartProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  size?: number;
}

export function GaugeChart({ value, max = 100, label, color = '#2563eb', size = 160 }: GaugeChartProps) {
  const pct = Math.min(value / max, 1);
  const angle = pct * 180;
  const r = size / 2 - 16;
  const circumference = Math.PI * r;
  const dashoffset = circumference * (1 - pct);

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size / 2 + 24} viewBox={`0 0 ${size} ${size / 2 + 24}`}>
        <path d={`M 16 ${size / 2} A ${r} ${r} 0 0 1 ${size - 16} ${size / 2}`}
          fill="none" stroke="#f3f4f6" strokeWidth={12} strokeLinecap="round" />
        <path d={`M 16 ${size / 2} A ${r} ${r} 0 0 1 ${size - 16} ${size / 2}`}
          fill="none" stroke={color} strokeWidth={12} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={dashoffset} />
        <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fontSize={20} fontWeight="bold" fill="#111827">
          {Math.round(value)}
        </text>
        {label && <text x={size / 2} y={size / 2 + 20} textAnchor="middle" fontSize={12} fill="#6b7280">{label}</text>}
      </svg>
    </div>
  );
}
