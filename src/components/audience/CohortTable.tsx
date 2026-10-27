import React from 'react';

export function CohortTable() {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const cohorts = months.map((m, i) => ({
    month: m,
    size: Math.round(1000 + Math.random() * 2000),
    retention: months.slice(0, months.length - i).map(() => Math.round(70 - Math.random() * 40)),
  }));
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#6b7280' }}>Coorte</th>
            <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#6b7280' }}>Tamanho</th>
            {months.map(m => <th key={m} style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#6b7280' }}>{m}</th>)}
          </tr>
        </thead>
        <tbody>
          {cohorts.map(c => (
            <tr key={c.month} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600 }}>{c.month}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right' }}>{c.size.toLocaleString()}</td>
              {months.map((m, i) => {
                const val = c.retention[i];
                if (val === undefined) return <td key={m} style={{ padding: '10px 12px' }} />;
                return (
                  <td key={m} style={{ padding: '10px 12px', textAlign: 'right', background: `rgba(37,99,235,${val / 100 * 0.5})` }}>
                    {val}%
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
