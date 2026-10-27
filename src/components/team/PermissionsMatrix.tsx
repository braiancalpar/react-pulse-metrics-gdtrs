import React from 'react';
import { Checkbox } from '../common/Checkbox';

const PERMISSIONS = ['read', 'write', 'delete', 'admin'];
const ROLES = [{ name: 'admin', label: 'Admin' }, { name: 'editor', label: 'Editor' }, { name: 'viewer', label: 'Viewer' }];
const DEFAULT_PERMS: Record<string, string[]> = { admin: ['read', 'write', 'delete', 'admin'], editor: ['read', 'write'], viewer: ['read'] };

export function PermissionsMatrix() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Função</th>
          {PERMISSIONS.map(p => <th key={p} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, fontSize: 13, color: '#6b7280', textTransform: 'capitalize' }}>{p}</th>)}
        </tr></thead>
        <tbody>
          {ROLES.map(role => (
            <tr key={role.name} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px', fontWeight: 600 }}>{role.label}</td>
              {PERMISSIONS.map(perm => (
                <td key={perm} style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <Checkbox checked={DEFAULT_PERMS[role.name]?.includes(perm)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
