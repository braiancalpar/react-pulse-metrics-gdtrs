import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SIDEBAR_OPEN } from '../../redux/types/actionTypes';
import { SidebarItem } from './SidebarItem';
import { useAuth } from '../../context/AuthContext';
import pulseLogo from '../../assets/pulse-logo.png';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/campaigns', label: 'Campanhas', icon: 'campaign' },
  { path: '/metrics', label: 'Métricas', icon: 'bar_chart' },
];

export function Sidebar() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: any) => state.ui.sidebarOpen);
  const { logout } = useAuth();

  const toggleSidebar = () => dispatch({ type: SET_SIDEBAR_OPEN, payload: !sidebarOpen });

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, bottom: 0,
      width: sidebarOpen ? 240 : 64, transition: 'width 0.2s',
      background: '#111827', color: '#fff', display: 'flex', flexDirection: 'column',
      zIndex: 100, overflow: 'hidden',
    }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #1f2937' }}>
        <img
          src={pulseLogo}
          alt="PulseMetrics"
          style={{
            width: 40,
            height: 40,
            objectFit: 'contain',
            borderRadius: 8,
            background: '#fff',
            flexShrink: 0,
          }}
        />
        {sidebarOpen && (
          <span style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            PulseMetrics
          </span>
        )}
        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <span className="material-icons" style={{ fontSize: 20 }}>{sidebarOpen ? 'chevron_left' : 'chevron_right'}</span>
        </button>
      </div>
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))}
            collapsed={!sidebarOpen}
            onClick={() => history.push(item.path)}
          />
        ))}
      </nav>
      <div style={{ borderTop: '1px solid #1f2937', padding: '8px 0' }}>
        <SidebarItem
          icon="logout"
          label="Sair"
          collapsed={!sidebarOpen}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
