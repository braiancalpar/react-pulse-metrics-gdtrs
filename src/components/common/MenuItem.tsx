import React from 'react';

interface MenuItemProps {
  onClick?: () => void;
  children: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

export function MenuItem({ onClick, children, danger, disabled }: MenuItemProps) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, width: '100%',
        padding: '8px 16px', fontSize: 14, textAlign: 'left', background: 'none',
        border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        color: danger ? '#ef4444' : '#374151', opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = '#f9fafb'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}>
      {children}
    </button>
  );
}
