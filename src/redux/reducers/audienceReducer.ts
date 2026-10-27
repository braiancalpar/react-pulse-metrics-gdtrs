import { LOAD_AUDIENCES, AUDIENCE_LOADED, AUDIENCE_ERROR, SELECT_AUDIENCE } from '../types/actionTypes';
import type { AudienceSegment } from '../../types/api';

interface AudienceState {
  list: AudienceSegment[];
  selected: AudienceSegment | null;
  loading: boolean;
  error: string | null;
}

type AudienceAction =
  | { type: typeof LOAD_AUDIENCES }
  | { type: typeof AUDIENCE_LOADED; payload: AudienceSegment[] }
  | { type: typeof AUDIENCE_ERROR; payload: string }
  | { type: typeof SELECT_AUDIENCE; payload: AudienceSegment | null };

const initialState: AudienceState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

export function audienceReducer(
  state: AudienceState = initialState,
  action: AudienceAction
): AudienceState {
  switch (action.type) {
    case LOAD_AUDIENCES:
      return { ...state, loading: true };
    case AUDIENCE_LOADED:
      return { ...state, loading: false, list: action.payload };
    case AUDIENCE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SELECT_AUDIENCE:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
}
