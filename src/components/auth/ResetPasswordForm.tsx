import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useHistory } from 'react-router-dom';

export function ResetPasswordForm({ token }: { token?: string }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('As senhas não coincidem'); return; }
    await new Promise(r => setTimeout(r, 800));
    history.push('/login');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Nova senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <Input label="Confirmar senha" type="password" value={confirm} onChange={e => { setConfirm(e.target.value); setError(''); }} error={error} required />
      <Button type="submit" fullWidth>Redefinir senha</Button>
    </form>
  );
}

export default ResetPasswordForm;
