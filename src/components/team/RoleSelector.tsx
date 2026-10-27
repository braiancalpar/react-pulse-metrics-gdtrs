import React from 'react';
import { RadioGroup } from '../common/RadioGroup';

export function RoleSelector({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  return (
    <RadioGroup label="Função" value={value} onChange={onChange} options={[
      { value: 'admin', label: 'Admin — acesso total' },
      { value: 'editor', label: 'Editor — pode criar e editar' },
      { value: 'viewer', label: 'Viewer — somente leitura' },
    ]} />
  );
}
