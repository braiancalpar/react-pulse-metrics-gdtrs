import React from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

export function CampaignFormStep1({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ fontWeight: 700, fontSize: 16 }}>Informações básicas</h3>
      <Input label="Nome da campanha" value={data.name ?? ''} onChange={e => onChange({ name: e.target.value })} placeholder="Ex: Black Friday 2024" required />
      <Select label="Objetivo" value={data.objective ?? ''} onChange={v => onChange({ objective: v })}
        options={[
          { value: 'conversao', label: 'Conversão' },
          { value: 'awareness', label: 'Awareness' },
          { value: 'leads', label: 'Geração de leads' },
          { value: 'engajamento', label: 'Engajamento' },
          { value: 'retencao', label: 'Retenção' },
        ]}
        placeholder="Selecione o objetivo"
      />
      <Select label="Canal" value={data.channel ?? ''} onChange={v => onChange({ channel: v })}
        options={[
          { value: 'google', label: 'Google Ads' },
          { value: 'meta', label: 'Meta Ads' },
          { value: 'email', label: 'Email Marketing' },
          { value: 'tiktok', label: 'TikTok Ads' },
          { value: 'linkedin', label: 'LinkedIn Ads' },
        ]}
        placeholder="Selecione o canal"
      />
    </div>
  );
}
