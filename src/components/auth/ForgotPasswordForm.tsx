import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { useHistory } from 'react-router-dom';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
  };

  if (sent) return (
    <div>
      <Alert type="success" title="Email enviado!">Verifique sua caixa de entrada.</Alert>
      <button onClick={() => history.push('/login')} style={{ marginTop: 16, background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: 14 }}>Voltar ao login</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 14, color: '#6b7280' }}>Digite seu email para receber o link de redefinição.</p>
      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Button type="submit" fullWidth>Enviar link</Button>
      <div style={{ textAlign: 'center' }}>
        <button type="button" onClick={() => history.push('/login')} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: 14 }}>
          Voltar ao login
        </button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
