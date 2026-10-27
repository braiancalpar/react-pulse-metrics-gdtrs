import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

const COLORS: Record<string, { bg: string; color: string }> = {
  default: { bg: '#f3f4f6', color: '#374151' },
  success: { bg: '#dcfce7', color: '#166534' },
  warning: { bg: '#fef9c3', color: '#854d0e' },
  error: { bg: '#fee2e2', color: '#991b1b' },
  info: { bg: '#dbeafe', color: '#1e40af' },
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const colors = COLORS[variant];
  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      background: colors.bg,
      color: colors.color,
      display: 'inline-block',
    }}>
      {children}
    </span>
  );
}

export default Badge;
