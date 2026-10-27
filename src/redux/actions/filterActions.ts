import * as types from '../types/actionTypes';

export const setFilter = (key: string, value: any) => ({
  type: types.SET_FILTER,
  payload: { key, value },
});

export const resetFilters = () => ({ type: types.RESET_FILTERS });

export const applyFilters = (filters: any) => ({
  type: types.APPLY_FILTERS,
  payload: filters,
});
