import React from 'react';
import { Input } from '../common/Input';
import { DatePicker } from '../common/DatePicker';

export function CampaignFormStep2({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ fontWeight: 700, fontSize: 16 }}>Budget e período</h3>
      <Input label="Budget total (R$)" type="number" value={data.budget ?? ''} onChange={e => onChange({ budget: Number(e.target.value) })} placeholder="Ex: 10000" required />
      <DatePicker label="Data de início" value={data.startDate ?? ''} onChange={v => onChange({ startDate: v })} />
      <DatePicker label="Data de término" value={data.endDate ?? ''} onChange={v => onChange({ endDate: v })} min={data.startDate} />
    </div>
  );
}
