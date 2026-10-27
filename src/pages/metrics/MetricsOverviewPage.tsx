import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { MetricsCard } from '../../components/dashboard/MetricsCard';
import { LineChart } from '../../components/Chart/LineChart';
import { BarChart } from '../../components/Chart/BarChart';
import { PieChart } from '../../components/Chart/PieChart';
import { FunnelChart } from '../../components/Chart/FunnelChart';
import { mockMetrics } from '../../mocks/metrics';

const fmt = (n: number) => n.toLocaleString('pt-BR');
const fmtCurrency = (n: number) =>
  `R$ ${n.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;

const { overview, timeSeries, byChannel, funnel, engagement } = mockMetrics;

const PIE_COLORS = ['#6c63ff', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#0891b2', '#db2777', '#65a30d'];

const funnelSteps = [
  { label: 'Impressões', value: funnel.impressions },
  { label: 'Cliques', value: funnel.clicks },
  { label: 'Landing Page', value: funnel.landingPageViews },
  { label: 'Carrinho', value: funnel.addToCart },
  { label: 'Checkout', value: funnel.checkout },
  { label: 'Conversões', value: funnel.conversions },
];

const secondaryCardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 8,
  padding: 16,
  textAlign: 'center',
  flex: 1,
};

const secondaryLabelStyle: React.CSSProperties = {
  color: '#718096',
  textTransform: 'uppercase',
  fontSize: 12,
  marginBottom: 8,
  letterSpacing: '0.05em',
};

const secondaryValueStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: '#111827',
};

const MetricsOverviewPage: React.FC = () => {
  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        {/* Título */}
        <h1 style={{ margin: '0 0 24px', fontSize: 24, fontWeight: 700 }}>Métricas</h1>

        {/* KPI Cards — 4 colunas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}>
          <MetricsCard
            title="Impressões"
            value={overview.totalImpressions}
            change={5.2}
            color="#6c63ff"
          />
          <MetricsCard
            title="Cliques"
            value={overview.totalClicks}
            change={3.8}
            color="#10b981"
          />
          <MetricsCard
            title="Conversões"
            value={overview.totalConversions}
            change={7.1}
            color="#f59e0b"
          />
          <MetricsCard
            title="Receita"
            value={fmtCurrency(overview.totalRevenue)}
            change={8.5}
            color="#3b82f6"
          />
        </div>

        {/* Métricas Secundárias — 5 cards */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={secondaryCardStyle}>
            <p style={secondaryLabelStyle}>CTR Médio</p>
            <p style={secondaryValueStyle}>{overview.averageCTR}%</p>
          </div>
          <div style={secondaryCardStyle}>
            <p style={secondaryLabelStyle}>ROAS Médio</p>
            <p style={secondaryValueStyle}>{overview.averageROAS}x</p>
          </div>
          <div style={secondaryCardStyle}>
            <p style={secondaryLabelStyle}>Gasto Total</p>
            <p style={secondaryValueStyle}>{fmtCurrency(overview.totalSpent)}</p>
          </div>
          <div style={secondaryCardStyle}>
            <p style={secondaryLabelStyle}>Taxa de Rejeição</p>
            <p style={secondaryValueStyle}>{engagement.bounceRate}%</p>
          </div>
          <div style={secondaryCardStyle}>
            <p style={secondaryLabelStyle}>Páginas/Sessão</p>
            <p style={secondaryValueStyle}>{engagement.pagesPerSession}</p>
          </div>
        </div>

        {/* Gráficos — LineChart + PieChart */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#374151' }}>
              Cliques ao longo do tempo (30 dias)
            </h3>
            <LineChart
              data={timeSeries.clicks.slice(-30)}
              label="Cliques"
              color="#6c63ff"
              height={250}
            />
          </div>
          <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#374151' }}>
              Distribuição por Canal
            </h3>
            <PieChart
              labels={byChannel.map(c => c.channel)}
              data={byChannel.map(c => c.clicks)}
              colors={PIE_COLORS}
              height={250}
            />
          </div>
        </div>

        {/* BarChart — Investimento por Canal */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#374151' }}>
            Investimento por Canal
          </h3>
          <BarChart
            labels={byChannel.map(c => c.channel)}
            datasets={[{ label: 'Gasto (R$)', data: byChannel.map(c => c.spent), color: '#6c63ff' }]}
            horizontal={true}
            height={200}
          />
        </div>

        {/* Funil de Conversão */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#374151' }}>
            Funil de Conversão
          </h3>
          <FunnelChart steps={funnelSteps} height={320} />
        </div>
      </div>
    </AppLayout>
  );
};

export default MetricsOverviewPage;
