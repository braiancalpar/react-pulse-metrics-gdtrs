import React from 'react';

interface RadioOption { value: string; label: string; }
interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
}

export function RadioGroup({ options, value, onChange, label }: RadioGroupProps) {
  return (
    <div>
      {label && <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{label}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(opt => (
          <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="radio" value={opt.value} checked={value === opt.value} onChange={() => onChange?.(opt.value)} />
            <span style={{ fontSize: 14 }}>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
