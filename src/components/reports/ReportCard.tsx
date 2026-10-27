import React from 'react';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatDate';

const STATUS_VARIANT: Record<string, any> = {
  ready: 'success', generating: 'info', error: 'error',
};

export function ReportCard({ report, onClick }: { report: any; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700 }}>{report.name}</h3>
        <Badge variant={STATUS_VARIANT[report.status] ?? 'default'}>{report.status}</Badge>
      </div>
      <p style={{ fontSize: 13, color: '#6b7280' }}>Tipo: {report.type} · Criado em: {formatDate(report.createdAt)}</p>
      {report.schedule && <p style={{ fontSize: 12, color: '#2563eb', marginTop: 4 }}><span className="material-icons" style={{fontSize:14}}>autorenew</span> {report.schedule.frequency}</p>}
    </div>
  );
}
