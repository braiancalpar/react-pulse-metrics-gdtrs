import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export function SettingsForm() {
  const { user } = useAuth() || {};
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', company: 'PulseCompany' });
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <Input label="Nome completo" value={form.name} onChange={e => update('name', e.target.value)} />
      <Input label="Email" value={form.email} onChange={e => update('email', e.target.value)} type="email" />
      <Input label="Empresa" value={form.company} onChange={e => update('company', e.target.value)} />
      <Button style={{ alignSelf: 'flex-start' } as any}>Salvar alterações</Button>
    </div>
  );
}
