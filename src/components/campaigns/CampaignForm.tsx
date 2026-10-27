import React, { useState } from 'react';
import { CampaignFormStep1 } from './CampaignFormStep1';
import { CampaignFormStep2 } from './CampaignFormStep2';
import { CampaignFormStep3 } from './CampaignFormStep3';
import { Button } from '../common/Button';

interface CampaignFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
  submitLabel?: string;
}

export function CampaignForm({ onSubmit, onCancel, initialData, submitLabel }: CampaignFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData ?? {});

  const updateData = (data: any) => setFormData((prev: any) => ({ ...prev, ...data }));

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? '#2563eb' : '#e5e7eb' }} />
        ))}
      </div>
      {step === 1 && <CampaignFormStep1 data={formData} onChange={updateData} />}
      {step === 2 && <CampaignFormStep2 data={formData} onChange={updateData} />}
      {step === 3 && <CampaignFormStep3 data={formData} onChange={updateData} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <Button variant="ghost" onClick={step === 1 ? onCancel : () => setStep(s => s - 1)}>
          {step === 1 ? 'Cancelar' : 'Voltar'}
        </Button>
        <Button onClick={step === 3 ? () => onSubmit?.(formData) : () => setStep(s => s + 1)}>
          {step === 3 ? (submitLabel ?? 'Criar Campanha') : 'Próximo'}
        </Button>
      </div>
    </div>
  );
}
