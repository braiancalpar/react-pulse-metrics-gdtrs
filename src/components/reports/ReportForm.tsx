import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { DateRangePicker } from '../common/DateRangePicker';
import { Button } from '../common/Button';

export function ReportForm({ onSubmit, onCancel }: { onSubmit?: (data: any) => void; onCancel?: () => void }) {
  const [form, setForm] = useState<any>({ name: '', type: '', dateRange: {} });
  const update = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Nome do relatório" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ex: Performance Q1 2024" required />
      <Select label="Tipo" value={form.type} onChange={v => update('type', v)} placeholder="Selecione o tipo"
        options={[{ value: 'performance', label: 'Performance' }, { value: 'executive', label: 'Executivo' }, { value: 'channel', label: 'Por canal' }, { value: 'funnel', label: 'Funil' }]} />
      <DateRangePicker startDate={form.dateRange?.startDate} endDate={form.dateRange?.endDate} onChange={v => update('dateRange', v)} label="Período" />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button onClick={() => onSubmit?.(form)}>Criar Relatório</Button>
      </div>
    </div>
  );
}
