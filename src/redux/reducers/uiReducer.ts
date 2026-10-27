import { SET_LOADING, OPEN_MODAL, CLOSE_MODAL, SET_SIDEBAR_OPEN, ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../types/actionTypes';

const initialState: any = {
  globalLoading: false,
  modal: { isOpen: false, type: null, data: null },
  sidebarOpen: true,
  notifications: [],
};

export function uiReducer(state: any = initialState, action: any) {
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
      return { ...state, notifications: state.notifications.filter((n: any) => n.id !== action.payload) };
    default:
      return state;
  }
}
