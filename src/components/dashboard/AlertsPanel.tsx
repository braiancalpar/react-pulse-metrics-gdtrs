import React from 'react';
import { Alert } from '../common/Alert';

const alerts = [
  { type: 'warning' as const, message: 'Budget 80% consumido: "Lançamento Produto X"' },
  { type: 'error' as const, message: 'Falha na sincronização: HubSpot' },
  { type: 'info' as const, message: '3 campanhas encerram em menos de 7 dias' },
];

export function AlertsPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {alerts.map((a, i) => (
        <Alert key={i} type={a.type}>{a.message}</Alert>
      ))}
    </div>
  );
}
