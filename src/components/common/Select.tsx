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
  tailwind?: boolean;
  [key: string]: any;
}

export function Select({ options, value, onChange, label, placeholder, disabled, tailwind = false, ...props }: SelectProps) {
  return (
    <div className={tailwind ? 'flex flex-col gap-1' : undefined} style={tailwind ? undefined : { display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label className={tailwind ? 'text-sm font-semibold text-gray-700' : undefined} style={tailwind ? undefined : { fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 2 }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        className={tailwind ? 'min-w-[120px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60' : undefined}
        style={tailwind ? undefined : {
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
