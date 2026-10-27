import React from 'react';
import { formatDate } from '../../utils/formatDate';

const mockLogs = [
  { id: '1', user: 'ana.lima@pulsecompany.com', action: 'LOGIN', ip: '189.40.12.5', time: '2024-02-21T09:00:00Z' },
  { id: '2', user: 'carlos.mendes@pulsecompany.com', action: 'CAMPAIGN_UPDATE', ip: '201.55.78.12', time: '2024-02-20T14:30:00Z' },
  { id: '3', user: 'ana.lima@pulsecompany.com', action: 'REPORT_GENERATE', ip: '189.40.12.5', time: '2024-02-20T10:15:00Z' },
];

export function AuditLogTable() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          {['Usuário', 'Ação', 'IP', 'Data'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {mockLogs.map(log => (
            <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px', fontSize: 14 }}>{log.user}</td>
              <td style={{ padding: '12px 16px' }}><code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{log.action}</code></td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{log.ip}</td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{formatDate(log.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
