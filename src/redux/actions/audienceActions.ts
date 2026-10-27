import * as types from '../types/actionTypes';
import { audienceService } from '../../services/audienceService';

export const loadAudiences = () => async (dispatch: any) => {
  dispatch({ type: types.LOAD_AUDIENCES });
  try {
    const data = await audienceService.getAll();
    dispatch({ type: types.AUDIENCE_LOADED, payload: data });
  } catch (err: any) {
    dispatch({ type: types.AUDIENCE_ERROR, payload: err.message });
  }
};

export const selectAudience = (audience: any) => ({
  type: types.SELECT_AUDIENCE,
  payload: audience,
});
