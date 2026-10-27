export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cvr: number;
}

export type CampaignStatus = "active" | "paused" | "ended" | "draft";
export type CampaignChannel = "google" | "facebook" | "instagram" | "linkedin";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  channel: CampaignChannel;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string | null;
  metrics: CampaignMetrics;
}

export interface AudienceSegment {
  id: string;
  name: string;
  size: number;
  type: string;
  description: string;
  demographics: {
    ageRange: string;
    gender: Record<string, number>;
    topCities: string[];
  };
  avgOrderValue: number;
  lifetimeValue: number;
  createdAt: string;
}

export interface ReportDateRange {
  startDate: string;
  endDate: string;
}

export interface ReportSchedule {
  frequency: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  hour?: number;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  status: string;
  createdBy: string;
  createdAt: string;
  lastRun: string | null;
  schedule: ReportSchedule | null;
  metrics: string[];
  dateRange: ReportDateRange;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  department: string;
  joinedAt: string;
  lastActive: string;
  permissions: string[];
}

export interface MetricsOverview {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalSpent: number;
  averageCTR: number;
  averageROAS: number;
  totalRevenue: number;
}

export interface TimePoint {
  date: string;
  value: number;
}

export interface MetricsTimeSeries {
  impressions: TimePoint[];
  clicks: TimePoint[];
  conversions: TimePoint[];
  revenue: TimePoint[];
  ctr: TimePoint[];
}

export interface ChannelMetrics {
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spent: number;
}

export interface FunnelMetrics {
  impressions: number;
  clicks: number;
  landingPageViews: number;
  addToCart: number;
  checkout: number;
  conversions: number;
}

export interface EngagementMetrics {
  sessionDuration: number;
  bounceRate: number;
  pagesPerSession: number;
  returnVisitors: number;
}

export interface Metrics {
  overview: MetricsOverview;
  timeSeries: MetricsTimeSeries;
  byChannel: ChannelMetrics[];
  funnel: FunnelMetrics;
  engagement: EngagementMetrics;
}

export type ApiResponse = Record<string, unknown>;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface ApiError {
  message: string;
  code: number;
  details?: unknown;
}
