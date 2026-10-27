import React, { useRef } from 'react';

interface FileUploadProps {
  onFile?: (file: File) => void;
  accept?: string;
  label?: string;
}

export function FileUpload({ onFile, accept, label }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      {label && <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{label}</div>}
      <div onClick={() => inputRef.current?.click()}
        style={{ border: '2px dashed #e5e7eb', borderRadius: 8, padding: '24px', textAlign: 'center', cursor: 'pointer', color: '#6b7280' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}><span className="material-icons" style={{fontSize:48,color:'#d1d5db'}}>cloud_upload</span></div>
        <div style={{ fontSize: 14 }}>Clique para selecionar arquivo</div>
        <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) onFile?.(f); }} />
      </div>
    </div>
  );
}
