import React from 'react';

interface AudienceInsightCardProps { title: string; value: string; description?: string; icon?: string; }
export function AudienceInsightCard({ title, value, description, icon = 'lightbulb' }: AudienceInsightCardProps) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{title}</div>
      {description && <div style={{ fontSize: 13, color: '#6b7280' }}>{description}</div>}
    </div>
  );
}
