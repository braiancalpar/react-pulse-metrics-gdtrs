import React from 'react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export function TeamMemberTable({ members, onEdit }: { members: any[]; onEdit?: (m: any) => void }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          {['Membro', 'Departamento', 'Função', 'Último acesso', ''].map(h => (
            <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={m.name} size={32} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{m.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '12px 16px', fontSize: 14, color: '#374151' }}>{m.department}</td>
              <td style={{ padding: '12px 16px' }}><Badge>{m.role}</Badge></td>
              <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{m.lastActive}</td>
              <td style={{ padding: '12px 16px' }}><Button size="sm" variant="ghost" onClick={() => onEdit?.(m)}>Editar</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
