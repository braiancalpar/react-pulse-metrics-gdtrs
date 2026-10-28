import React from 'react';
import { DateRangePicker } from '../common/DateRangePicker';

interface DashboardHeaderProps {
  dateRange: any;
  onDateRangeChange: (range: any) => void;
  title?: string;
}

export function DashboardHeader({ dateRange, onDateRangeChange, title = 'Dashboard' }: DashboardHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">Visão geral de performance de campanhas</p>
      </div>
      <DateRangePicker
        startDate={dateRange?.startDate}
        endDate={dateRange?.endDate}
        onChange={onDateRangeChange}
        tailwind
      />
    </div>
  );
}
