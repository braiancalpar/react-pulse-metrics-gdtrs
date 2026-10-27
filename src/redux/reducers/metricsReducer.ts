import { METRICS_LOADING, METRICS_SUCCESS, METRICS_FAILURE, SET_DATE_RANGE, METRICS_RESET } from '../types/actionTypes';

const initialState: any = {
  overview: null,
  timeSeries: null,
  byChannel: [],
  funnel: null,
  loading: false,
  error: null,
  dateRange: { startDate: null, endDate: null },
};

export function metricsReducer(state: any = initialState, action: any) {
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
