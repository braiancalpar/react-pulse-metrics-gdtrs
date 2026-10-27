import React from 'react';
import { DateRangePicker } from '../common/DateRangePicker';
import { TimePicker } from '../common/TimePicker';

interface CampaignSchedulerProps {
  startDate?: string;
  endDate?: string;
  startTime?: string;
  onScheduleChange?: (schedule: any) => void;
}

export function CampaignScheduler({ startDate, endDate, startTime, onScheduleChange }: CampaignSchedulerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={range => onScheduleChange?.({ ...range, startTime })}
        label="Período da campanha"
      />
      <TimePicker
        value={startTime}
        onChange={v => onScheduleChange?.({ startDate, endDate, startTime: v })}
        label="Horário de início"
      />
    </div>
  );
}
