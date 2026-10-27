import React from 'react';
import { Badge } from '../common/Badge';

const STATUS_MAP: Record<string, { label: string; variant: any }> = {
  active: { label: 'Ativo', variant: 'success' },
  paused: { label: 'Pausado', variant: 'warning' },
  ended: { label: 'Encerrado', variant: 'default' },
  draft: { label: 'Rascunho', variant: 'info' },
  error: { label: 'Erro', variant: 'error' },
};

export function CampaignStatus({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? { label: status, variant: 'default' };
  return <Badge variant={s.variant}>{s.label}</Badge>;
}
