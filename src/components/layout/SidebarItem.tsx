import React from 'react';

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ icon, label, active, collapsed, onClick }: SidebarItemProps) {
  return (
    <button onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        width: '100%', padding: collapsed ? '12px 20px' : '10px 16px',
        background: active ? '#1f2937' : 'none', border: 'none',
        color: active ? '#fff' : '#9ca3af', cursor: 'pointer', textAlign: 'left',
        borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
        transition: 'all 0.15s', fontSize: 14, justifyContent: collapsed ? 'center' : 'flex-start',
      }}
      title={collapsed ? label : undefined}>
      <span className="material-icons" style={{ fontSize: 20 }}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
