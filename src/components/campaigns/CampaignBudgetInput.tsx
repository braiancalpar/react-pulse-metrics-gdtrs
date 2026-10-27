import React from 'react';
import { Input } from '../common/Input';
import { formatCurrency } from '../../utils/formatCurrency';

interface CampaignBudgetInputProps {
  daily?: number;
  total?: number;
  onDailyChange?: (v: number) => void;
  onTotalChange?: (v: number) => void;
}

export function CampaignBudgetInput({ daily, total, onDailyChange, onTotalChange }: CampaignBudgetInputProps) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <Input label="Budget diário (R$)" type="number" value={String(daily ?? '')} onChange={e => onDailyChange?.(Number(e.target.value))} />
        {daily && <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>≈ {formatCurrency(daily * 30)}/mês</p>}
      </div>
      <div style={{ flex: 1 }}>
        <Input label="Budget total (R$)" type="number" value={String(total ?? '')} onChange={e => onTotalChange?.(Number(e.target.value))} />
      </div>
    </div>
  );
}
