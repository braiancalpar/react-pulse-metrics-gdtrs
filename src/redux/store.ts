import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { campaignReducer } from './reducers/campaignReducer';
import { metricsReducer } from './reducers/metricsReducer';
import { userReducer } from './reducers/userReducer';
import { filterReducer } from './reducers/filterReducer';
import { reportReducer } from './reducers/reportReducer';
import { audienceReducer } from './reducers/audienceReducer';
import { uiReducer } from './reducers/uiReducer';

// configureStore manual sem Redux Toolkit - dívida técnica
const rootReducer = combineReducers({
  campaigns: campaignReducer,
  metrics: metricsReducer,
  user: userReducer,
  filters: filterReducer,
  reports: reportReducer,
  audiences: audienceReducer,
  ui: uiReducer,
});

// Redux DevTools - adicionado de um jeito manual (RTK faz isso automaticamente)
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
