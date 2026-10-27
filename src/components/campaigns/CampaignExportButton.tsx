import React, { useState } from 'react';
import { Button } from '../common/Button';
import { downloadCSV } from '../../utils/exportHelpers';

export function CampaignExportButton({ campaigns }: { campaigns: any[] }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const data = campaigns.map(c => ({
      nome: c.name,
      status: c.status,
      canal: c.channel,
      budget: c.budget,
      gasto: c.spent,
      impressoes: c.metrics?.impressions,
      cliques: c.metrics?.clicks,
      conversoes: c.metrics?.conversions,
      ctr: c.metrics?.ctr,
      roas: c.metrics?.roas,
    }));
    downloadCSV(data, 'campanhas');
    setLoading(false);
  };

  return (
    <Button variant="secondary" size="sm" loading={loading} onClick={handleExport}>
      Exportar CSV
    </Button>
  );
}
