import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useCampaigns } from '../hooks/useCampaigns';
import { useCampaignData } from '../hooks/useCampaignData';
import { useDebounce } from '../hooks/useDebounce';
import { useFilters } from '../hooks/useFilters';
import { useMetrics } from '../hooks/useMetrics';
import { usePagination } from '../hooks/usePagination';
import { store } from '../redux/store';
import { clearCampaigns } from '../redux/slices/campaignSlice';
import { resetFilters } from '../redux/actions/filterActions';
import { campaignService } from '../services/campaignService';
import { metricsService } from '../services/metricsService';
import { analyticsService } from '../services/analyticsService';

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

jest.mock('../services/analyticsService', () => ({
  analyticsService: { getDashboardData: jest.fn() },
}));

const getAll = campaignService.getAll as jest.Mock;
const getOverview = metricsService.getOverview as jest.Mock;
const getByChannel = metricsService.getByChannel as jest.Mock;
const getDashboardData = analyticsService.getDashboardData as jest.Mock;

const campaigns = [
  { id: 'campaign-1', name: 'Spring launch', status: 'active' },
];

function CampaignsHarness() {
  const { campaigns: result, loading, error, filters, setFilters } = useCampaigns();

  return (
    <div>
      <div data-testid="campaigns">{result.map(item => item.name).join(',')}</div>
      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="error">{error || ''}</div>
      <div data-testid="filters">{JSON.stringify(filters)}</div>
      <button onClick={() => setFilters({ status: 'active' })}>Apply campaign filter</button>
    </div>
  );
}

function CampaignDataHarness() {
  const { campaigns: result, loading, error, refresh, setFilter } = useCampaignData({ status: 'all' });

  return (
    <div>
      <div data-testid="redux-campaigns">{result.map(item => item.name).join(',')}</div>
      <div data-testid="redux-loading">{String(loading)}</div>
      <div data-testid="redux-error">{error || ''}</div>
      <button onClick={() => setFilter({ status: 'paused' })}>Change Redux filter</button>
      <button onClick={refresh}>Refresh campaigns</button>
    </div>
  );
}

function MetricsHarness({ dateRange }: { dateRange?: { startDate: string; endDate: string } }) {
  const { overview, byChannel, loading, error } = useMetrics(dateRange);

  return (
    <div>
      <div data-testid="overview">{overview ? JSON.stringify(overview) : ''}</div>
      <div data-testid="channels">{JSON.stringify(byChannel)}</div>
      <div data-testid="metrics-loading">{String(loading)}</div>
      <div data-testid="metrics-error">{error || ''}</div>
    </div>
  );
}

function FiltersHarness() {
  const { filters, updateFilter, reset } = useFilters({ status: 'all' });

  return (
    <div>
      <div data-testid="local-filters">{JSON.stringify(filters)}</div>
      <button onClick={() => updateFilter('status', 'active')}>Update filter</button>
      <button onClick={reset}>Reset filters</button>
    </div>
  );
}

function PaginationHarness({ total }: { total: number }) {
  const { page, totalPages, nextPage, prevPage, goToPage } = usePagination(total);

  return (
    <div>
      <div data-testid="pagination">{`${page}/${totalPages}`}</div>
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
      <button onClick={() => goToPage(2)}>Go to page two</button>
      <button onClick={() => goToPage(99)}>Go out of range</button>
    </div>
  );
}

function DebounceHarness({ value, delay }: { value: string; delay: number }) {
  const debouncedValue = useDebounce(value, delay);
  return <div data-testid="debounced">{debouncedValue}</div>;
}

beforeEach(() => {
  jest.clearAllMocks();
  store.dispatch(clearCampaigns());
  store.dispatch(resetFilters());
});

describe('useCampaigns', () => {
  it('loads campaigns and refetches when filters change', async () => {
    getAll.mockResolvedValue(campaigns);
    render(<CampaignsHarness />);

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    await waitFor(() => expect(screen.getByTestId('campaigns')).toHaveTextContent('Spring launch'));
    expect(getAll).toHaveBeenCalledWith({ status: 'all' });
    expect(screen.getByTestId('loading')).toHaveTextContent('false');

    fireEvent.click(screen.getByRole('button', { name: 'Apply campaign filter' }));
    await waitFor(() => expect(getAll).toHaveBeenLastCalledWith({ status: 'active' }));
    expect(screen.getByTestId('filters')).toHaveTextContent('active');
  });

  it('exposes service failures and stops loading', async () => {
    getAll.mockRejectedValue(new Error('Network unavailable'));
    render(<CampaignsHarness />);

    await waitFor(() => expect(screen.getByTestId('error')).toHaveTextContent('Network unavailable'));
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  it('ignores a response after the filter effect has been replaced', async () => {
    let resolveFirst: (value: typeof campaigns) => void = () => undefined;
    let resolveSecond: (value: typeof campaigns) => void = () => undefined;
    getAll
      .mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve; }))
      .mockImplementationOnce(() => new Promise(resolve => { resolveSecond = resolve; }));
    render(<CampaignsHarness />);

    fireEvent.click(screen.getByRole('button', { name: 'Apply campaign filter' }));
    await waitFor(() => expect(getAll).toHaveBeenCalledTimes(2));

    const staleCampaign = [{ id: 'old', name: 'Stale response', status: 'active' }];
    const currentCampaign = [{ id: 'new', name: 'Current response', status: 'active' }];
    await act(async () => resolveFirst(staleCampaign));
    expect(screen.queryByText('Stale response')).not.toBeInTheDocument();

    await act(async () => resolveSecond(currentCampaign));
    expect(await screen.findByText('Current response')).toBeInTheDocument();
  });
});

describe('useCampaignData', () => {
  it('dispatches the initial fetch, updates from Redux, and supports refresh/filter changes', async () => {
    getAll.mockResolvedValue(campaigns);
    render(<Provider store={store}><CampaignDataHarness /></Provider>);

    await waitFor(() => expect(screen.getByTestId('redux-campaigns')).toHaveTextContent('Spring launch'));
    expect(getAll).toHaveBeenCalledWith({ status: 'all' });
    expect(screen.getByTestId('redux-loading')).toHaveTextContent('false');

    fireEvent.click(screen.getByRole('button', { name: 'Change Redux filter' }));
    await waitFor(() => expect(getAll).toHaveBeenLastCalledWith({ status: 'paused' }));

    fireEvent.click(screen.getByRole('button', { name: 'Refresh campaigns' }));
    await waitFor(() => expect(getAll).toHaveBeenCalledTimes(3));
  });
});

describe('useMetrics', () => {
  it('loads overview and channel metrics for the selected date range', async () => {
    const overview = { totalClicks: 25 };
    const channels = [{ channel: 'google', clicks: 25 }];
    getOverview.mockResolvedValue(overview);
    getByChannel.mockResolvedValue(channels);
    getDashboardData.mockResolvedValue({ unused: true });

    render(<MetricsHarness dateRange={{ startDate: '2024-01-01', endDate: '2024-01-31' }} />);

    await waitFor(() => expect(screen.getByTestId('overview')).toHaveTextContent('totalClicks'));
    expect(screen.getByTestId('channels')).toHaveTextContent('google');
    expect(screen.getByTestId('metrics-loading')).toHaveTextContent('false');
    expect(getOverview).toHaveBeenCalledWith({ startDate: '2024-01-01', endDate: '2024-01-31' });
    expect(getByChannel).toHaveBeenCalledTimes(1);
    expect(getDashboardData).toHaveBeenCalledTimes(1);
  });

  it('reports a rejected data request and leaves loading state', async () => {
    getOverview.mockRejectedValue(new Error('Metrics unavailable'));
    getByChannel.mockResolvedValue([]);
    getDashboardData.mockResolvedValue({});
    render(<MetricsHarness />);

    await waitFor(() => expect(screen.getByTestId('metrics-error')).toHaveTextContent('Metrics unavailable'));
    expect(screen.getByTestId('metrics-loading')).toHaveTextContent('false');
  });
});

describe('useFilters', () => {
  it('updates local and Redux filters and resets both', () => {
    render(<Provider store={store}><FiltersHarness /></Provider>);

    fireEvent.click(screen.getByRole('button', { name: 'Update filter' }));
    expect(screen.getByTestId('local-filters')).toHaveTextContent('active');
    expect(store.getState().filters.status).toBe('active');

    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
    expect(screen.getByTestId('local-filters')).toHaveTextContent('{}');
    expect(store.getState().filters.status).toBe('all');
  });
});

describe('usePagination', () => {
  it('navigates within page bounds and ignores invalid destinations', () => {
    render(<PaginationHarness total={25} />);

    expect(screen.getByTestId('pagination')).toHaveTextContent('1/3');
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByTestId('pagination')).toHaveTextContent('1/3');
    fireEvent.click(screen.getByRole('button', { name: 'Go to page two' }));
    expect(screen.getByTestId('pagination')).toHaveTextContent('2/3');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByTestId('pagination')).toHaveTextContent('3/3');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Go out of range' }));
    expect(screen.getByTestId('pagination')).toHaveTextContent('3/3');
  });

  it('does not allow navigation when there are no pages', () => {
    render(<PaginationHarness total={0} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByTestId('pagination')).toHaveTextContent('1/0');
  });
});

describe('useDebounce', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('updates only after the delay and cancels a superseded value', () => {
    jest.useFakeTimers();
    const { rerender } = render(<DebounceHarness value="first" delay={300} />);

    expect(screen.getByTestId('debounced')).toHaveTextContent('first');
    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(screen.getByTestId('debounced')).toHaveTextContent('first');

    rerender(<DebounceHarness value="second" delay={300} />);
    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(screen.getByTestId('debounced')).toHaveTextContent('first');
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByTestId('debounced')).toHaveTextContent('second');
  });
});
