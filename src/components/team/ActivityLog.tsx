import React from 'react';
import { ActivityItem } from './ActivityItem';

const mockActivity = [
  { id: '1', user: 'Ana Lima', action: 'criou a campanha "Black Friday 2023"', time: '2023-11-01T10:00:00Z' },
  { id: '2', user: 'Carlos Mendes', action: 'atualizou o budget da campanha "Awareness Q1"', time: '2024-01-20T14:30:00Z' },
  { id: '3', user: 'Fernanda Costa', action: 'gerou o relatório "Performance Mensal"', time: '2024-02-01T09:00:00Z' },
  { id: '4', user: 'Ana Lima', action: 'pausou a campanha "Lançamento Produto X"', time: '2024-02-05T16:00:00Z' },
];

export function ActivityLog() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Log de atividades</h3>
      {mockActivity.map(a => <ActivityItem key={a.id} activity={a} />)}
    </div>
  );
}
