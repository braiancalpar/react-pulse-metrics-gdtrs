import React, { useState } from 'react';
import { Select } from '../common/Select';
import { TimePicker } from '../common/TimePicker';
import { Button } from '../common/Button';

export function ReportScheduleForm({ onSave }: { onSave?: (schedule: any) => void }) {
  const [frequency, setFrequency] = useState('weekly');
  const [time, setTime] = useState('08:00');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Select label="Frequência" value={frequency} onChange={setFrequency} options={[
        { value: 'daily', label: 'Diário' }, { value: 'weekly', label: 'Semanal' }, { value: 'monthly', label: 'Mensal' },
      ]} />
      <TimePicker label="Horário de envio" value={time} onChange={setTime} />
      <Button onClick={() => onSave?.({ frequency, time })}>Salvar agendamento</Button>
    </div>
  );
}
