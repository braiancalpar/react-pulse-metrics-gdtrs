import React from 'react';
import { formatNumber } from '../../utils/numberUtils';
import { formatCurrency } from '../../utils/formatCurrency';

export function AudienceSegmentCard({ segment, onClick }: { segment: any; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{segment.name}</div>
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{segment.description}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        <div style={{ background: '#f9fafb', borderRadius: 6, padding: '8px 12px' }}>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>Tamanho</div>
          <div style={{ fontWeight: 700 }}>{formatNumber(segment.size)}</div>
        </div>
        <div style={{ background: '#f9fafb', borderRadius: 6, padding: '8px 12px' }}>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>LTV médio</div>
          <div style={{ fontWeight: 700 }}>{formatCurrency(segment.lifetimeValue)}</div>
        </div>
      </div>
    </div>
  );
}
