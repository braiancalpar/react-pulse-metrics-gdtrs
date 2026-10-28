import { SET_FILTER, RESET_FILTERS, APPLY_FILTERS } from '../types/actionTypes';
import type { CampaignChannel, CampaignStatus } from '../../types/api';

interface FilterValues {
  status: CampaignStatus | 'all';
  dateRange: { startDate: string | null; endDate: string | null };
  channel: CampaignChannel | 'all';
  search: string;
}

interface FilterState extends FilterValues {
  applied: Partial<FilterValues>;
}

type FilterAction =
  | {
      type: typeof SET_FILTER;
      payload: { key: keyof FilterValues; value: FilterValues[keyof FilterValues] };
    }
  | { type: typeof RESET_FILTERS }
  | { type: typeof APPLY_FILTERS; payload: Partial<FilterValues> };

const initialState: FilterState = {
  status: 'all',
  dateRange: { startDate: null, endDate: null },
  channel: 'all',
  search: '',
  applied: {},
};

export function filterReducer(
  state: FilterState = initialState,
  action: FilterAction
): FilterState {
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
