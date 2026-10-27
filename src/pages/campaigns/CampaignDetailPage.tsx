import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import { fetchCampaignById } from '../../redux/actions/campaignActions';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  active:  { bg: '#c6f6d5', color: '#276749' },
  paused:  { bg: '#fefcbf', color: '#744210' },
  ended:   { bg: '#e2e8f0', color: '#4a5568' },
  draft:   { bg: '#bee3f8', color: '#2a69ac' },
};

const formatCurrency = (n: number) =>
  `R$ ${n.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

const formatNumber = (n: number) => n.toLocaleString('pt-BR');

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR');
};

const SummaryCard: React.FC<{ label: string; value: string; sub?: string }> = ({ label, value, sub }) => (
  <div style={{
    flex: 1, background: 'white', borderRadius: '8px', padding: '16px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)', minWidth: '140px',
  }}>
    <p data-testid="summary-label" style={{ margin: '0 0 6px', fontSize: '12px', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
    <p style={{ margin: '0', fontSize: '18px', fontWeight: '700', color: '#2d3748' }}>{value}</p>
    {sub && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#718096' }}>{sub}</p>}
  </div>
);

const MetricCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{
    flex: 1, background: 'white', borderRadius: '8px', padding: '16px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)', minWidth: '120px', textAlign: 'center',
  }}>
    <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
    <p style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#2d3748' }}>{value}</p>
  </div>
);

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { selected: campaign, loading, error } = useSelector((state: any) => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaignById(id));
  }, [id, dispatch]);

  // Show error first — handles API errors (e.g. 404 for unknown id)
  if (error) {
    return (
      <AppLayout>
        <div style={{ padding: '24px' }}>
          <p data-testid="error-message" style={{ color: '#e53e3e', fontSize: '16px', marginBottom: '16px' }}>
            Erro: {error}
          </p>
          <button
            data-testid="back-button"
            onClick={() => history.push('/campaigns')}
            style={{ padding: '8px 16px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            ← Voltar
          </button>
        </div>
      </AppLayout>
    );
  }

  // Loading OR campaign not yet fetched (initial render before useEffect fires).
  // Without this check the component would return null and cause a white screen.
  if (loading || !campaign) {
    return (
      <AppLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <p style={{ color: '#718096', fontSize: '16px' }}>Carregando...</p>
        </div>
      </AppLayout>
    );
  }

  const ss = STATUS_COLORS[campaign.status] ?? { bg: '#e2e8f0', color: '#4a5568' };
  const spentPct = campaign.budget > 0
    ? ((campaign.spent / campaign.budget) * 100).toFixed(1)
    : '0.0';
  // Métricas estão aninhadas sob campaign.metrics na resposta da API
  const m = campaign.metrics ?? {};

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        {/* Back button */}
        <button
          data-testid="back-button"
          onClick={() => history.push('/campaigns')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 12px', marginBottom: '20px',
            background: 'transparent', border: '1px solid #e2e8f0',
            borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#4a5568',
          }}
        >
          ← Voltar
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <h1 data-testid="campaign-detail-name" style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>
            {campaign.name}
          </h1>
          <span style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '13px', fontWeight: '600', background: ss.bg, color: ss.color }}>
            {campaign.status}
          </span>
          <span style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '13px', background: '#edf2f7', color: '#4a5568' }}>
            {campaign.channel}
          </span>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <SummaryCard label="Budget" value={formatCurrency(campaign.budget)} />
          <SummaryCard
            label="Gasto"
            value={formatCurrency(campaign.spent)}
            sub={`${spentPct}% do budget`}
          />
          <SummaryCard
            label="Período"
            value={`${formatDate(campaign.startDate)} – ${formatDate(campaign.endDate)}`}
          />
          <SummaryCard label="Objetivo" value={campaign.objective} />
        </div>

        {/* Metrics section */}
        <h2 data-testid="metrics-title" style={{ fontSize: '16px', fontWeight: '600', color: '#4a5568', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
          Métricas de Performance
        </h2>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <MetricCard label="Impressões" value={formatNumber(m.impressions ?? 0)} />
          <MetricCard label="Clicks" value={formatNumber(m.clicks ?? 0)} />
          <MetricCard label="Conversões" value={formatNumber(m.conversions ?? 0)} />
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <MetricCard label="CTR" value={`${(m.ctr ?? 0).toFixed(2)}%`} />
          <MetricCard label="CPC" value={formatCurrency(m.cpc ?? 0)} />
          <MetricCard label="ROAS" value={`${(m.roas ?? 0).toFixed(1)}x`} />
        </div>
      </div>
    </AppLayout>
  );
};

export default CampaignDetailPage;
