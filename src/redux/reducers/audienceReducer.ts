import { LOAD_AUDIENCES, AUDIENCE_LOADED, AUDIENCE_ERROR, SELECT_AUDIENCE } from '../types/actionTypes';

const initialState: any = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

export function audienceReducer(state: any = initialState, action: any) {
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
