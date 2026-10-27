import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import styles from '../styles/Dashboard.module.css';

// styled-components (Dev 1)
const TableWrapper = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th<{ sortable?: boolean }>`
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #718096;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  user-select: none;

  &:hover {
    ${props => props.sortable ? 'background: #edf2f7;' : ''}
  }
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #2d3748;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
`;

const Tr = styled.tr<{ selected?: boolean }>`
  background: ${props => props.selected ? '#f0eeff' : 'transparent'};
  transition: background 0.15s;

  &:hover {
    background: ${props => props.selected ? '#e6e0ff' : '#f7fafc'};
  }

  &:last-child td {
    border-bottom: none;
  }
`;

// Badge sem componente separado (Dev 2 em pressa)
const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#c6f6d5';
      case 'paused': return '#feebc8';
      case 'ended': return '#e2e8f0';
      case 'draft': return '#bee3f8';
      default: return '#e2e8f0';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#276749';
      case 'paused': return '#7b341e';
      case 'ended': return '#4a5568';
      case 'draft': return '#2b6cb0';
      default: return '#4a5568';
    }
  }};
`;

// PROP DRILLING: 12+ props individualmente (deveriam ser agrupadas ou usar context)
interface CampaignTableProps {
  campaigns: any[];          // qualquer tipo porque TypeScript decorativo
  loading: boolean;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  selectedRows: string[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  theme: string;
  filters: any;              // outro any
  onSort: (field: string) => void;
  onSelectRow: (id: string) => void;
  onSelectAll: () => void;
  onPageChange: (page: number) => void;
  onCampaignClick: (campaign: any) => void;
  onStatusChange: (id: string, status: string) => void;
  // Mais props adicionadas sem pensar
  showActions?: boolean;
  compactMode?: boolean;
  highlightBudgetExceeded?: boolean;
}

// TODO: Dividir em CampaignTableHeader, CampaignTableRow, CampaignTablePagination
const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  loading,
  sortField,
  sortOrder,
  selectedRows,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  theme,
  filters,
  onSort,
  onSelectRow,
  onSelectAll,
  onPageChange,
  onCampaignClick,
  onStatusChange,
  showActions = true,
  compactMode = false,
  highlightBudgetExceeded = true,
}) => {
  const history = useHistory();
  
  // Estado local que deveria estar no componente pai
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState<string | null>(null);

  const getSortIndicator = (field: string) => {
    if (sortField !== field) return ' ↕';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  // Formatação inline (deveria usar utils/formatCurrency)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // Formatação inline (deveria usar utils/formatDate)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Percentual inline (deveria usar utils/formatPercentage)
  const formatPercent = (value: number) => {
    return `${(value || 0).toFixed(2)}%`;
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      active: 'Ativo',
      paused: 'Pausado',
      ended: 'Encerrado',
      draft: 'Rascunho',
    };
    return labels[status] || status;
  };

  const getChannelIcon = (channel: string) => {
    const icons: any = {
      google: 'search',
      facebook: 'thumb_up',
      instagram: 'photo_camera',
      linkedin: 'work',
      twitter: 'alternate_email',
      email: 'email',
    };
    return icons[channel] || 'campaign';
  };

  if (loading) {
    return (
      <TableWrapper>
        <div style={{ padding: '48px', textAlign: 'center', color: '#718096' }}>
          <div className={styles.spinner} style={{ margin: '0 auto 12px' }} />
          <p style={{ margin: 0 }}>Carregando campanhas...</p>
        </div>
      </TableWrapper>
    );
  }

  if (campaigns.length === 0) {
    return (
      <TableWrapper>
        <div style={{ padding: '48px', textAlign: 'center', color: '#718096' }}>
          <div style={{ marginBottom: '12px' }}><span className="material-icons" style={{fontSize:48,color:'#d1d5db'}}>inbox</span></div>
          <h3 style={{ margin: '0 0 8px', color: '#4a5568' }}>Nenhuma campanha encontrada</h3>
          <p style={{ margin: '0 0 16px' }}>
            {filters.search || filters.status !== 'all'
              ? 'Tente remover os filtros aplicados'
              : 'Crie sua primeira campanha para começar'}
          </p>
          <button
            onClick={() => history.push('/campaigns/new')}
            style={{ padding: '8px 20px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Nova Campanha
          </button>
        </div>
      </TableWrapper>
    );
  }

  return (
    <div>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {/* Checkbox select all */}
              <Th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === campaigns.length && campaigns.length > 0}
                  onChange={onSelectAll}
                  style={{ cursor: 'pointer' }}
                />
              </Th>
              <Th sortable onClick={() => onSort('name')}>
                Campanha{getSortIndicator('name')}
              </Th>
              <Th sortable onClick={() => onSort('status')}>
                Status{getSortIndicator('status')}
              </Th>
              <Th sortable onClick={() => onSort('channel')}>
                Canal{getSortIndicator('channel')}
              </Th>
              <Th sortable onClick={() => onSort('budget')}>
                Budget{getSortIndicator('budget')}
              </Th>
              <Th sortable onClick={() => onSort('spend')}>
                Gasto{getSortIndicator('spend')}
              </Th>
              <Th sortable onClick={() => onSort('impressions')}>
                Impressões{getSortIndicator('impressions')}
              </Th>
              <Th sortable onClick={() => onSort('clicks')}>
                Cliques{getSortIndicator('clicks')}
              </Th>
              <Th>CTR</Th>
              <Th sortable onClick={() => onSort('conversions')}>
                Conversões{getSortIndicator('conversions')}
              </Th>
              {!compactMode && (
                <>
                  <Th>CVR</Th>
                  <Th sortable onClick={() => onSort('startDate')}>
                    Início{getSortIndicator('startDate')}
                  </Th>
                  <Th sortable onClick={() => onSort('endDate')}>
                    Fim{getSortIndicator('endDate')}
                  </Th>
                </>
              )}
              {showActions && <Th style={{ width: '80px' }}>Ações</Th>}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign: any) => {
              const isSelected = selectedRows.includes(campaign.id);
              const impressions = campaign.metrics?.impressions ?? campaign.impressions ?? 0;
              const clicks = campaign.metrics?.clicks ?? campaign.clicks ?? 0;
              const conversions = campaign.metrics?.conversions ?? campaign.conversions ?? 0;
              const spent = campaign.spent ?? campaign.spend ?? 0;
              const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
              const cvr = clicks > 0 ? (conversions / clicks) * 100 : 0;
              const budgetUsed = campaign.budget > 0 ? (spent / campaign.budget) * 100 : 0;
              const isBudgetExceeded = budgetUsed > 100;
              const isBudgetNearLimit = budgetUsed > 80 && budgetUsed <= 100;

              return (
                <React.Fragment key={campaign.id}>
                  <Tr selected={isSelected}>
                    <Td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow(campaign.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Td>
                    <Td>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => onCampaignClick(campaign)}
                      >
                        <div style={{ fontWeight: '600', color: '#6c63ff', marginBottom: '2px' }}>
                          {campaign.name}
                        </div>
                        {!compactMode && (
                          <div style={{ fontSize: '12px', color: '#718096' }}>
                            ID: {campaign.id}
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td>
                      <div style={{ position: 'relative' }}>
                        <StatusBadge
                          status={campaign.status}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setShowStatusDropdown(
                            showStatusDropdown === campaign.id ? null : campaign.id
                          )}
                        >
                          {getStatusLabel(campaign.status)} <span className="material-icons" style={{fontSize:12,verticalAlign:'middle'}}>expand_more</span>
                        </StatusBadge>
                        {/* Dropdown de status inline - deveria ser componente */}
                        {showStatusDropdown === campaign.id && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            zIndex: 100,
                            minWidth: '130px',
                            marginTop: '4px',
                          }}>
                            {['active', 'paused', 'ended', 'draft']
                              .filter(s => s !== campaign.status)
                              .map(status => (
                                <button
                                  key={status}
                                  onClick={() => {
                                    onStatusChange(campaign.id, status);
                                    setShowStatusDropdown(null);
                                  }}
                                  style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: 'none',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    color: '#2d3748',
                                  }}
                                >
                                  {getStatusLabel(status)}
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td>
                      <span className="material-icons" style={{ fontSize: 16, marginRight: 6, verticalAlign: 'middle', color: '#718096' }}>{getChannelIcon(campaign.channel)}</span>
                      {campaign.channel ? campaign.channel.charAt(0).toUpperCase() + campaign.channel.slice(1) : '-'}
                    </Td>
                    <Td>
                      <div>{formatCurrency(campaign.budget)}</div>
                      {!compactMode && (
                        <div style={{ fontSize: '11px', marginTop: '2px' }}>
                          {/* Barra de progresso inline */}
                          <div style={{ background: '#e2e8f0', borderRadius: '10px', height: '4px', width: '80px', marginBottom: '2px' }}>
                            <div style={{
                              background: isBudgetExceeded ? '#e53e3e' : isBudgetNearLimit ? '#ed8936' : '#48bb78',
                              borderRadius: '10px',
                              height: '100%',
                              width: `${Math.min(budgetUsed, 100)}%`,
                              transition: 'width 0.3s',
                            }} />
                          </div>
                          <span style={{ color: isBudgetExceeded ? '#e53e3e' : '#718096' }}>
                            {budgetUsed.toFixed(0)}% utilizado
                          </span>
                        </div>
                      )}
                    </Td>
                    <Td style={{ color: isBudgetExceeded && highlightBudgetExceeded ? '#e53e3e' : undefined, fontWeight: isBudgetExceeded ? '600' : 'normal' }}>
                      {formatCurrency(spent)}
                    </Td>
                    <Td>
                      {impressions >= 1000000
                        ? `${(impressions / 1000000).toFixed(1)}M`
                        : impressions >= 1000
                          ? `${(impressions / 1000).toFixed(0)}K`
                          : impressions.toLocaleString('pt-BR')}
                    </Td>
                    <Td>{clicks.toLocaleString('pt-BR')}</Td>
                    <Td>
                      <span style={{ color: ctr >= 3 ? '#38a169' : ctr >= 1 ? '#ed8936' : '#e53e3e' }}>
                        {formatPercent(ctr)}
                      </span>
                    </Td>
                    <Td>{conversions.toLocaleString('pt-BR')}</Td>
                    {!compactMode && (
                      <>
                        <Td>
                          <span style={{ color: cvr >= 5 ? '#38a169' : cvr >= 2 ? '#ed8936' : '#e53e3e' }}>
                            {formatPercent(cvr)}
                          </span>
                        </Td>
                        <Td style={{ fontSize: '13px' }}>{formatDate(campaign.startDate)}</Td>
                        <Td style={{ fontSize: '13px' }}>
                          {campaign.endDate
                            ? <span style={{ color: new Date(campaign.endDate) < new Date() ? '#e53e3e' : undefined }}>
                                {formatDate(campaign.endDate)}
                              </span>
                            : <span style={{ color: '#718096' }}>Sem data</span>
                          }
                        </Td>
                      </>
                    )}
                    {showActions && (
                      <Td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            onClick={() => history.push(`/campaigns/${campaign.id}`)}
                            title="Ver detalhes"
                            style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '13px' }}
                          ><span className="material-icons" style={{fontSize:16}}>visibility</span></button>
                          <button
                            onClick={() => history.push(`/campaigns/${campaign.id}/edit`)}
                            title="Editar"
                            style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '13px' }}
                          ><span className="material-icons" style={{fontSize:16}}>edit</span></button>
                          <button
                            onClick={() => setExpandedRow(expandedRow === campaign.id ? null : campaign.id)}
                            title="Mais ações"
                            style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '13px' }}
                          ><span className="material-icons" style={{fontSize:16}}>more_vert</span></button>
                        </div>
                      </Td>
                    )}
                  </Tr>

                  {/* Linha expandida inline - deveria ser componente */}
                  {expandedRow === campaign.id && (
                    <tr>
                      <Td colSpan={showActions ? (compactMode ? 11 : 14) : (compactMode ? 10 : 13)}>
                        <div style={{ padding: '16px', background: '#f7fafc', borderRadius: '6px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                          <div>
                            <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 2px', textTransform: 'uppercase' }}>Objetivo</p>
                            <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{campaign.objective || 'Conversões'}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 2px', textTransform: 'uppercase' }}>Audiência</p>
                            <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{campaign.audience || 'Geral'}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 2px', textTransform: 'uppercase' }}>CPA</p>
                            <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>
                              {conversions > 0 && spent > 0
                                ? formatCurrency(spent / conversions)
                                : '-'}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 2px', textTransform: 'uppercase' }}>ROAS</p>
                            <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>
                              {spent > 0
                                ? `${((conversions * 150) / spent).toFixed(2)}x`
                                : '-'}
                            </p>
                          </div>
                        </div>
                      </Td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>

      {/* Paginação inline (deveria ser componente Pagination) */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '14px' }}>
          <span style={{ color: '#718096' }}>
            Mostrando {((currentPage - 1) * pageSize) + 1}–{Math.min(currentPage * pageSize, totalItems)} de {totalItems} campanhas
          </span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              style={{
                padding: '6px 10px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: 'white',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                color: currentPage === 1 ? '#cbd5e0' : '#2d3748',
                fontSize: '13px',
              }}
            >
              «
            </button>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '6px 10px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: 'white',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                color: currentPage === 1 ? '#cbd5e0' : '#2d3748',
                fontSize: '13px',
              }}
            >
              ‹ Anterior
            </button>

            {/* Números de página */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  style={{
                    padding: '6px 10px',
                    border: '1px solid',
                    borderColor: currentPage === page ? '#6c63ff' : '#e2e8f0',
                    borderRadius: '6px',
                    background: currentPage === page ? '#6c63ff' : 'white',
                    color: currentPage === page ? 'white' : '#2d3748',
                    cursor: 'pointer',
                    fontSize: '13px',
                    minWidth: '32px',
                  }}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '6px 10px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: 'white',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                color: currentPage === totalPages ? '#cbd5e0' : '#2d3748',
                fontSize: '13px',
              }}
            >
              Próxima ›
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              style={{
                padding: '6px 10px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: 'white',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                color: currentPage === totalPages ? '#cbd5e0' : '#2d3748',
                fontSize: '13px',
              }}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignTable;
