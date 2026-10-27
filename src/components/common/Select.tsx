import React from 'react';
// Dev 3 usou só inline styles - "mais fácil de entender"

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  [key: string]: any;
}

export function Select({ options, value, onChange, label, placeholder, disabled, ...props }: SelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 2 }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        style={{
          padding: '8px 12px',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          fontSize: 14,
          background: '#fff',
          color: '#111827',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          minWidth: 120,
        }}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
