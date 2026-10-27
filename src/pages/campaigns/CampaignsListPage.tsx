import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import { fetchCampaigns } from '../../redux/actions/campaignActions';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  active:  { bg: '#c6f6d5', color: '#276749' },
  paused:  { bg: '#fefcbf', color: '#744210' },
  ended:   { bg: '#e2e8f0', color: '#4a5568' },
  draft:   { bg: '#bee3f8', color: '#2a69ac' },
};

const CampaignsListPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list, loading, error, total } = useSelector((state: any) => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const statusStyle = (status: string) =>
    STATUS_COLORS[status] ?? { bg: '#e2e8f0', color: '#4a5568' };

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>Campanhas</h1>
          <button
            onClick={() => history.push('/campaigns/new')}
            style={{ padding: '8px 20px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            + Nova Campanha
          </button>
        </div>

        {loading && (
          <p style={{ color: '#718096' }}>Carregando campanhas...</p>
        )}

        {error && (
          <p style={{ color: '#e53e3e' }}>Erro: {error}</p>
        )}

        {!loading && !error && (
          <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#718096', marginTop: 0 }}>{total} campanhas encontradas</p>
            {list.map((c: any) => {
              const ss = statusStyle(c.status);
              return (
                <div
                  key={c.id}
                  data-testid="campaign-row"
                  onClick={() => history.push(`/campaigns/${c.id}`)}
                  style={{
                    padding: '14px 12px',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span data-testid="campaign-name" style={{ fontWeight: '600', flex: 1 }}>{c.name}</span>

                  <span style={{
                    padding: '2px 8px', borderRadius: '9999px', fontSize: '12px',
                    background: '#edf2f7', color: '#4a5568',
                  }}>
                    {c.channel}
                  </span>

                  <span style={{
                    padding: '2px 8px', borderRadius: '9999px', fontSize: '12px',
                    background: ss.bg, color: ss.color, fontWeight: '600',
                  }}>
                    {c.status}
                  </span>

                  <span style={{ color: '#4a5568', fontSize: '13px', minWidth: '100px', textAlign: 'right' }}>
                    R$ {Number(c.budget).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CampaignsListPage;
