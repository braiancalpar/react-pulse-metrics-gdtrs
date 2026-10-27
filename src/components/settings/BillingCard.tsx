import React from 'react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function BillingCard() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Plano Pro</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Fatura mensal</div>
        </div>
        <Badge variant="success">Ativo</Badge>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>R$ 299<span style={{ fontSize: 16, fontWeight: 400, color: '#6b7280' }}>/mês</span></div>
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>Próxima cobrança: 15/03/2024</div>
      <Button variant="secondary" size="sm">Gerenciar assinatura</Button>
    </div>
  );
}
