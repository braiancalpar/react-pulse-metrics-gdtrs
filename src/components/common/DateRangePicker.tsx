import React from 'react';

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange?: (range: { startDate: string; endDate: string }) => void;
  label?: string;
}

export function DateRangePicker({ startDate, endDate, onChange, label }: DateRangePickerProps) {
  return (
    <div>
      {label && <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{label}</div>}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="date" value={startDate ?? ''} max={endDate}
          onChange={e => onChange?.({ startDate: e.target.value, endDate: endDate ?? '' })}
          style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, outline: 'none' }} />
        <span style={{ color: '#6b7280' }}>até</span>
        <input type="date" value={endDate ?? ''} min={startDate}
          onChange={e => onChange?.({ startDate: startDate ?? '', endDate: e.target.value })}
          style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, outline: 'none' }} />
      </div>
    </div>
  );
}
