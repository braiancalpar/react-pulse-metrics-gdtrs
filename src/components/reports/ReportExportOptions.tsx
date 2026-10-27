import React from 'react';
import { Button } from '../common/Button';

export function ReportExportOptions({ onExport }: { onExport?: (format: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="secondary" size="sm" onClick={() => onExport?.('csv')}>CSV</Button>
      <Button variant="secondary" size="sm" onClick={() => onExport?.('pdf')}>PDF</Button>
      <Button variant="secondary" size="sm" onClick={() => onExport?.('xlsx')}>Excel</Button>
    </div>
  );
}
