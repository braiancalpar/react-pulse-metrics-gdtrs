import * as types from '../types/actionTypes';
import { campaignService } from '../../services/campaignService';

// Action creators manuais sem tipo adequado (dívida: deveria usar createAsyncThunk)
export const fetchCampaignsStart = () => ({ type: types.FETCH_CAMPAIGNS_START });

export const fetchCampaignsSuccess = (campaigns: any) => ({
  type: types.FETCH_CAMPAIGNS_SUCCESS,
  payload: campaigns,
});

export const fetchCampaignsError = (error: any) => ({
  type: types.FETCH_CAMPAIGNS_ERROR,
  payload: error,
});

export const fetchCampaigns = (filters?: any) => async (dispatch: any) => {
  dispatch(fetchCampaignsStart());
  try {
    const data = await campaignService.getAll(filters);
    dispatch(fetchCampaignsSuccess(data));
  } catch (error: any) {
    dispatch(fetchCampaignsError(error.message));
  }
};

export const setCampaign = (campaign: any) => ({
  type: types.SET_CAMPAIGN,
  payload: campaign,
});

export const updateCampaign = (id: string, data: any) => async (dispatch: any) => {
  try {
    const updated = await campaignService.update(id, data);
    dispatch({ type: types.UPDATE_CAMPAIGN, payload: updated });
  } catch (error: any) {
    console.error('Erro ao atualizar campanha:', error);
  }
};

export const deleteCampaign = (id: string) => async (dispatch: any) => {
  try {
    await campaignService.delete(id);
    dispatch({ type: types.DELETE_CAMPAIGN, payload: id });
  } catch (error: any) {
    console.error('Erro ao deletar campanha:', error);
  }
};

export const createCampaign = (data: any) => async (dispatch: any) => {
  try {
    const created = await campaignService.create(data);
    dispatch({ type: types.CREATE_CAMPAIGN, payload: created });
    return created;
  } catch (error: any) {
    console.error('Erro ao criar campanha:', error);
    throw error;
  }
};

export const clearCampaigns = () => ({ type: types.CLEAR_CAMPAIGNS });

export const fetchCampaignById = (id: string) => async (dispatch: any) => {
  dispatch(fetchCampaignsStart());
  try {
    const data = await campaignService.getById(id);
    dispatch(setCampaign(data));
  } catch (error: any) {
    dispatch(fetchCampaignsError(error.message));
  }
};

export const updateCampaignStatus = (id: string, status: string) => async (dispatch: any) => {
  dispatch({ type: 'UPDATE_CAMPAIGN_STATUS_REQUEST', payload: { id, status } });
  try {
    // simula API
    await new Promise(resolve => setTimeout(resolve, 300));
    dispatch({ type: 'UPDATE_CAMPAIGN_STATUS_SUCCESS', payload: { id, status } });
  } catch (error: any) {
    dispatch({ type: 'UPDATE_CAMPAIGN_STATUS_ERROR', payload: error.message });
  }
};
