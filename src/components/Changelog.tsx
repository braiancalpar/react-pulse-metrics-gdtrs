import React from 'react';

export function Changelog() {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Changelog</h2>
      {[
        { version: '0.1.0', date: '2024-02-21', items: ['Lançamento inicial', 'Dashboard com métricas', 'Gestão de campanhas'] },
      ].map(entry => (
        <div key={entry.version} style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>v{entry.version} — {entry.date}</div>
          <ul style={{ paddingLeft: 16 }}>
            {entry.items.map((item, i) => <li key={i} style={{ fontSize: 14, color: '#374151', marginBottom: 4 }}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
