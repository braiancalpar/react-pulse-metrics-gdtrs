import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import { CampaignForm } from '../../components/campaigns/CampaignForm';
import { updateCampaign } from '../../redux/actions/campaignActions';
import { campaignService } from '../../services/campaignService';

const CampaignEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    campaignService.getById(id).then(data => {
      setInitialData(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    setError(null);
    try {
      await dispatch(updateCampaign(id, data) as any);
      history.push(`/campaigns/${id}`);
    } catch (e: any) {
      setError('Erro ao salvar campanha. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '700' }}>Editar Campanha</h1>
        {error && (
          <div style={{ color: '#e53e3e', background: '#fff5f5', border: '1px solid #feb2b2',
            borderRadius: '6px', padding: '12px 16px', marginBottom: '16px' }}>
            {error}
          </div>
        )}
        <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {loading ? (
            <p style={{ color: '#718096' }}>Carregando...</p>
          ) : initialData ? (
            <CampaignForm
              initialData={initialData}
              submitLabel="Salvar Alterações"
              onSubmit={submitting ? undefined : handleSubmit}
              onCancel={() => history.push(`/campaigns/${id}`)}
            />
          ) : (
            <p style={{ color: '#e53e3e' }}>Campanha não encontrada.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CampaignEditPage;
