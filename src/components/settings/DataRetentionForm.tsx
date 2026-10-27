import React, { useState } from 'react';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

export function DataRetentionForm() {
  const [retention, setRetention] = useState('24');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>Defina por quanto tempo os dados de campanhas e relatórios serão mantidos.</div>
      <Select label="Período de retenção" value={retention} onChange={setRetention} options={[
        { value: '3', label: '3 meses' }, { value: '6', label: '6 meses' },
        { value: '12', label: '1 ano' }, { value: '24', label: '2 anos' },
      ]} />
      <Button style={{ alignSelf: 'flex-start' } as any}>Salvar configuração</Button>
    </div>
  );
}
