import { METRICS_LOADING, METRICS_SUCCESS, METRICS_FAILURE, SET_DATE_RANGE, METRICS_RESET } from '../types/actionTypes';

interface MetricsOverview {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalSpent: number;
  averageCTR: number;
  averageROAS: number;
  totalRevenue: number;
}

interface TimePoint {
  date: string;
  value: number;
}

interface TimeSeries {
  impressions: TimePoint[];
  clicks: TimePoint[];
  conversions: TimePoint[];
  revenue: TimePoint[];
  ctr: TimePoint[];
}

interface ChannelMetrics {
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spent: number;
}

interface FunnelMetrics {
  impressions: number;
  clicks: number;
  landingPageViews: number;
  addToCart: number;
  checkout: number;
  conversions: number;
}

interface EngagementMetrics {
  sessionDuration: number;
  bounceRate: number;
  pagesPerSession: number;
  returnVisitors: number;
}

interface MetricsState {
  overview: MetricsOverview | null;
  timeSeries: TimeSeries | null;
  byChannel: ChannelMetrics[];
  funnel: FunnelMetrics | null;
  engagement?: EngagementMetrics;
  loading: boolean;
  error: string | null;
  dateRange: { startDate: string | null; endDate: string | null };
}

type MetricsSuccessPayload =
  | Partial<Omit<MetricsState, 'loading' | 'error' | 'dateRange'>>
  | MetricsOverview;

type MetricsAction =
  | { type: typeof METRICS_LOADING }
  | { type: typeof METRICS_SUCCESS; payload: MetricsSuccessPayload }
  | { type: typeof METRICS_FAILURE; payload: string }
  | { type: typeof SET_DATE_RANGE; payload: MetricsState['dateRange'] }
  | { type: typeof METRICS_RESET };

const initialState: MetricsState = {
  overview: null,
  timeSeries: null,
  byChannel: [],
  funnel: null,
  loading: false,
  error: null,
  dateRange: { startDate: null, endDate: null },
};

export function metricsReducer(
  state: MetricsState = initialState,
  action: MetricsAction
): MetricsState {
  switch (action.type) {
    case METRICS_LOADING:
      return { ...state, loading: true, error: null };
    case METRICS_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case METRICS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_DATE_RANGE:
      return { ...state, dateRange: action.payload };
    case METRICS_RESET:
      return initialState;
    default:
      return state;
  }
}
