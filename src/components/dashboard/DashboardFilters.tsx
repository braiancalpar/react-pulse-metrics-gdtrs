import React from 'react';
import { Select } from '../common/Select';

// Mix proposital: usa CSS Module + inline styles
interface DashboardFiltersProps {
  statusFilter: string;
  channelFilter: string;
  onStatusChange: (v: string) => void;
  onChannelChange: (v: string) => void;
}

export function DashboardFilters({ statusFilter, channelFilter, onStatusChange, onChannelChange }: DashboardFiltersProps) {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-lg bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <span className="text-sm font-semibold text-gray-700">Filtrar por:</span>
      <Select
        label="Status"
        value={statusFilter}
        onChange={onStatusChange}
        tailwind
        options={[
          { value: 'all', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'paused', label: 'Pausado' },
          { value: 'ended', label: 'Encerrado' },
        ]}
      />
      <Select
        label="Canal"
        value={channelFilter}
        onChange={onChannelChange}
        tailwind
        options={[
          { value: 'all', label: 'Todos os canais' },
          { value: 'google', label: 'Google' },
          { value: 'meta', label: 'Meta' },
          { value: 'email', label: 'Email' },
        ]}
      />
    </div>
  );
}
