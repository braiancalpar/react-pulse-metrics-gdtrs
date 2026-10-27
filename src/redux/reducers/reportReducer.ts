import { FETCH_REPORTS_REQUEST, FETCH_REPORTS_SUCCESS, FETCH_REPORTS_FAILED, SELECT_REPORT, DELETE_REPORT } from '../types/actionTypes';

const initialState: any = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

export function reportReducer(state: any = initialState, action: any) {
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
      return { ...state, list: state.list.filter((r: any) => r.id !== action.payload) };
    default:
      return state;
  }
}
