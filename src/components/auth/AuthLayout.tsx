import React from 'react';
import pulseLogo from '../../assets/pulse-logo.png';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src={pulseLogo} alt="PulseMetrics" style={{ height: 120, objectFit: 'contain', display: 'block', margin: '0 auto' }} />
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Analytics para times de marketing</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
