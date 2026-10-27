import React from 'react';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatDate';
import { Button } from '../common/Button';

export function ReportTable({ reports, onView, onDelete }: { reports: any[]; onView?: (r: any) => void; onDelete?: (id: string) => void }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            {['Nome', 'Tipo', 'Status', 'Criado', 'Ações'].map(h => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: 14 }}>{r.name}</td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{r.type}</td>
              <td style={{ padding: '12px 16px' }}><Badge variant={r.status === 'ready' ? 'success' : r.status === 'error' ? 'error' : 'info'}>{r.status}</Badge></td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{formatDate(r.createdAt)}</td>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button size="sm" variant="ghost" onClick={() => onView?.(r)}>Ver</Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete?.(r.id)}><span className="material-icons" style={{fontSize:16}}>delete</span></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
