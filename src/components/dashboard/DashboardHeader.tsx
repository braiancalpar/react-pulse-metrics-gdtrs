import React from 'react';
import { DateRangePicker } from '../common/DateRangePicker';

interface DashboardHeaderProps {
  dateRange: any;
  onDateRangeChange: (range: any) => void;
  title?: string;
}

export function DashboardHeader({ dateRange, onDateRangeChange, title = 'Dashboard' }: DashboardHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>{title}</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Visão geral de performance de campanhas</p>
      </div>
      <DateRangePicker
        startDate={dateRange?.startDate}
        endDate={dateRange?.endDate}
        onChange={onDateRangeChange}
      />
    </div>
  );
}
