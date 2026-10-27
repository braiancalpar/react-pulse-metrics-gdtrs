import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
};

export default DashboardPage;
