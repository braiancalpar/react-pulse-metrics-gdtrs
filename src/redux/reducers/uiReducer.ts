import { SET_LOADING, OPEN_MODAL, CLOSE_MODAL, SET_SIDEBAR_OPEN, ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../types/actionTypes';

interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: unknown;
}

interface Notification {
  id: number;
  type: string;
  message: string;
}

interface UiState {
  globalLoading: boolean;
  modal: ModalState;
  sidebarOpen: boolean;
  notifications: Notification[];
}

type UiAction =
  | { type: typeof SET_LOADING; payload: boolean }
  | { type: typeof OPEN_MODAL; payload: { type: string; data: unknown } }
  | { type: typeof CLOSE_MODAL }
  | { type: typeof SET_SIDEBAR_OPEN; payload: boolean }
  | { type: typeof ADD_NOTIFICATION; payload: Omit<Notification, 'id'> }
  | { type: typeof REMOVE_NOTIFICATION; payload: number };

const initialState: UiState = {
  globalLoading: false,
  modal: { isOpen: false, type: null, data: null },
  sidebarOpen: true,
  notifications: [],
};

export function uiReducer(
  state: UiState = initialState,
  action: UiAction
): UiState {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, globalLoading: action.payload };
    case OPEN_MODAL:
      return { ...state, modal: { isOpen: true, type: action.payload.type, data: action.payload.data } };
    case CLOSE_MODAL:
      return { ...state, modal: { isOpen: false, type: null, data: null } };
    case SET_SIDEBAR_OPEN:
      return { ...state, sidebarOpen: action.payload };
    case ADD_NOTIFICATION:
      return { ...state, notifications: [...state.notifications, { id: Date.now(), ...action.payload }] };
    case REMOVE_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter(notification => notification.id !== action.payload) };
    default:
      return state;
  }
}
