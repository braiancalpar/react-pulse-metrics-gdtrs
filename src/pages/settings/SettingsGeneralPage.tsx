import React from 'react';
import AppLayout from '../../components/layout/AppLayout';

const SettingsGeneralPage: React.FC = () => {
  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '700' }}>Configurações Gerais</h1>
        <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#718096' }}>Conteúdo de Configurações Gerais</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsGeneralPage;
