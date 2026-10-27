import { LOGIN_USER, LOGOUT_USER, SET_USER_DATA, UPDATE_USER_PREFERENCES } from '../types/actionTypes';

const initialState: any = {
  currentUser: null,
  isAuthenticated: false,
  preferences: {
    theme: 'light',
    language: 'pt-BR',
    notifications: true,
  },
};

export function userReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, currentUser: action.payload, isAuthenticated: true };
    case LOGOUT_USER:
      return { ...initialState };
    case SET_USER_DATA:
      return { ...state, currentUser: { ...state.currentUser, ...action.payload } };
    case UPDATE_USER_PREFERENCES:
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    default:
      return state;
  }
}
