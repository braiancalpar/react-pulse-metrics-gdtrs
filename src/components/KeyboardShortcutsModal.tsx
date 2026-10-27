import React from 'react';
import { Modal } from './common/Modal';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: 'G + D', action: 'Ir para Dashboard' },
  { key: 'G + C', action: 'Ir para Campanhas' },
  { key: 'G + M', action: 'Ir para Métricas' },
  { key: 'N + C', action: 'Nova Campanha' },
  { key: '?', action: 'Ver atalhos' },
  { key: 'Esc', action: 'Fechar modal' },
];

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Atalhos de Teclado">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SHORTCUTS.map(({ key, action }) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
            <span style={{ fontSize: 14, color: '#374151' }}>{action}</span>
            <kbd style={{ padding: '2px 8px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' }}>{key}</kbd>
          </div>
        ))}
      </div>
    </Modal>
  );
}
