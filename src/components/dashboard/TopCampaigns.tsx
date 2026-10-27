import React from 'react';
import { mockCampaigns } from '../../mocks/campaigns';
import { formatCurrency } from '../../utils/formatCurrency';
import { Badge } from '../common/Badge';

export function TopCampaigns() {
  const top = mockCampaigns
    .filter(c => c.status === 'active')
    .sort((a, b) => b.metrics.roas - a.metrics.roas)
    .slice(0, 5);

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Top Campanhas por ROAS</h3>
      <div>
        {top.map((campaign, i) => (
          <div key={campaign.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#9ca3af', width: 20 }}>#{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{campaign.name}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{formatCurrency(campaign.spent)} gasto</div>
            </div>
            <Badge variant="success">{campaign.metrics.roas}x ROAS</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
