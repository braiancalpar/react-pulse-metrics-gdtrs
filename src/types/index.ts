export * from './api';

// Tipos globais - mistura de interfaces e types sem padrão
export type ID = string | number; // deveria ser só string, mas legado usa number
export type Status = 'active' | 'paused' | 'ended' | 'draft' | string; // string escapou

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export interface FilterState {
  status: string;
  dateRange: DateRange;
  search?: string;
  [key: string]: any; // "flexível" demais
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
