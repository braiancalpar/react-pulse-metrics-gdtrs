import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

export function DangerZone() {
  const [modal, setModal] = useState<'delete' | null>(null);
  return (
    <div style={{ border: '1px solid #fecaca', borderRadius: 12, padding: 20 }}>
      <h3 style={{ color: '#dc2626', fontWeight: 700, marginBottom: 8 }}>Zona de perigo</h3>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>Estas ações são permanentes e não podem ser desfeitas.</p>
      <Button variant="danger" onClick={() => setModal('delete')}>Deletar conta</Button>
      <Modal isOpen={modal === 'delete'} onClose={() => setModal(null)} title="Confirmar exclusão">
        <p style={{ fontSize: 14, marginBottom: 16 }}>Tem certeza? Esta ação é irreversível.</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" onClick={() => setModal(null)}>Cancelar</Button>
          <Button variant="danger">Confirmar exclusão</Button>
        </div>
      </Modal>
    </div>
  );
}
