import React, { useState } from 'react';
import { Button } from '../common/Button';

export function CampaignNotes({ initialNotes = '' }: { initialNotes?: string }) {
  const [notes, setNotes] = useState(initialNotes);
  const [editing, setEditing] = useState(false);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <h4 style={{ fontWeight: 600 }}>Notas</h4>
        <Button variant="ghost" size="sm" onClick={() => setEditing(e => !e)}>{editing ? 'Salvar' : 'Editar'}</Button>
      </div>
      {editing ? (
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, resize: 'vertical' }} />
      ) : (
        <p style={{ fontSize: 14, color: notes ? '#374151' : '#9ca3af' }}>{notes || 'Nenhuma nota adicionada.'}</p>
      )}
    </div>
  );
}
