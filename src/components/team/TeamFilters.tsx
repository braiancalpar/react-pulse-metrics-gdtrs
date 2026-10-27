import React from 'react';
import { Select } from '../common/Select';
import { SearchInput } from '../common/SearchInput';

interface TeamFiltersProps { search: string; role: string; onSearchChange: (v: string) => void; onRoleChange: (v: string) => void; }
export function TeamFilters({ search, role, onSearchChange, onRoleChange }: TeamFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      <SearchInput value={search} onChange={onSearchChange} placeholder="Buscar membro..." />
      <Select value={role} onChange={onRoleChange} options={[
        { value: 'all', label: 'Todas as funções' },
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ]} />
    </div>
  );
}
