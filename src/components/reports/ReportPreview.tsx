import React from 'react';

export function ReportPreview({ report }: { report: any }) {
  return (
    <div style={{ background: '#f9fafb', borderRadius: 8, padding: 24 }}>
      <h3 style={{ fontWeight: 700, marginBottom: 16 }}>{report?.name ?? 'Preview'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {[
          { label: 'Total de impressões', value: '18.7M' },
          { label: 'Total de cliques', value: '451K' },
          { label: 'Conversões', value: '22.050' },
          { label: 'ROAS médio', value: '3.6x' },
        ].map(item => (
          <div key={item.label} style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{item.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
