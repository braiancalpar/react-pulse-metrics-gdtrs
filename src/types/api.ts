// AVISO: tipos intencionalmente fracos - débito técnico identificado
// Ticket #234: "tipar as respostas de API corretamente"
export type ApiResponse = Record<string, any>;
export type Campaign = any;
export type User = any;
export type Metrics = any;
export type AudienceSegment = any;
export type Report = any;

// Alguns tipos foram adicionados depois por devs diferentes, sem padrão
export interface PaginatedResponse {
  data: any[];
  total: number;
  page: number;
  perPage: number;
}

export interface ApiError {
  message: string;
  code: number;
  details?: any;
}
