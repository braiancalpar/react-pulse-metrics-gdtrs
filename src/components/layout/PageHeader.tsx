import React from 'react';
import { BreadCrumb } from './BreadCrumb';

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Array<{ label: string; path?: string }>;
  actions?: React.ReactNode;
}

export function PageHeader({ title, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      {breadcrumbs && <BreadCrumb items={breadcrumbs} />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>{title}</h1>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
}
