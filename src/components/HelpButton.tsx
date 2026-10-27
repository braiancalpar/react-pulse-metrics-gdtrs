import React, { useState } from 'react';

export function HelpButton() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: 48, height: 48, borderRadius: '50%', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 20, boxShadow: '0 4px 12px rgba(37,99,235,0.4)' }}>
        ?
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: 56, right: 0, width: 240, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Ajuda</div>
          <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
            <div><span className="material-icons" style={{fontSize:14}}>menu_book</span> Documentação</div>
            <div><span className="material-icons" style={{fontSize:14}}>chat</span> Chat com suporte</div>
            <div><span className="material-icons" style={{fontSize:14}}>play_circle</span> Tutoriais em vídeo</div>
          </div>
        </div>
      )}
    </div>
  );
}
