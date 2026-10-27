import React from 'react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

const STATUS_VARIANT: Record<string, any> = { connected: 'success', disconnected: 'default', error: 'error' };

export function IntegrationCard({ integration, onConnect, onDisconnect }: { integration: any; onConnect?: () => void; onDisconnect?: () => void }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{integration.name}</div>
        {integration.lastSync && <div style={{ fontSize: 12, color: '#6b7280' }}>Última sync: {integration.lastSync}</div>}
      </div>
      <Badge variant={STATUS_VARIANT[integration.status]}>{integration.status}</Badge>
      {integration.status === 'connected'
        ? <Button variant="secondary" size="sm" onClick={onDisconnect}>Desconectar</Button>
        : <Button size="sm" onClick={onConnect}>Conectar</Button>
      }
    </div>
  );
}
