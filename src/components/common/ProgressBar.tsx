import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: string;
  height?: number;
}

export function ProgressBar({ value, max = 100, showLabel = false, color = '#2563eb', height = 8 }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div style={{ background: '#f3f4f6', borderRadius: height, height, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: height, transition: 'width 0.3s' }} />
      </div>
      {showLabel && <span style={{ fontSize: 12, color: '#6b7280', marginTop: 4, display: 'block' }}>{pct}%</span>}
    </div>
  );
}
