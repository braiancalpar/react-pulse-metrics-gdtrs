import { SET_FILTER, RESET_FILTERS, APPLY_FILTERS } from '../types/actionTypes';

const initialState: any = {
  status: 'all',
  dateRange: { startDate: null, endDate: null },
  channel: 'all',
  search: '',
  applied: {},
};

export function filterReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, [action.payload.key]: action.payload.value };
    case RESET_FILTERS:
      return initialState;
    case APPLY_FILTERS:
      return { ...state, applied: action.payload };
    default:
      return state;
  }
}
