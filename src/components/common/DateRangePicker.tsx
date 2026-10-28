import React from 'react';

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange?: (range: { startDate: string; endDate: string }) => void;
  label?: string;
  tailwind?: boolean;
}

export function DateRangePicker({ startDate, endDate, onChange, label, tailwind = false }: DateRangePickerProps) {
  return (
    <div className={tailwind ? 'flex flex-col' : undefined}>
      {label && <div className={tailwind ? 'mb-2 text-sm font-semibold' : undefined} style={tailwind ? undefined : { fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{label}</div>}
      <div className={tailwind ? 'flex items-center gap-2' : undefined} style={tailwind ? undefined : { display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="date" value={startDate ?? ''} max={endDate}
          onChange={e => onChange?.({ startDate: e.target.value, endDate: endDate ?? '' })}
          className={tailwind ? 'min-w-0 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100' : undefined}
          style={tailwind ? undefined : { padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, outline: 'none' }} />
        <span className={tailwind ? 'text-gray-500' : undefined} style={tailwind ? undefined : { color: '#6b7280' }}>até</span>
        <input type="date" value={endDate ?? ''} min={startDate}
          onChange={e => onChange?.({ startDate: startDate ?? '', endDate: e.target.value })}
          className={tailwind ? 'min-w-0 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100' : undefined}
          style={tailwind ? undefined : { padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, outline: 'none' }} />
      </div>
    </div>
  );
}
