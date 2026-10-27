import React from 'react';
import { FileUpload } from '../common/FileUpload';

export function CampaignCreativeUpload({ onUpload }: { onUpload?: (file: File) => void }) {
  return (
    <div>
      <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Criativo da campanha</h4>
      <FileUpload onFile={onUpload} accept="image/*,video/*" label="Imagem ou vídeo principal" />
      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>Formatos aceitos: JPG, PNG, MP4. Máximo: 50MB</p>
    </div>
  );
}
