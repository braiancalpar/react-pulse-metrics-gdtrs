import React, { useState, useRef } from 'react';
import { Button } from '../common/Button';

export function TwoFactorInput({ onVerify }: { onVerify?: (code: string) => void }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<HTMLInputElement[]>([]);

  const handleChange = (i: number, v: string) => {
    if (v.length > 1) return;
    const newCode = [...code];
    newCode[i] = v;
    setCode(newCode);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <p style={{ fontSize: 14, color: '#6b7280', textAlign: 'center' }}>Digite o código de 6 dígitos do seu autenticador</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {code.map((d, i) => (
          <input key={i} ref={el => { if (el) inputs.current[i] = el; }}
            value={d} onChange={e => handleChange(i, e.target.value)} maxLength={1}
            style={{ width: 44, height: 56, textAlign: 'center', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 24, fontWeight: 700, outline: 'none' }}
            onFocus={e => e.target.select()}
          />
        ))}
      </div>
      <Button fullWidth onClick={() => onVerify?.(code.join(''))}>Verificar</Button>
    </div>
  );
}
