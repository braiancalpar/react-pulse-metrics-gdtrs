import React from 'react';

interface ColorPickerProps { value?: string; onChange?: (v: string) => void; label?: string; }

export function ColorPicker({ value = '#2563eb', onChange, label }: ColorPickerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {label && <label style={{ fontSize: 14, fontWeight: 600 }}>{label}</label>}
      <input type="color" value={value} onChange={e => onChange?.(e.target.value)}
        style={{ width: 36, height: 36, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 2 }} />
      <span style={{ fontSize: 12, color: '#6b7280', fontFamily: 'monospace' }}>{value}</span>
    </div>
  );
}
