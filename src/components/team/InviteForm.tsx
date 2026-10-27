import React, { useState } from 'react';
import { Input } from '../common/Input';
import { RoleSelector } from './RoleSelector';
import { Button } from '../common/Button';
import { isValidEmail } from '../../utils/validators';

export function InviteForm({ onInvite }: { onInvite?: (email: string, role: string) => void }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!isValidEmail(email)) { setError('Email inválido'); return; }
    onInvite?.(email, role);
    setEmail('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} error={error} placeholder="nome@empresa.com" required />
      <RoleSelector value={role} onChange={setRole} />
      <Button onClick={handleSubmit}>Enviar convite</Button>
    </div>
  );
}
