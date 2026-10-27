import React from 'react';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const ALERT_STYLES: Record<string, any> = {
  info: { bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af' },
  success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#166534' },
  warning: { bg: '#fffbeb', border: '#fde68a', color: '#92400e' },
  error: { bg: '#fef2f2', border: '#fecaca', color: '#991b1b' },
};

export function Alert({ type = 'info', title, children, onClose }: AlertProps) {
  const s = ALERT_STYLES[type];
  return (
    <div style={{
      padding: '12px 16px', borderRadius: 8,
      background: s.bg, border: `1px solid ${s.border}`,
      color: s.color, display: 'flex', gap: 12,
    }}>
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>}
        <div>{children}</div>
      </div>
      {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>×</button>}
    </div>
  );
}
