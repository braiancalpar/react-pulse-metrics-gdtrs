import React from 'react';

export function Tag({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 20,
      background: '#eff6ff', color: '#2563eb',
      fontSize: 12, fontWeight: 500,
    }}>
      {children}
      {onRemove && (
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#6b7280', padding: 0 }}>×</button>
      )}
    </span>
  );
}
