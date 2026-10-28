import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { store } from '../redux/store';
import { clearCampaigns } from '../redux/slices/campaignSlice';
import { resetMetrics } from '../redux/actions/metricsActions';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { campaignService } from '../services/campaignService';
import { metricsService } from '../services/metricsService';

jest.mock('../hooks/useAuth', () => ({ useAuth: jest.fn() }));
jest.mock('../hooks/useTheme', () => ({ useTheme: jest.fn() }));
jest.mock('../services/campaignService', () => ({
  campaignService: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getMetrics: jest.fn(),
  },
}));
jest.mock('../services/metricsService', () => ({
  metricsService: {
    getOverview: jest.fn(),
    getByChannel: jest.fn(),
  },
}));

const mockUseAuth = useAuth as jest.Mock;
const mockUseTheme = useTheme as jest.Mock;
const getAll = campaignService.getAll as jest.Mock;
const getOverview = metricsService.getOverview as jest.Mock;

const campaign = {
  id: 'campaign-1',
  name: 'Spring launch',
  status: 'active',
  channel: 'google',
  budget: 1000,
  spent: 100,
  startDate: '2024-01-15T12:00:00',
  endDate: null,
  metrics: { impressions: 1000, clicks: 50, conversions: 5, ctr: 5, cvr: 10 },
};

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderDashboard(props: React.ComponentProps<typeof Dashboard> = {}) {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard {...props} />
        <LocationDisplay />
      </MemoryRouter>
    </Provider>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  store.dispatch(clearCampaigns());
  store.dispatch(resetMetrics());
  mockUseAuth.mockReturnValue({
    user: { name: 'Test User' },
    isAuthenticated: true,
  });
  mockUseTheme.mockReturnValue({ theme: 'light' });
  getAll.mockResolvedValue([campaign]);
  getOverview.mockResolvedValue({});
  (metricsService.getByChannel as jest.Mock).mockResolvedValue([]);
});

describe('Dashboard', () => {
  it('shows loading and then renders campaign metrics and rows', async () => {
    let resolveCampaigns!: (campaigns: typeof campaign[]) => void;
    getAll.mockReturnValueOnce(
      new Promise<typeof campaign[]>((resolve) => {
        resolveCampaigns = resolve;
      })
    );

    renderDashboard();

    expect(screen.getByText('Carregando campanhas...')).toBeInTheDocument();

    await act(async () => {
      resolveCampaigns([campaign]);
    });

    expect(await screen.findByRole('heading', { name: 'Olá, Test User' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Spring launch')).toBeInTheDocument());
    expect(screen.getAllByText('1K')).toHaveLength(2);
    expect(screen.getAllByText('50')).toHaveLength(2);
    expect(screen.getAllByText('5.00%')).toHaveLength(2);
    expect(screen.getAllByText('10.00%')).toHaveLength(2);
  });

  it('filters campaigns by channel', async () => {
    renderDashboard();
    await screen.findByText('Spring launch');

    fireEvent.change(screen.getByDisplayValue('Todos os canais'), {
      target: { value: 'email' },
    });
    expect(await screen.findByText('Nenhuma campanha encontrada')).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue('Email'), {
      target: { value: 'all' },
    });
    expect(await screen.findByText('Spring launch')).toBeInTheDocument();
  });

  it('opens and closes campaign details', async () => {
    renderDashboard();
    await screen.findByText('Spring launch');

    fireEvent.click(screen.getByText('Spring launch'));
    expect(screen.getByRole('heading', { name: 'Spring launch' })).toBeInTheDocument();
    expect(screen.getAllByText('Status', { exact: true })).toHaveLength(2);
    expect(screen.getByText('active')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(screen.queryByRole('heading', { name: 'Spring launch' })).not.toBeInTheDocument();
  });

  it('uses the generic title when there is no authenticated user', async () => {
    mockUseAuth.mockReturnValue({ user: null, isAuthenticated: false });
    renderDashboard();

    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/');
  });

  it('navigates to campaign details from the campaign modal', async () => {
    mockUseAuth.mockReturnValue({
      user: { name: 'Test User' },
      isAuthenticated: true,
    });
    renderDashboard({ showWelcome: false });
    await screen.findByRole('heading', { name: 'Dashboard' });

    fireEvent.click(await screen.findByText('Spring launch'));
    fireEvent.click(screen.getByRole('button', { name: 'Ver Detalhes Completos' }));
    expect(screen.getByTestId('location')).toHaveTextContent('/campaigns/campaign-1');
  });
});
