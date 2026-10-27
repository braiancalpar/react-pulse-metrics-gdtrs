import { FETCH_REPORTS_REQUEST, FETCH_REPORTS_SUCCESS, FETCH_REPORTS_FAILED, SELECT_REPORT, DELETE_REPORT } from '../types/actionTypes';
import type { Report } from '../../types/api';

interface ReportState {
  list: Report[];
  selected: Report | null;
  loading: boolean;
  error: string | null;
}

type ReportAction =
  | { type: typeof FETCH_REPORTS_REQUEST }
  | { type: typeof FETCH_REPORTS_SUCCESS; payload: Report[] }
  | { type: typeof FETCH_REPORTS_FAILED; payload: string }
  | { type: typeof SELECT_REPORT; payload: Report | null }
  | { type: typeof DELETE_REPORT; payload: string };

const initialState: ReportState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

export function reportReducer(
  state: ReportState = initialState,
  action: ReportAction
): ReportState {
  switch (action.type) {
    case FETCH_REPORTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_REPORTS_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case FETCH_REPORTS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case SELECT_REPORT:
      return { ...state, selected: action.payload };
    case DELETE_REPORT:
      return { ...state, list: state.list.filter(report => report.id !== action.payload) };
    default:
      return state;
  }
}
