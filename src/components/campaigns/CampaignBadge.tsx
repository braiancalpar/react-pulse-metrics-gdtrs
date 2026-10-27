import React from 'react';

// Duplica CampaignStatus — dívida: dois componentes fazendo a mesma coisa
export function CampaignBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: '#dcfce7',
    paused: '#fef9c3',
    ended: '#f3f4f6',
    draft: '#dbeafe',
  };
  const textColors: Record<string, string> = {
    active: '#166534', paused: '#854d0e', ended: '#374151', draft: '#1e40af',
  };
  const labels: Record<string, string> = {
    active: 'Ativo', paused: 'Pausado', ended: 'Encerrado', draft: 'Rascunho',
  };
  return (
    <span style={{
      padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
      background: colors[status] ?? '#f3f4f6',
      color: textColors[status] ?? '#374151',
    }}>
      {labels[status] ?? status}
    </span>
  );
}
