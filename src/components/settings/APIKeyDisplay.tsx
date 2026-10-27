import React, { useState } from 'react';
import { Button } from '../common/Button';

export function APIKeyDisplay() {
  const [visible, setVisible] = useState(false);
  const apiKey = 'pm_live_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxx';
  return (
    <div style={{ background: '#f9fafb', borderRadius: 8, padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Chave de API</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <code style={{ flex: 1, padding: '8px 12px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13, fontFamily: 'monospace' }}>
          {visible ? apiKey : '••••••••••••••••••••••••••••'}
        </code>
        <Button size="sm" variant="secondary" onClick={() => setVisible(v => !v)}>{visible ? 'Ocultar' : 'Mostrar'}</Button>
        <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(apiKey)}>Copiar</Button>
      </div>
    </div>
  );
}
