// Action Types - constantes de string (dívida técnica: deveria usar Redux Toolkit createSlice)
// Adicionados por 3 devs diferentes ao longo de 2 anos, sem padrão consistente

// Campaigns
export const FETCH_CAMPAIGNS_START = 'FETCH_CAMPAIGNS_START';
export const FETCH_CAMPAIGNS_SUCCESS = 'FETCH_CAMPAIGNS_SUCCESS';
export const FETCH_CAMPAIGNS_ERROR = 'FETCH_CAMPAIGNS_ERROR';
export const SET_CAMPAIGN = 'SET_CAMPAIGN';
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN';
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';
export const CLEAR_CAMPAIGNS = 'CLEAR_CAMPAIGNS';

// Metrics (dev 2 usou convenção diferente)
export const METRICS_LOADING = 'METRICS_LOADING';
export const METRICS_SUCCESS = 'METRICS_SUCCESS';
export const METRICS_FAILURE = 'METRICS_FAILURE';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const METRICS_RESET = 'METRICS_RESET';

// User (dev 3 usou outra convenção)
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_DATA = 'SET_USER_DATA';
export const UPDATE_USER_PREFERENCES = 'UPDATE_USER_PREFERENCES';

// Filters (adicionado depois, mistura das duas convenções)
export const SET_FILTER = 'SET_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';
export const APPLY_FILTERS = 'APPLY_FILTERS';

// Reports
export const FETCH_REPORTS_REQUEST = 'FETCH_REPORTS_REQUEST';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_FAILED = 'FETCH_REPORTS_FAILED';
export const SELECT_REPORT = 'SELECT_REPORT';
export const DELETE_REPORT = 'DELETE_REPORT';

// Audience
export const LOAD_AUDIENCES = 'LOAD_AUDIENCES';
export const AUDIENCE_LOADED = 'AUDIENCE_LOADED';
export const AUDIENCE_ERROR = 'AUDIENCE_ERROR';
export const SELECT_AUDIENCE = 'SELECT_AUDIENCE';

// UI State
export const SET_LOADING = 'SET_LOADING';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_SIDEBAR_OPEN = 'SET_SIDEBAR_OPEN';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
