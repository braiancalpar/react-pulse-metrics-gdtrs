import React from 'react';
// Dev 2 preferiu CSS Module - conflita com a abordagem do Button
import styles from '../../styles/Dashboard.module.css'; // reutilizando errado!

interface InputProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  [key: string]: any;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
          {label}
          {props.required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <input
        {...props}
        style={{
          padding: '8px 12px',
          border: `1px solid ${error ? '#ef4444' : '#e5e7eb'}`,
          borderRadius: 6,
          fontSize: 14,
          outline: 'none',
          width: '100%',
          transition: 'border-color 0.15s',
        }}
      />
      {error && <span style={{ fontSize: 12, color: '#ef4444' }}>{error}</span>}
    </div>
  );
}

export default Input;
