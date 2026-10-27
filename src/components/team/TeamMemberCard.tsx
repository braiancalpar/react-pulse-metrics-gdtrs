import React from 'react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

const ROLE_VARIANT: Record<string, any> = { admin: 'error', editor: 'info', viewer: 'default' };

export function TeamMemberCard({ member, onClick }: { member: any; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name={member.name} size={48} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{member.name}</div>
        <div style={{ fontSize: 13, color: '#6b7280' }}>{member.email}</div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>{member.department}</div>
      </div>
      <Badge variant={ROLE_VARIANT[member.role]}>{member.role}</Badge>
    </div>
  );
}
