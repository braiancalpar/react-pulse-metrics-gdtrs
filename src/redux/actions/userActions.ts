import * as types from '../types/actionTypes';

export const loginUser = (userData: any) => ({
  type: types.LOGIN_USER,
  payload: userData,
});

export const logoutUser = () => ({ type: types.LOGOUT_USER });

export const setUserData = (data: any) => ({
  type: types.SET_USER_DATA,
  payload: data,
});

export const updateUserPreferences = (prefs: any) => ({
  type: types.UPDATE_USER_PREFERENCES,
  payload: prefs,
});
