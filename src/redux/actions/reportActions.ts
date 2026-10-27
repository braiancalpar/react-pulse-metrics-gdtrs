import * as types from '../types/actionTypes';
import { reportService } from '../../services/reportService';

export const fetchReports = () => async (dispatch: any) => {
  dispatch({ type: types.FETCH_REPORTS_REQUEST });
  try {
    const data = await reportService.getAll();
    dispatch({ type: types.FETCH_REPORTS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: types.FETCH_REPORTS_FAILED, payload: error.message });
  }
};

export const selectReport = (report: any) => ({
  type: types.SELECT_REPORT,
  payload: report,
});

export const deleteReport = (id: string) => async (dispatch: any) => {
  await reportService.delete(id);
  dispatch({ type: types.DELETE_REPORT, payload: id });
};
