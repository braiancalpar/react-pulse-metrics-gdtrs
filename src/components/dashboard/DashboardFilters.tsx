import React from 'react';
import { Select } from '../common/Select';
import styles from '../../styles/Dashboard.module.css';

// Mix proposital: usa CSS Module + inline styles
interface DashboardFiltersProps {
  statusFilter: string;
  channelFilter: string;
  onStatusChange: (v: string) => void;
  onChannelChange: (v: string) => void;
}

export function DashboardFilters({ statusFilter, channelFilter, onStatusChange, onChannelChange }: DashboardFiltersProps) {
  return (
    <div className={styles.filterBar}>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Filtrar por:</span>
      <Select
        label="Status"
        value={statusFilter}
        onChange={onStatusChange}
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
