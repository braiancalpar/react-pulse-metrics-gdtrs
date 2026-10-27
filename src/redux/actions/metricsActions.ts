import * as types from '../types/actionTypes';
import { metricsService } from '../../services/metricsService';

export const loadMetrics = (dateRange?: any) => async (dispatch: any) => {
  dispatch({ type: types.METRICS_LOADING });
  try {
    const data = await metricsService.getOverview(dateRange);
    dispatch({ type: types.METRICS_SUCCESS, payload: data });
  } catch (err: any) {
    dispatch({ type: types.METRICS_FAILURE, payload: err.message });
  }
};

export const setDateRange = (range: any) => ({
  type: types.SET_DATE_RANGE,
  payload: range,
});

export const resetMetrics = () => ({ type: types.METRICS_RESET });

export const fetchMetrics = loadMetrics;
