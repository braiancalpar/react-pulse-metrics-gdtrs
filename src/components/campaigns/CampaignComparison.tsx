import React from 'react';
import { ComparativeBarChart } from '../Chart/ComparativeBarChart';

export function CampaignComparison({ campaigns }: { campaigns: any[] }) {
  const labels = campaigns.map(c => c.name.substring(0, 20));
  const impressions = campaigns.map(c => c.metrics?.impressions ?? 0);
  const clicks = campaigns.map(c => c.metrics?.clicks ?? 0);
  return (
    <div>
      <ComparativeBarChart labels={labels} current={impressions} previous={clicks} height={280} />
    </div>
  );
}
