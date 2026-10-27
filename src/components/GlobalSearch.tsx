import React, { useState } from 'react';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  return (
    <div style={{ position: 'relative', width: 240 }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar..."
        style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: 20, fontSize: 14, width: '100%', outline: 'none' }} />
      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}><span className="material-icons" style={{ fontSize: 18, color: '#9ca3af' }}>search</span></span>
    </div>
  );
}
