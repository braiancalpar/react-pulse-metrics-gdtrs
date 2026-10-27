import React from 'react';
import { Select } from '../common/Select';
import { mockAudiences } from '../../mocks/audiences';

export function CampaignFormStep3({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ fontWeight: 700, fontSize: 16 }}>Audiência e revisão</h3>
      <Select label="Segmento de audiência" value={data.audience ?? ''} onChange={v => onChange({ audience: v })}
        options={mockAudiences.map(a => ({ value: a.id, label: `${a.name} (${(a.size / 1000).toFixed(0)}K)` }))}
        placeholder="Selecione a audiência"
      />
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 16 }}>
        <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Revisão</h4>
        {Object.entries(data).map(([k, v]: any) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
            <span style={{ color: '#6b7280', textTransform: 'capitalize' }}>{k}:</span>
            <span style={{ fontWeight: 600 }}>{String(v)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
