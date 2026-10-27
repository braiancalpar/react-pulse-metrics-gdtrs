import React from 'react';
import { Select } from '../common/Select';
import { SearchInput } from '../common/SearchInput';
import { DateRangePicker } from '../common/DateRangePicker';

interface CampaignFiltersProps {
  statusFilter: string;
  channelFilter: string;
  search: string;
  dateRange: any;
  onStatusChange: (v: string) => void;
  onChannelChange: (v: string) => void;
  onSearchChange: (v: string) => void;
  onDateRangeChange: (v: any) => void;
}

export function CampaignFilters({ statusFilter, channelFilter, search, onStatusChange, onChannelChange, onSearchChange }: CampaignFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', padding: 16, background: '#fff', borderRadius: 8, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <SearchInput value={search} onChange={onSearchChange} placeholder="Buscar campanhas..." />
      <Select value={statusFilter} onChange={onStatusChange} options={[
        { value: 'all', label: 'Todos os status' },
        { value: 'active', label: 'Ativo' },
        { value: 'paused', label: 'Pausado' },
        { value: 'ended', label: 'Encerrado' },
        { value: 'draft', label: 'Rascunho' },
      ]} />
      <Select value={channelFilter} onChange={onChannelChange} options={[
        { value: 'all', label: 'Todos os canais' },
        { value: 'google', label: 'Google' },
        { value: 'meta', label: 'Meta' },
        { value: 'email', label: 'Email' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'tiktok', label: 'TikTok' },
      ]} />
    </div>
  );
}
