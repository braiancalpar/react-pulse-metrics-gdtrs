import {
  AUDIENCE_ERROR,
  AUDIENCE_LOADED,
  CLOSE_MODAL,
  DELETE_REPORT,
  FETCH_REPORTS_FAILED,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  LOGIN_USER,
  LOAD_AUDIENCES,
  LOGOUT_USER,
  METRICS_FAILURE,
  METRICS_LOADING,
  METRICS_RESET,
  METRICS_SUCCESS,
  OPEN_MODAL,
  REMOVE_NOTIFICATION,
  RESET_FILTERS,
  SELECT_AUDIENCE,
  SELECT_REPORT,
  SET_DATE_RANGE,
  SET_FILTER,
  SET_LOADING,
  SET_SIDEBAR_OPEN,
  SET_USER_DATA,
  UPDATE_USER_PREFERENCES,
  ADD_NOTIFICATION,
  APPLY_FILTERS,
} from '../redux/types/actionTypes';
import { audienceReducer } from '../redux/reducers/audienceReducer';
import campaignReducer, {
  clearCampaigns,
  createCampaign,
  deleteCampaign,
  fetchCampaigns,
  selectCampaign,
  updateCampaign,
} from '../redux/slices/campaignSlice';
import { filterReducer } from '../redux/reducers/filterReducer';
import { metricsReducer } from '../redux/reducers/metricsReducer';
import { reportReducer } from '../redux/reducers/reportReducer';
import { uiReducer } from '../redux/reducers/uiReducer';
import { userReducer } from '../redux/reducers/userReducer';
import type { Campaign, User } from '../types/api';

const campaign: Campaign = {
  id: 'campaign-1',
  name: 'Spring launch',
  status: 'active',
  channel: 'google',
  budget: 1000,
  spent: 400,
  startDate: '2024-01-01',
  endDate: null,
  metrics: { impressions: 100, clicks: 10, conversions: 2, ctr: 10, cvr: 20 },
};

const user: User = {
  id: 'user-1',
  name: 'Alex',
  email: 'alex@example.com',
  role: 'admin',
  avatar: null,
  department: 'Marketing',
  joinedAt: '2023-01-01',
  lastActive: '2024-01-01',
  permissions: ['campaigns:read'],
};

describe('campaignReducer', () => {
  it('starts empty and preserves the same state for unknown actions', () => {
    const initial = campaignReducer(undefined, { type: 'UNKNOWN' } as never);

    expect(initial).toEqual({
      list: [],
      selected: null,
      loading: false,
      error: null,
      total: 0,
    });
    expect(campaignReducer(initial, { type: 'UNKNOWN' } as never)).toBe(initial);
  });

  it('tracks loading, successful fetches, and fetch errors', () => {
    const loading = campaignReducer(undefined, fetchCampaigns.pending('request-1', undefined));
    expect(loading).toMatchObject({ loading: true, error: null, selected: null });

    const loaded = campaignReducer(
      loading,
      fetchCampaigns.fulfilled([campaign], 'request-1', undefined),
    );
    expect(loaded).toMatchObject({ loading: false, list: [campaign], total: 1, error: null });

    expect(campaignReducer(
      loaded,
      fetchCampaigns.rejected(new Error('Network error'), 'request-2', undefined),
    )).toMatchObject({ loading: false, error: 'Network error', list: [campaign] });
  });

  it('selects, updates, creates, deletes, and clears campaigns', () => {
    const selected = campaignReducer(undefined, selectCampaign(campaign));
    expect(selected.selected).toEqual(campaign);

    const withCampaign = campaignReducer(
      selected,
      createCampaign.fulfilled(campaign, 'request-1', campaign),
    );
    expect(withCampaign.list).toEqual([campaign]);
    expect(withCampaign.total).toBe(1);

    const updatedCampaign = { ...campaign, name: 'Updated launch' };
    const updated = campaignReducer(
      { ...withCampaign, selected: campaign },
      updateCampaign.fulfilled(updatedCampaign, 'request-2', {
        id: campaign.id,
        data: updatedCampaign,
      }),
    );
    expect(updated.list).toEqual([updatedCampaign]);
    expect(updated.selected).toEqual(updatedCampaign);

    const deleted = campaignReducer(
      updated,
      deleteCampaign.fulfilled(campaign.id, 'request-3', campaign.id),
    );
    expect(deleted.list).toEqual([]);
    expect(deleted.total).toBe(0);

    expect(campaignReducer(deleted, clearCampaigns())).toEqual(
      campaignReducer(undefined, { type: 'UNKNOWN' } as never)
    );
  });

  it('does not replace a different selected campaign during an update', () => {
    const otherCampaign = { ...campaign, id: 'campaign-2' };
    const state = {
      ...campaignReducer(
        undefined,
        createCampaign.fulfilled(campaign, 'request-1', campaign),
      ),
      selected: otherCampaign,
    };

    expect(campaignReducer(state, {
      ...updateCampaign.fulfilled(
        { ...campaign, name: 'Updated' },
        'request-2',
        { id: campaign.id, data: { name: 'Updated' } },
      ),
    }).selected).toEqual(otherCampaign);
  });
});

describe('metricsReducer', () => {
  it('handles loading, success, failure, date range, reset, and unknown actions', () => {
    const initial = metricsReducer(undefined, { type: 'UNKNOWN' } as never);
    expect(initial).toMatchObject({
      overview: null,
      byChannel: [],
      loading: false,
      error: null,
      dateRange: { startDate: null, endDate: null },
    });
    expect(metricsReducer(initial, { type: METRICS_LOADING })).toMatchObject({
      loading: true,
      error: null,
    });

    const overview = {
      totalImpressions: 100,
      totalClicks: 10,
      totalConversions: 2,
      totalSpent: 20,
      averageCTR: 10,
      averageROAS: 2,
      totalRevenue: 40,
    };
    const loaded = metricsReducer(initial, { type: METRICS_SUCCESS, payload: { overview } });
    expect(loaded).toMatchObject({ loading: false, overview, error: null });
    expect(metricsReducer(loaded, {
      type: METRICS_FAILURE,
      payload: 'Metrics unavailable',
    })).toMatchObject({ loading: false, error: 'Metrics unavailable' });

    const dateRange = { startDate: '2024-01-01', endDate: '2024-01-31' };
    expect(metricsReducer(initial, { type: SET_DATE_RANGE, payload: dateRange }).dateRange)
      .toEqual(dateRange);
    expect(metricsReducer(loaded, { type: METRICS_RESET })).toEqual(initial);
    expect(metricsReducer(initial, { type: 'UNKNOWN' } as never)).toBe(initial);
  });
});

describe('filterReducer', () => {
  it('updates individual and applied filters and restores its initial state', () => {
    const initial = filterReducer(undefined, { type: 'UNKNOWN' } as never);
    expect(initial).toMatchObject({ status: 'all', channel: 'all', search: '', applied: {} });

    const changed = filterReducer(initial, {
      type: SET_FILTER,
      payload: { key: 'status', value: 'active' },
    });
    expect(changed.status).toBe('active');
    expect(changed.applied).toEqual({});

    const appliedFilters = { status: 'active' as const, search: 'spring' };
    expect(filterReducer(changed, {
      type: APPLY_FILTERS,
      payload: appliedFilters,
    }).applied).toEqual(appliedFilters);
    expect(filterReducer(changed, { type: RESET_FILTERS })).toEqual(initial);
    expect(filterReducer(initial, { type: 'UNKNOWN' } as never)).toBe(initial);
  });
});

describe('userReducer', () => {
  it('supports authentication, user data, preferences, logout, and unknown actions', () => {
    const initial = userReducer(undefined, { type: 'UNKNOWN' } as never);
    expect(initial).toMatchObject({
      currentUser: null,
      isAuthenticated: false,
      preferences: { theme: 'light', language: 'pt-BR', notifications: true },
    });

    const loggedIn = userReducer(initial, { type: LOGIN_USER, payload: user });
    expect(loggedIn).toMatchObject({ currentUser: user, isAuthenticated: true });
    expect(userReducer(loggedIn, {
      type: SET_USER_DATA,
      payload: { name: 'Alexandra' },
    }).currentUser).toMatchObject({ ...user, name: 'Alexandra' });

    expect(userReducer(loggedIn, {
      type: UPDATE_USER_PREFERENCES,
      payload: { theme: 'dark', notifications: false },
    }).preferences).toEqual({ theme: 'dark', language: 'pt-BR', notifications: false });
    expect(userReducer(loggedIn, { type: LOGOUT_USER })).toEqual(initial);
    expect(userReducer(initial, { type: 'UNKNOWN' } as never)).toBe(initial);
  });
});

describe('uiReducer', () => {
  it('manages loading, modal, sidebar, notifications, and unknown actions', () => {
    const initial = uiReducer(undefined, { type: 'UNKNOWN' } as never);
    expect(initial).toMatchObject({
      globalLoading: false,
      modal: { isOpen: false, type: null, data: null },
      sidebarOpen: true,
      notifications: [],
    });
    expect(uiReducer(initial, { type: SET_LOADING, payload: true }).globalLoading).toBe(true);

    const modalState = uiReducer(initial, {
      type: OPEN_MODAL,
      payload: { type: 'campaign', data: { id: campaign.id } },
    });
    expect(modalState.modal).toEqual({ isOpen: true, type: 'campaign', data: { id: campaign.id } });
    expect(uiReducer(modalState, { type: CLOSE_MODAL }).modal)
      .toEqual({ isOpen: false, type: null, data: null });
    expect(uiReducer(initial, { type: SET_SIDEBAR_OPEN, payload: false }).sidebarOpen).toBe(false);

    const now = jest.spyOn(Date, 'now').mockReturnValue(123);
    const withNotification = uiReducer(initial, {
      type: ADD_NOTIFICATION,
      payload: { type: 'success', message: 'Saved' },
    });
    expect(withNotification.notifications).toEqual([
      { id: 123, type: 'success', message: 'Saved' },
    ]);
    now.mockRestore();
    expect(uiReducer(withNotification, { type: REMOVE_NOTIFICATION, payload: 123 }).notifications)
      .toEqual([]);
    expect(uiReducer(initial, { type: 'UNKNOWN' } as never)).toBe(initial);
  });
});

describe('reportReducer', () => {
  it('handles request, success, failure, selection, deletion, and unknown actions', () => {
    const initial = reportReducer(undefined, { type: 'UNKNOWN' } as never);
    expect(initial).toMatchObject({ list: [], selected: null, loading: false, error: null });
    expect(reportReducer(initial, { type: FETCH_REPORTS_REQUEST }).loading).toBe(true);

    const report = {
      id: 'report-1',
      name: 'Monthly',
      type: 'performance',
      status: 'ready',
      createdBy: 'user-1',
      createdAt: '2024-01-01',
      lastRun: null,
      schedule: null,
      metrics: ['clicks'],
      dateRange: { startDate: '2024-01-01', endDate: '2024-01-31' },
    };
    const loaded = reportReducer(initial, { type: FETCH_REPORTS_SUCCESS, payload: [report] });
    expect(loaded).toMatchObject({ loading: false, list: [report] });
    expect(reportReducer(loaded, { type: SELECT_REPORT, payload: report }).selected).toEqual(report);
    expect(reportReducer(loaded, {
      type: FETCH_REPORTS_FAILED,
      payload: 'Unavailable',
    }).error).toBe('Unavailable');
    expect(reportReducer(loaded, { type: DELETE_REPORT, payload: report.id }).list).toEqual([]);
    expect(reportReducer(initial, { type: 'UNKNOWN' } as never)).toBe(initial);
  });
});

describe('audienceReducer', () => {
  it('handles loading, results, errors, selection, and unknown actions', () => {
    const initial = audienceReducer(undefined, { type: 'UNKNOWN' } as never);
    expect(initial).toMatchObject({ list: [], selected: null, loading: false, error: null });
    expect(audienceReducer(initial, { type: LOAD_AUDIENCES }).loading).toBe(true);

    const audience = {
      id: 'audience-1',
      name: 'Returning customers',
      size: 500,
      type: 'crm',
      description: 'Repeat purchasers',
      demographics: { ageRange: '25-45', gender: {}, topCities: [] },
      avgOrderValue: 100,
      lifetimeValue: 300,
      createdAt: '2024-01-01',
    };
    const loaded = audienceReducer(initial, { type: AUDIENCE_LOADED, payload: [audience] });
    expect(loaded).toMatchObject({ loading: false, list: [audience] });
    expect(audienceReducer(loaded, {
      type: AUDIENCE_ERROR,
      payload: 'Unavailable',
    })).toMatchObject({ loading: false, error: 'Unavailable' });
    expect(audienceReducer(loaded, { type: SELECT_AUDIENCE, payload: audience }).selected)
      .toEqual(audience);
    expect(audienceReducer(initial, { type: 'UNKNOWN' } as never)).toBe(initial);
  });
});
