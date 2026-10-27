import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../common/Avatar';
import { NotificationBell } from '../NotificationBell';

export function TopBar() {
  const { user } = useAuth() || {};

  return (
    <header style={{
      height: 64, background: '#fff', borderBottom: '1px solid #e5e7eb',
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      padding: '0 24px', gap: 16, position: 'sticky', top: 0, zIndex: 50,
    }}>
      <NotificationBell />
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar name={user.name} size={32} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{user.role}</div>
          </div>
        </div>
      )}
    </header>
  );
}
