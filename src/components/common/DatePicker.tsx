import React from 'react';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  min?: string;
  max?: string;
}

export function DatePicker({ value, onChange, label, min, max }: DatePickerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <label style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{label}</label>}
      <input type="date" value={value} onChange={e => onChange?.(e.target.value)} min={min} max={max}
        style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, outline: 'none' }} />
    </div>
  );
}
