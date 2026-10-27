import { CampaignChannel, CampaignStatus } from "./api";

export * from "./api";

// Tipos globais - mistura de interfaces e types sem padrão
export type ID = string | number; // deveria ser só string, mas legado usa number

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export interface FilterState {
  status: CampaignStatus;
  dateRange: DateRange;
  search?: string;
  channel: CampaignChannel;
}

// Adicionado por dev diferente, sem usar o ApiError acima
export type AppError = {
  msg: string;
  statusCode?: number;
};

export interface ThemeColors {
  primary: string;
  secondary: string;
  surface: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface Theme {
  colors: ThemeColors;
  borderRadius: string;
  fontFamily: string;
}
