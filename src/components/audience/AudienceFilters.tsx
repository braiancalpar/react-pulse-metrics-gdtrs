import React from 'react';
import { Select } from '../common/Select';

interface AudienceFiltersProps { type: string; onTypeChange: (v: string) => void; }
export function AudienceFilters({ type, onTypeChange }: AudienceFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      <Select value={type} onChange={onTypeChange} options={[
        { value: 'all', label: 'Todos os tipos' },
        { value: 'crm', label: 'CRM' },
        { value: 'lookalike', label: 'Lookalike' },
        { value: 'behavioral', label: 'Comportamental' },
        { value: 'predictive', label: 'Preditivo' },
      ]} />
    </div>
  );
}
