import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import CampaignTable from '../components/CampaignTable';

const campaigns = [
  {
    id: 'campaign-1',
    name: 'Spring launch',
    status: 'active',
    channel: 'google',
    budget: 1000,
    spent: 400,
    startDate: '2024-01-15T12:00:00',
    endDate: null,
    metrics: { impressions: 1000, clicks: 100, conversions: 20 },
  },
  {
    id: 'campaign-2',
    name: 'Summer retargeting',
    status: 'paused',
    channel: 'facebook',
    budget: 2000,
    spent: 2100,
    startDate: '',
    endDate: '2024-02-15T12:00:00',
    metrics: { impressions: 0, clicks: 0, conversions: 0 },
  },
];

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

const defaultProps = {
  campaigns,
  loading: false,
  sortField: 'name',
  sortOrder: 'asc' as const,
  selectedRows: [],
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  totalItems: campaigns.length,
  theme: 'light',
  filters: { status: 'all', search: '', channel: 'all', dateRange: '30d' },
  onSort: jest.fn(),
  onSelectRow: jest.fn(),
  onSelectAll: jest.fn(),
  onPageChange: jest.fn(),
  onCampaignClick: jest.fn(),
  onStatusChange: jest.fn(),
};

function renderTable(overrides: Partial<typeof defaultProps> = {}) {
  return render(
    <MemoryRouter>
      <CampaignTable {...defaultProps} {...overrides} />
      <LocationDisplay />
    </MemoryRouter>
  );
}

describe('CampaignTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows a loading message while campaign data is loading', () => {
    renderTable({ loading: true, campaigns: [] });

    expect(screen.getByText('Carregando campanhas...')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('shows a useful empty state and links to campaign creation', () => {
    renderTable({ campaigns: [], filters: { ...defaultProps.filters, search: 'missing' } });

    expect(screen.getByRole('heading', { name: 'Nenhuma campanha encontrada' })).toBeInTheDocument();
    expect(screen.getByText('Tente remover os filtros aplicados')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Nova Campanha' }));
    expect(screen.getByTestId('location')).toHaveTextContent('/campaigns/new');
  });

  it('renders campaign values and calculated rates', () => {
    renderTable();

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Spring launch')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('10.00%')).toBeInTheDocument();
    expect(screen.getByText('20.00%')).toBeInTheDocument();
    expect(screen.getByText('Sem data')).toBeInTheDocument();
  });

  it('reports sorting, row selection, and select-all interactions', () => {
    renderTable();

    fireEvent.click(screen.getByText(/Campanha/));
    expect(defaultProps.onSort).toHaveBeenCalledWith('name');

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    expect(defaultProps.onSelectRow).toHaveBeenCalledWith('campaign-1');
    fireEvent.click(checkboxes[0]);
    expect(defaultProps.onSelectAll).toHaveBeenCalledTimes(1);
  });

  it('reports campaign selection and status changes', () => {
    renderTable();

    fireEvent.click(screen.getByText('Spring launch'));
    expect(defaultProps.onCampaignClick).toHaveBeenCalledWith(campaigns[0]);

    fireEvent.click(screen.getByText('Ativo'));
    fireEvent.click(screen.getByRole('button', { name: 'Pausado' }));
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith('campaign-1', 'paused');
    expect(screen.queryByRole('button', { name: 'Pausado' })).not.toBeInTheDocument();
  });

  it('shows expanded campaign details and supports page navigation', () => {
    renderTable({ totalPages: 3, currentPage: 2, totalItems: 25 });

    fireEvent.click(screen.getAllByTitle('Mais ações')[0]);
    expect(screen.getByText('Objetivo')).toBeInTheDocument();
    expect(screen.getByText('ROAS')).toBeInTheDocument();
    fireEvent.click(screen.getAllByTitle('Mais ações')[0]);
    expect(screen.queryByText('Objetivo')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Próxima ›' }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByRole('button', { name: '«' }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
    expect(screen.getByText('Mostrando 11–20 de 25 campanhas')).toBeInTheDocument();
  });

  it('navigates to the selected campaign details', () => {
    renderTable();

    fireEvent.click(screen.getAllByTitle('Ver detalhes')[0]);
    expect(screen.getByTestId('location')).toHaveTextContent('/campaigns/campaign-1');
  });
});
