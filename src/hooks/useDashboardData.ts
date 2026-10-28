import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns } from "../redux/actions/campaignActions";
import { fetchMetrics } from "../redux/actions/metricsActions";
import { setFilter } from "../redux/actions/filterActions";
import { MOCK_CAMPAIGNS } from "../mocks/campaigns";
import { mockMetrics } from "../mocks/metrics";
import type { Campaign } from "../types/api";
import { RootState } from "@/redux/store";

interface DashboardFilters {
  status: string;
  dateRange: string;
  search: string;
  channel: string;
}

const dateRangeDays: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90 };

export function useDashboardData() {
  const dispatch = useDispatch();
  const reduxCampaigns: Campaign[] =
    useSelector((state: RootState) => state.campaigns.list) ?? [];
  const reduxTimeSeries = useSelector(
    (state: RootState) => state.metrics.timeSeries,
  );
  const reduxByChannel = useSelector(
    (state: RootState) => state.metrics.byChannel,
  );

  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DashboardFilters>({
    status: "all",
    dateRange: "all",
    search: "",
    channel: "all",
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dispatch(fetchCampaigns(filters)),
      dispatch(fetchMetrics({})),
    ]).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.dateRange, filters.search, filters.channel]); // sem JSON.stringify

  const handleFilterChange = useCallback(
    (field: keyof DashboardFilters, value: string) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
      dispatch(setFilter(field, value));
    },
    [dispatch],
  );

  const campaignList = [
    ...(reduxCampaigns.length > 0 ? reduxCampaigns : MOCK_CAMPAIGNS),
  ];

  const filteredCampaigns = campaignList.filter((campaign) => {
    if (filters.status !== "all" && campaign.status !== filters.status)
      return false;
    if (
      filters.search &&
      !campaign.name.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    if (filters.channel !== "all" && campaign.channel !== filters.channel)
      return false;
    const days = dateRangeDays[filters.dateRange];
    if (days) {
      const rangeStart = new Date();
      rangeStart.setDate(rangeStart.getDate() - days);
      const start = campaign.startDate ? new Date(campaign.startDate) : null;
      if (!start || start < rangeStart) return false;
    }
    return true;
  });

  // Cálculos de métricas — saem do render e ficam no hook
  const totalImpressions = filteredCampaigns.reduce(
    (sum, c) => sum + (c.metrics?.impressions ?? 0),
    0,
  );
  const totalClicks = filteredCampaigns.reduce(
    (sum, c) => sum + (c.metrics?.clicks ?? 0),
    0,
  );
  const totalConversions = filteredCampaigns.reduce(
    (sum, c) => sum + (c.metrics?.conversions ?? 0),
    0,
  );
  const totalSpend = filteredCampaigns.reduce(
    (sum, c) => sum + (c.spent ?? 0),
    0,
  );
  const avgCTR =
    totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const avgCVR = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  const timeSeriesData = (
    reduxTimeSeries?.clicks ?? mockMetrics.timeSeries.clicks
  ).slice(-30);
  const byChannelData =
    reduxByChannel?.length > 0 ? reduxByChannel : mockMetrics.byChannel;

  return {
    loading,
    filters,
    filteredCampaigns,
    campaignList,
    timeSeriesData,
    byChannelData,
    metrics: {
      totalImpressions,
      totalClicks,
      totalConversions,
      totalSpend,
      avgCTR,
      avgCVR,
    },
    handleFilterChange,
  };
}
