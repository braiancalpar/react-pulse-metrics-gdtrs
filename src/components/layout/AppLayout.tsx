import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useSelector } from 'react-redux';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useSelector((state: any) => state.ui.sidebarOpen);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        marginLeft: sidebarOpen ? 240 : 64, transition: 'margin-left 0.2s',
        overflow: 'auto',
      }}>
        <TopBar />
        <main style={{ flex: 1, padding: 24, background: '#f3f4f6' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
