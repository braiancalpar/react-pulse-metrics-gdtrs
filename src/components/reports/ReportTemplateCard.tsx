import React from 'react';
import { Button } from '../common/Button';

const TEMPLATES = [
  { id: 'performance', name: 'Performance Semanal', description: 'Visão geral de impressões, cliques e conversões', icon: '<span className="material-icons" style={{fontSize:16}}>trending_up</span>' },
  { id: 'executive', name: 'Resumo Executivo', description: 'KPIs de alto nível para gestores', icon: '<span className="material-icons" style={{fontSize:16}}>business_center</span>' },
  { id: 'channel', name: 'Análise por Canal', description: 'Performance detalhada por canal de mídia', icon: '<span className="material-icons" style={{fontSize:16}}>wifi_tethering</span>' },
];

export function ReportTemplateCard({ onUse }: { onUse?: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TEMPLATES.map(t => (
        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <span style={{ fontSize: 32 }}>{t.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{t.description}</div>
          </div>
          <Button size="sm" variant="secondary" onClick={() => onUse?.(t.id)}>Usar</Button>
        </div>
      ))}
    </div>
  );
}
