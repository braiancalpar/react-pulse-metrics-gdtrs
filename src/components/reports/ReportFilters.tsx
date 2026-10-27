import React from 'react';
import { Select } from '../common/Select';
import { SearchInput } from '../common/SearchInput';

interface ReportFiltersProps { search: string; type: string; onSearchChange: (v: string) => void; onTypeChange: (v: string) => void; }

export function ReportFilters({ search, type, onSearchChange, onTypeChange }: ReportFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      <SearchInput value={search} onChange={onSearchChange} placeholder="Buscar relatórios..." />
      <Select value={type} onChange={onTypeChange} options={[
        { value: 'all', label: 'Todos os tipos' },
        { value: 'performance', label: 'Performance' },
        { value: 'executive', label: 'Executivo' },
        { value: 'channel', label: 'Por canal' },
        { value: 'funnel', label: 'Funil' },
      ]} />
    </div>
  );
}
