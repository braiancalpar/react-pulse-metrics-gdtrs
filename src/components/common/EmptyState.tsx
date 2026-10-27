import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: string;
}

export function EmptyState({ title = 'Nenhum dado encontrado', description, action, icon = 'bar_chart' }: EmptyStateProps) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', color: '#6b7280' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginBottom: 8 }}>{title}</h3>
      {description && <p style={{ fontSize: 14, marginBottom: 24 }}>{description}</p>}
      {action}
    </div>
  );
}
