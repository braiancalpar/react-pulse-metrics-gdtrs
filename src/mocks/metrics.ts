// Gera série temporal de 90 dias para gráficos
function generateTimeSeries(days: number, baseValue: number, variance: number) {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const value = Math.round(baseValue + (Math.random() - 0.5) * variance);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, value),
    });
  }
  return data;
}

export const mockMetrics = {
  overview: {
    totalImpressions: 18750000,
    totalClicks: 451250,
    totalConversions: 22050,
    totalSpent: 271100,
    averageCTR: 2.41,
    averageROAS: 3.6,
    totalRevenue: 975960,
  },
  timeSeries: {
    impressions: generateTimeSeries(90, 200000, 80000),
    clicks: generateTimeSeries(90, 5000, 2000),
    conversions: generateTimeSeries(90, 250, 100),
    revenue: generateTimeSeries(90, 12000, 5000),
    ctr: generateTimeSeries(90, 2.5, 1.0),
  },
  byChannel: [
    { channel: 'Google', impressions: 7200000, clicks: 180000, conversions: 9000, spent: 105000 },
    { channel: 'Meta', impressions: 6500000, clicks: 156000, conversions: 7800, spent: 89000 },
    { channel: 'Email', impressions: 262000, clicks: 27000, conversions: 1700, spent: 8100 },
    { channel: 'Orgânico', impressions: 320000, clicks: 16000, conversions: 480, spent: 3200 },
    { channel: 'YouTube', impressions: 2100000, clicks: 21000, conversions: 630, spent: 15600 },
    { channel: 'TikTok', impressions: 3200000, clicks: 48000, conversions: 960, spent: 9500 },
    { channel: 'LinkedIn', impressions: 185000, clicks: 3700, conversions: 185, spent: 11200 },
    { channel: 'Outros', impressions: 650000, clicks: 16250, conversions: 813, spent: 29500 },
  ],
  funnel: {
    impressions: 18750000,
    clicks: 451250,
    landingPageViews: 360000,
    addToCart: 108000,
    checkout: 54000,
    conversions: 22050,
  },
  engagement: {
    sessionDuration: 248,
    bounceRate: 42.3,
    pagesPerSession: 3.8,
    returnVisitors: 38.5,
  },
};

export const MOCK_METRICS = mockMetrics;
export default mockMetrics;
