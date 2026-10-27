import React from 'react';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, disabled }: CheckboxProps) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={e => onChange?.(e.target.checked)} disabled={disabled}
        style={{ width: 16, height: 16, cursor: disabled ? 'not-allowed' : 'pointer' }} />
      {label && <span style={{ fontSize: 14, color: disabled ? '#9ca3af' : '#374151' }}>{label}</span>}
    </label>
  );
}
