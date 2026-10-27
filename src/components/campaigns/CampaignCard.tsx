import React from 'react';
import styled from 'styled-components';
import { CampaignStatus } from './CampaignStatus';
import { formatCurrency } from '../../utils/formatCurrency';
import { ProgressBar } from '../common/ProgressBar';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: box-shadow 0.15s;
  &:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
`;

export function CampaignCard({ campaign, onClick }: { campaign: any; onClick?: () => void }) {
  const budgetPct = Math.round((campaign.spent / campaign.budget) * 100);
  return (
    <Card onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>{campaign.name}</h3>
          <p style={{ fontSize: 13, color: '#6b7280' }}>{campaign.channel} · {campaign.objective}</p>
        </div>
        <CampaignStatus status={campaign.status} />
      </div>
      <ProgressBar value={campaign.spent} max={campaign.budget} showLabel height={6} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 }}>
        <span style={{ color: '#6b7280' }}>Gasto: {formatCurrency(campaign.spent)}</span>
        <span style={{ fontWeight: 600 }}>Budget: {formatCurrency(campaign.budget)}</span>
      </div>
    </Card>
  );
}
