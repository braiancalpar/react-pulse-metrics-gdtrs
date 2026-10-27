import React from 'react';
import { Button } from '../common/Button';

interface BulkActionBarProps {
  selectedCount: number;
  onPauseAll?: () => void;
  onDeleteAll?: () => void;
  onExport?: () => void;
  onClearSelection?: () => void;
}

export function BulkActionBar({ selectedCount, onPauseAll, onDeleteAll, onExport, onClearSelection }: BulkActionBarProps) {
  if (selectedCount === 0) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: '#111827', color: '#fff', padding: '12px 24px', borderRadius: 12,
      display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      zIndex: 200,
    }}>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{selectedCount} selecionados</span>
      <Button size="sm" variant="secondary" onClick={onPauseAll}>Pausar</Button>
      <Button size="sm" variant="secondary" onClick={onExport}>Exportar</Button>
      <Button size="sm" variant="danger" onClick={onDeleteAll}>Deletar</Button>
      <button onClick={onClearSelection} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 18 }}>×</button>
    </div>
  );
}
