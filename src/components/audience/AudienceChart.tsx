import React from 'react';
import { PieChart } from '../Chart/PieChart';

export function AudienceChart({ segments }: { segments: any[] }) {
  const labels = segments.map(s => s.name);
  const data = segments.map(s => s.size);
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Distribuição de audiências</h3>
      <PieChart labels={labels} data={data} height={260} />
    </div>
  );
}
