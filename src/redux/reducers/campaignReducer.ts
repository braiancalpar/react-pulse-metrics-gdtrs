import {
  FETCH_CAMPAIGNS_START, FETCH_CAMPAIGNS_SUCCESS, FETCH_CAMPAIGNS_ERROR,
  SET_CAMPAIGN, UPDATE_CAMPAIGN, DELETE_CAMPAIGN, CREATE_CAMPAIGN, CLEAR_CAMPAIGNS,
} from '../types/actionTypes';

// state tipado como any - dívida técnica
const initialState: any = {
  list: [],
  selected: null,
  loading: false,
  error: null,
  total: 0,
};

export function campaignReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_CAMPAIGNS_START:
      return { ...state, loading: true, error: null, selected: null };

    case FETCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        total: action.payload.length,
        error: null,
      };

    case FETCH_CAMPAIGNS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_CAMPAIGN:
      return { ...state, loading: false, error: null, selected: action.payload };

    case UPDATE_CAMPAIGN:
      return {
        ...state,
        list: state.list.map((c: any) =>
          c.id === action.payload.id ? action.payload : c
        ),
        selected: state.selected?.id === action.payload.id ? action.payload : state.selected,
      };

    case DELETE_CAMPAIGN:
      return {
        ...state,
        list: state.list.filter((c: any) => c.id !== action.payload),
        total: state.total - 1,
      };

    case CREATE_CAMPAIGN:
      return {
        ...state,
        list: [...state.list, action.payload],
        total: state.total + 1,
      };

    case CLEAR_CAMPAIGNS:
      return initialState;

    default:
      return state;
  }
}
