import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip as ChartTooltip, Legend, ArcElement } from 'chart.js';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { fetchCampaigns, updateCampaignStatus } from '../redux/actions/campaignActions';
import { fetchMetrics } from '../redux/actions/metricsActions';
import { setFilter } from '../redux/actions/filterActions';
import { MOCK_CAMPAIGNS } from '../mocks/campaigns';
import { mockMetrics } from '../mocks/metrics';
import CampaignTable from './CampaignTable';
import { LineChart } from './Chart/LineChart';
import { PieChart } from './Chart/PieChart';
import styles from '../styles/Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartTooltip, Legend, ArcElement);

// TODO: Dividir este componente em partes menores
// FIXME: Há um memory leak no useEffect do gráfico
// HACK: Usando JSON.stringify nos filtros para forçar re-render

// styled-components (Dev 1)
const DashboardWrapper = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: ${props => props.theme === 'dark' ? '#1a1a2e' : '#f5f7fa'};
  min-height: 100vh;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCardStyled = styled.div<{ color?: string }>`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid ${props => props.color || '#6c63ff'};
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#6c63ff' : '#718096'};
  border-bottom: 2px solid ${props => props.active ? '#6c63ff' : 'transparent'};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: #6c63ff;
  }
`;

// TODO: mover para componente separado
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 32px;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

interface DashboardProps {
  initialTab?: string;
  showWelcome?: boolean;
}

// TODO: Tipar adequadamente - por enquanto any resolve
const Dashboard: React.FC<DashboardProps> = ({ initialTab = 'overview', showWelcome = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isAuthenticated } = useAuth();
  const { theme } = useTheme();

  // Redux state
  const reduxCampaigns: any[] = useSelector((state: any) => state.campaigns.list) || [];
  const reduxLoading = useSelector((state: any) => state.campaigns.loading);
  const reduxTimeSeries = useSelector((state: any) => state.metrics.timeSeries);
  const reduxByChannel = useSelector((state: any) => state.metrics.byChannel);

  const [loading, setLoading] = useState(true);

  // Filtros duplicados (também estão no Redux)
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: '',
    channel: 'all',
  });

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [sortField, setSortField] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dispatch(fetchCampaigns(filters) as any),
      dispatch(fetchMetrics({}) as any),
    ]).finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  // TODO: extrair para hook
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated]);

  // FIXME: esse callback é recriado desnecessariamente
  const handleFilterChange = useCallback((field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    // Também atualiza Redux (estado duplicado)
    dispatch(setFilter(field, value));
  }, []);

  const handleCampaignClick = (campaign: any) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleStatusChange = async (campaignId: string, newStatus: string) => {
    try {
      dispatch(updateCampaignStatus(campaignId, newStatus) as any);
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredCampaigns.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredCampaigns.map((c: any) => c.id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedRows.length === 0) return;
    // TODO: implementar ações em massa
    console.log(`Bulk action: ${action} para ${selectedRows.length} campanhas`);
    setSelectedRows([]);
  };

  // Lógica de filtro inline (deveria estar em um hook ou utilitário)
  const campaignList = reduxCampaigns.length > 0 ? reduxCampaigns : MOCK_CAMPAIGNS;

  const dateRangeDays: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };

  const filteredCampaigns = campaignList
    .filter((campaign: any) => {
      if (filters.status !== 'all' && campaign.status !== filters.status) return false;
      if (filters.search && !campaign.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.channel !== 'all' && campaign.channel !== filters.channel) return false;
      const days = dateRangeDays[filters.dateRange];
      if (days) {
        const rangeStart = new Date();
        rangeStart.setDate(rangeStart.getDate() - days);
        const start = campaign.startDate ? new Date(campaign.startDate) : null;
        if (!start || start < rangeStart) return false;
      }
      return true;
    })
    .sort((a: any, b: any) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredCampaigns.length / pageSize);

  // Cálculos de métricas inline (deveriam estar em utilitários)
  const totalImpressions = campaignList
    .reduce((sum: number, c: any) => sum + (c.metrics?.impressions || c.impressions || 0), 0);
  const totalClicks = campaignList
    .reduce((sum: number, c: any) => sum + (c.metrics?.clicks || c.clicks || 0), 0);
  const totalConversions = campaignList
    .reduce((sum: number, c: any) => sum + (c.metrics?.conversions || c.conversions || 0), 0);
  const totalSpend = campaignList
    .reduce((sum: number, c: any) => sum + (c.spent || c.spend || 0), 0);
  // CTR calculado inline
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const avgCVR = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '0.00';

  const timeSeriesClicks = (reduxTimeSeries?.clicks || mockMetrics.timeSeries.clicks).slice(-30);
  const byChannelData = reduxByChannel?.length > 0 ? reduxByChannel : mockMetrics.byChannel;

  if (loading && reduxCampaigns.length === 0) {
    return (
      // inline style (Dev 3) misturado com styled-components
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className={styles.spinner}>Carregando...</div>
      </div>
    );
  }

  return (
    <DashboardWrapper theme={theme}>
      {/* Header inline - Dev 3 não queria criar componente novo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme === 'dark' ? '#fff' : '#2d3748', margin: 0 }}>
            {showWelcome && user ? `Olá, ${user.name}! ` : ''}Dashboard
          </h1>
          <p style={{ color: '#718096', margin: '4px 0 0' }}>
            {/* Formatação de data inline */}
            Última atualização: {new Date().toLocaleDateString('pt-BR', { 
              day: '2-digit', month: 'long', year: 'numeric', 
              hour: '2-digit', minute: '2-digit' 
            })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Filtro de data inline */}
          <select
            value={filters.dateRange}
            onChange={e => handleFilterChange('dateRange', e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }}
          >
            <option value="all">Todas</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
          <button
            onClick={() => history.push('/campaigns/new')}
            style={{ 
              padding: '8px 16px', background: '#6c63ff', color: 'white', 
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' 
            }}
          >
            + Nova Campanha
          </button>
        </div>
      </div>

      {/* Metrics cards - TODO: extrair para MetricsGrid component */}
      <MetricsGrid>
        <MetricCardStyled color="#6c63ff">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 8px' }}>Impressões Totais</p>
              <h2 style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: '#2d3748' }}>
                {/* Formatação inline */}
                {totalImpressions >= 1000000 
                  ? `${(totalImpressions / 1000000).toFixed(1)}M`
                  : totalImpressions >= 1000 
                    ? `${(totalImpressions / 1000).toFixed(0)}K`
                    : totalImpressions.toLocaleString('pt-BR')}
              </h2>
            </div>
            <div style={{ background: '#f0eeff', borderRadius: '8px', padding: '10px', fontSize: '20px' }}><span className="material-icons" style={{fontSize:22}}>visibility</span>
            </div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#38a169' }}>
            ↑ 12.5% vs período anterior
          </p>
        </MetricCardStyled>

        <MetricCardStyled color="#48bb78">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 8px' }}>Total de Cliques</p>
              <h2 style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: '#2d3748' }}>
                {totalClicks.toLocaleString('pt-BR')}
              </h2>
            </div>
            <div style={{ background: '#f0fff4', borderRadius: '8px', padding: '10px', fontSize: '20px' }}><span className="material-icons" style={{fontSize:22}}>ads_click</span>
            </div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#38a169' }}>
            ↑ 8.3% vs período anterior
          </p>
        </MetricCardStyled>

        <MetricCardStyled color="#ed8936">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 8px' }}>Conversões</p>
              <h2 style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: '#2d3748' }}>
                {totalConversions.toLocaleString('pt-BR')}
              </h2>
            </div>
            <div style={{ background: '#fffaf0', borderRadius: '8px', padding: '10px', fontSize: '20px' }}><span className="material-icons" style={{fontSize:22}}>track_changes</span>
            </div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#e53e3e' }}>
            ↓ 2.1% vs período anterior
          </p>
        </MetricCardStyled>

        <MetricCardStyled color="#e53e3e">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 8px' }}>Gasto Total</p>
              <h2 style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: '#2d3748' }}>
                {/* Formatação de moeda inline */}
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSpend)}
              </h2>
            </div>
            <div style={{ background: '#fff5f5', borderRadius: '8px', padding: '10px', fontSize: '20px' }}><span className="material-icons" style={{fontSize:22}}>payments</span>
            </div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#38a169' }}>
            ROI: {totalSpend > 0 ? ((totalConversions * 150 - totalSpend) / totalSpend * 100).toFixed(1) : '0'}%
          </p>
        </MetricCardStyled>
      </MetricsGrid>

      {/* Linha de KPIs secundários - inline (Dev 3 em pressa) */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1, background: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 4px' }}>CTR Médio</p>
          <h3 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: '#2d3748' }}>{avgCTR}%</h3>
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 4px' }}>Taxa de Conversão</p>
          <h3 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: '#2d3748' }}>{avgCVR}%</h3>
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 4px' }}>Campanhas Ativas</p>
          <h3 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: '#2d3748' }}>
            {campaignList.filter((c: any) => c.status === 'active').length}
          </h3>
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 4px' }}>CPC Médio</p>
          <h3 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: '#2d3748' }}>
            {totalClicks > 0 && totalSpend > 0
              ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSpend / totalClicks)
              : 'R$ 0,00'
            }
          </h3>
        </div>
      </div>

      {/* Charts row */}
      <ChartsRow>
        <ChartContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
              Performance ao Longo do Tempo
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['impressoes', 'cliques', 'conversoes'].map(metric => (
                <button
                  key={metric}
                  style={{
                    padding: '4px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '20px',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: '#718096',
                  }}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <LineChart data={timeSeriesClicks} label="Cliques" color="#6c63ff" height={200} />
        </ChartContainer>

        <ChartContainer>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            Distribuição por Canal
          </h3>
          <PieChart
            labels={byChannelData.map((c: any) => c.channel)}
            data={byChannelData.map((c: any) => c.clicks)}
            colors={['#6c63ff', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#0891b2', '#db2777', '#65a30d']}
            height={200}
          />
        </ChartContainer>
      </ChartsRow>

      {/* Tabs */}
      <div className={styles.tabsWrapper}>
        <TabsContainer>
          {['overview', 'campaigns', 'metrics', 'reports'].map(tab => (
            <Tab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' ? 'Visão Geral' :
               tab === 'campaigns' ? 'Campanhas' :
               tab === 'metrics' ? 'Métricas' : 'Relatórios'}
            </Tab>
          ))}
        </TabsContainer>

        {/* Filtros inline (deveriam ser componente separado) */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar campanhas..."
              value={filters.search}
              onChange={e => handleFilterChange('search', e.target.value)}
              style={{
                padding: '8px 12px 8px 32px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                width: '240px',
              }}
            />
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }}><span className="material-icons" style={{fontSize:18,color:"#718096"}}>search</span></span>
          </div>

          <select
            value={filters.status}
            onChange={e => handleFilterChange('status', e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }}
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="paused">Pausado</option>
            <option value="ended">Encerrado</option>
            <option value="draft">Rascunho</option>
          </select>

          <select
            value={filters.channel}
            onChange={e => handleFilterChange('channel', e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }}
          >
            <option value="all">Todos os Canais</option>
            <option value="google">Google Ads</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
          </select>

          {selectedRows.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
              <span style={{ fontSize: '14px', color: '#718096', alignSelf: 'center' }}>
                {selectedRows.length} selecionadas
              </span>
              <button
                onClick={() => handleBulkAction('pause')}
                style={{ padding: '8px 12px', background: '#ed8936', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
              >
                Pausar
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                style={{ padding: '8px 12px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
              >
                Excluir
              </button>
            </div>
          )}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div>
            {/* Tabela de campanhas com PROP DRILLING */}
            <CampaignTable
              campaigns={paginatedCampaigns}
              loading={loading}
              sortField={sortField}
              sortOrder={sortOrder}
              selectedRows={selectedRows}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredCampaigns.length}
              theme={theme}
              onSort={handleSort}
              onSelectRow={handleSelectRow}
              onSelectAll={handleSelectAll}
              onPageChange={setCurrentPage}
              onCampaignClick={handleCampaignClick}
              onStatusChange={handleStatusChange}
              filters={filters}
            />
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div>
            <CampaignTable
              campaigns={paginatedCampaigns}
              loading={loading}
              sortField={sortField}
              sortOrder={sortOrder}
              selectedRows={selectedRows}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredCampaigns.length}
              theme={theme}
              onSort={handleSort}
              onSelectRow={handleSelectRow}
              onSelectAll={handleSelectAll}
              onPageChange={setCurrentPage}
              onCampaignClick={handleCampaignClick}
              onStatusChange={handleStatusChange}
              filters={filters}
            />
          </div>
        )}

        {activeTab === 'metrics' && (
          <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 16px', color: '#2d3748' }}>Métricas Detalhadas</h3>
            {/* TODO: usar componente real de métricas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { label: 'CPM', value: totalImpressions > 0 ? ((totalSpend / totalImpressions) * 1000).toFixed(2) : '0.00', prefix: 'R$' },
                { label: 'CPC', value: totalClicks > 0 ? (totalSpend / totalClicks).toFixed(2) : '0.00', prefix: 'R$' },
                { label: 'CPA', value: totalConversions > 0 ? (totalSpend / totalConversions).toFixed(2) : '0.00', prefix: 'R$' },
                { label: 'CTR', value: avgCTR, suffix: '%' },
                { label: 'CVR', value: avgCVR, suffix: '%' },
                { label: 'ROAS', value: totalSpend > 0 ? ((totalConversions * 150) / totalSpend).toFixed(2) : '0.00', suffix: 'x' },
              ].map(metric => (
                <div key={metric.label} style={{ padding: '16px', background: '#f7fafc', borderRadius: '6px' }}>
                  <p style={{ color: '#718096', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {metric.label}
                  </p>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#2d3748' }}>
                    {metric.prefix || ''}{metric.value}{metric.suffix || ''}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <p style={{ color: '#718096' }}>Módulo de relatórios — ver <a href="/reports" onClick={e => { e.preventDefault(); history.push('/reports'); }}>Relatórios</a></p>
          </div>
        )}
      </div>

      {/* Modal de detalhe de campanha - TODO: extrair para componente */}
      {showModal && selectedCampaign && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#2d3748' }}>{selectedCampaign.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#718096' }}
              >
                ×
              </button>
            </div>

            {/* Detalhes inline */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Status', value: selectedCampaign.status },
                { label: 'Canal', value: selectedCampaign.channel },
                { label: 'Budget', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedCampaign.budget || 0) },
                { label: 'Gasto', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedCampaign.spend || 0) },
                { label: 'Impressões', value: (selectedCampaign.impressions || 0).toLocaleString('pt-BR') },
                { label: 'Cliques', value: (selectedCampaign.clicks || 0).toLocaleString('pt-BR') },
                { label: 'Conversões', value: (selectedCampaign.conversions || 0).toLocaleString('pt-BR') },
                { label: 'CTR', value: `${selectedCampaign.impressions > 0 ? ((selectedCampaign.clicks / selectedCampaign.impressions) * 100).toFixed(2) : '0.00'}%` },
              ].map(item => (
                <div key={item.label} style={{ padding: '12px', background: '#f7fafc', borderRadius: '6px' }}>
                  <p style={{ color: '#718096', fontSize: '12px', margin: '0 0 2px' }}>{item.label}</p>
                  <p style={{ fontWeight: '600', margin: 0, color: '#2d3748' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowModal(false); history.push(`/campaigns/${selectedCampaign.id}`); }}
                style={{ padding: '8px 16px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Ver Detalhes Completos
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: '8px 16px', background: 'white', color: '#718096', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer' }}
              >
                Fechar
              </button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;
