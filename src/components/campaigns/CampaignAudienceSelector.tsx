import React from 'react';
import { mockAudiences } from '../../mocks/audiences';
import { formatNumber } from '../../utils/numberUtils';

interface CampaignAudienceSelectorProps {
  selected?: string;
  onChange?: (id: string) => void;
}

export function CampaignAudienceSelector({ selected, onChange }: CampaignAudienceSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {mockAudiences.map(audience => (
        <div key={audience.id} onClick={() => onChange?.(audience.id)}
          style={{
            padding: '12px 16px', border: `2px solid ${selected === audience.id ? '#2563eb' : '#e5e7eb'}`,
            borderRadius: 8, cursor: 'pointer', background: selected === audience.id ? '#eff6ff' : '#fff',
          }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{audience.name}</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>{formatNumber(audience.size)} pessoas · {audience.type}</div>
        </div>
      ))}
    </div>
  );
}
