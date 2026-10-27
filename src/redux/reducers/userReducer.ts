import { LOGIN_USER, LOGOUT_USER, SET_USER_DATA, UPDATE_USER_PREFERENCES } from '../types/actionTypes';
import type { User } from '../../types/api';

interface UserPreferences {
  theme: string;
  language: string;
  notifications: boolean;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  preferences: UserPreferences;
}

type UserAction =
  | { type: typeof LOGIN_USER; payload: User }
  | { type: typeof LOGOUT_USER }
  | { type: typeof SET_USER_DATA; payload: Partial<User> }
  | { type: typeof UPDATE_USER_PREFERENCES; payload: Partial<UserPreferences> };

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  preferences: {
    theme: 'light',
    language: 'pt-BR',
    notifications: true,
  },
};

export function userReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
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
