import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import { CampaignForm } from '../../components/campaigns/CampaignForm';
import { createCampaign } from '../../redux/actions/campaignActions';

const CampaignCreatePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    setError(null);
    try {
      await dispatch(createCampaign(data) as any);
      history.push('/campaigns');
    } catch (e: any) {
      setError('Erro ao criar campanha. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '700' }}>Nova Campanha</h1>
        {error && (
          <div style={{ color: '#e53e3e', background: '#fff5f5', border: '1px solid #feb2b2',
            borderRadius: '6px', padding: '12px 16px', marginBottom: '16px' }}>
            {error}
          </div>
        )}
        <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <CampaignForm
            onSubmit={submitting ? undefined : handleSubmit}
            onCancel={() => history.push('/campaigns')}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default CampaignCreatePage;
