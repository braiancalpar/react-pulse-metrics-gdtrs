import React, { useState } from 'react';

interface NotificationToggleProps { label: string; description?: string; defaultChecked?: boolean; }
export function NotificationToggle({ label, description, defaultChecked = true }: NotificationToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        {description && <div style={{ fontSize: 13, color: '#6b7280' }}>{description}</div>}
      </div>
      <div onClick={() => setChecked(c => !c)}
        style={{ width: 44, height: 24, borderRadius: 12, background: checked ? '#2563eb' : '#e5e7eb', cursor: 'pointer', position: 'relative', transition: 'background 0.15s' }}>
        <div style={{ position: 'absolute', top: 2, left: checked ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </div>
    </div>
  );
}
