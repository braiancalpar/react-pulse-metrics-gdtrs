import React from 'react';

const activities = [
  { id: 1, type: 'campaign_paused', message: 'Campanha "Lançamento Produto X" pausada', time: '2h atrás', user: 'Ana Lima' },
  { id: 2, type: 'report_ready', message: 'Relatório "Performance Mensal" gerado', time: '4h atrás', user: 'Sistema' },
  { id: 3, type: 'budget_alert', message: 'Budget 80% consumido em "Google Shopping"', time: '6h atrás', user: 'Sistema' },
  { id: 4, type: 'campaign_created', message: 'Nova campanha "TikTok Ads Gen Z" criada', time: '1d atrás', user: 'Carlos Mendes' },
];

const TYPE_ICONS: Record<string, string> = {
  campaign_paused: 'pause_circle',
  report_ready: 'description',
  budget_alert: 'warning',
  campaign_created: 'add_circle',
};

export function RecentActivity() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Atividade recente</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {activities.map(a => (
          <div key={a.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span className="material-icons" style={{ fontSize: 20, color: '#6c63ff' }}>{TYPE_ICONS[a.type] ?? 'push_pin'}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, color: '#374151' }}>{a.message}</p>
              <p style={{ fontSize: 12, color: '#9ca3af' }}>{a.user} · {a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
