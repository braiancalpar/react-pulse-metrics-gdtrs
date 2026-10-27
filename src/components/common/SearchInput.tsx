import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Buscar...' }: SearchInputProps) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 16 }}><span className="material-icons" style={{fontSize:18,color:'#9ca3af'}}>search</span></span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: '8px 12px 8px 34px', borderRadius: 6, border: '1px solid #e5e7eb',
          fontSize: 14, outline: 'none', width: 280, background: '#fff',
        }}
      />
    </div>
  );
}
