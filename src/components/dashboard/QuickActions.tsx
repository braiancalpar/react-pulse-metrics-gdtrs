import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../common/Button';

export function QuickActions() {
  const history = useHistory();
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Ações rápidas</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button variant="primary" fullWidth onClick={() => history.push('/campaigns/create')}>+ Nova Campanha</Button>
        <Button variant="secondary" fullWidth onClick={() => history.push('/reports/create')}><span className="material-icons" style={{fontSize:18}}>description</span> Gerar Relatório</Button>
        <Button variant="secondary" fullWidth onClick={() => history.push('/audience')}><span className="material-icons" style={{fontSize:18}}>group_add</span> Ver Audiências</Button>
      </div>
    </div>
  );
}
