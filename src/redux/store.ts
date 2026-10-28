import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./slices/campaignSlice";
import { metricsReducer } from "./reducers/metricsReducer";
import { userReducer } from "./reducers/userReducer";
import { filterReducer } from "./reducers/filterReducer";
import { reportReducer } from "./reducers/reportReducer";
import { audienceReducer } from "./reducers/audienceReducer";
import { uiReducer } from "./reducers/uiReducer";

export const store = configureStore({
  reducer: {
    campaigns: campaignReducer,
    metrics: metricsReducer,
    user: userReducer,
    filters: filterReducer,
    reports: reportReducer,
    audiences: audienceReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
