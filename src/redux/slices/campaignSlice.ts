import { createAction, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { campaignService } from "../../services/campaignService";
import type { Campaign } from "../../types/api";
import {
  CLEAR_CAMPAIGNS,
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN as LEGACY_DELETE_CAMPAIGN,
  FETCH_CAMPAIGNS_ERROR,
  FETCH_CAMPAIGNS_START,
  FETCH_CAMPAIGNS_SUCCESS,
  UPDATE_CAMPAIGN as LEGACY_UPDATE_CAMPAIGN,
} from "../types/actionTypes";

const fetchCampaignsSuccess = createAction<Campaign[]>(FETCH_CAMPAIGNS_SUCCESS);
const fetchCampaignsError = createAction<string>(FETCH_CAMPAIGNS_ERROR);
const selectLegacyCampaign = createAction<Campaign>("SET_CAMPAIGN");
const createLegacyCampaign = createAction<Campaign>(CREATE_CAMPAIGN);
const updateLegacyCampaign = createAction<Campaign>(LEGACY_UPDATE_CAMPAIGN);
const deleteLegacyCampaign = createAction<string>(LEGACY_DELETE_CAMPAIGN);

// createAsyncThunk substitui fetchCampaignsStart + fetchCampaignsSuccess + fetchCampaignsError
// + o thunk manual — tudo em uma chamada, com tipagem automática
export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetchAll",
  async (filters: Record<string, string> | undefined) => {
    return campaignService.getAll(filters);
  },
);

export const fetchCampaignById = createAsyncThunk(
  "campaigns/fetchById",
  async (id: string) => {
    return campaignService.getById(id);
  },
);

export const createCampaign = createAsyncThunk(
  "campaigns/create",
  async (data: Omit<Campaign, "id">) => {
    return campaignService.create(data);
  },
);

export const updateCampaign = createAsyncThunk(
  "campaigns/update",
  async ({ id, data }: { id: string; data: Partial<Campaign> }) => {
    return campaignService.update(id, data);
  },
);

export const deleteCampaign = createAsyncThunk(
  "campaigns/delete",
  async (id: string) => {
    await campaignService.delete(id);
    return id;
  },
);

// Interface de estado — tipada, sem any
interface CampaignState {
  list: Campaign[];
  selected: Campaign | null;
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: CampaignState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
  total: 0,
};

// createSlice: reducers + actions + types em um único lugar
const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    // ações síncronas simples ficam aqui
    selectCampaign(state, action: PayloadAction<Campaign>) {
      state.selected = action.payload;
    },
    clearCampaigns(state) {
      state.list = [];
      state.selected = null;
      state.total = 0;
    },
  },
  // estados de loading/success/error dos thunks — gerados automaticamente
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao buscar campanhas";
      })
      .addCase(fetchCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao buscar campanha";
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        if (state.selected?.id === action.payload.id)
          state.selected = action.payload;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
        state.total -= 1;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.total += 1;
      })
      .addCase(FETCH_CAMPAIGNS_START, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignsSuccess, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchCampaignsError, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(selectLegacyCampaign, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createLegacyCampaign, (state, action) => {
        state.list.push(action.payload);
        state.total += 1;
      })
      .addCase(updateLegacyCampaign, (state, action) => {
        const idx = state.list.findIndex((campaign) => campaign.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        if (state.selected?.id === action.payload.id) state.selected = action.payload;
      })
      .addCase(deleteLegacyCampaign, (state, action) => {
        state.list = state.list.filter((campaign) => campaign.id !== action.payload);
        state.total = state.list.length;
      })
      .addCase(CLEAR_CAMPAIGNS, (state) => {
        state.list = [];
        state.selected = null;
        state.total = 0;
      });
  },
});

export const { selectCampaign, clearCampaigns } = campaignSlice.actions;
export default campaignSlice.reducer;
