import React from 'react';

interface TimePickerProps { value?: string; onChange?: (v: string) => void; label?: string; }

export function TimePicker({ value, onChange, label }: TimePickerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <label style={{ fontSize: 14, fontWeight: 600 }}>{label}</label>}
      <input type="time" value={value} onChange={e => onChange?.(e.target.value)}
        style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, outline: 'none' }} />
    </div>
  );
}
