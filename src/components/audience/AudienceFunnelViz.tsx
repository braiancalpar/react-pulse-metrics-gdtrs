import React from 'react';
import { FunnelChart } from '../Chart/FunnelChart';

export function AudienceFunnelViz({ segment }: { segment: any }) {
  const steps = [
    { label: 'Alcance total', value: segment?.size ?? 100000, color: '#2563eb' },
    { label: 'Engajamento', value: Math.round((segment?.size ?? 100000) * 0.35), color: '#7c3aed' },
    { label: 'Intenção de compra', value: Math.round((segment?.size ?? 100000) * 0.12), color: '#db2777' },
    { label: 'Conversão', value: Math.round((segment?.size ?? 100000) * 0.04), color: '#10b981' },
  ];
  return <FunnelChart steps={steps} />;
}
