export function calculateCTR(clicks: number, impressions: number): number {
  if (!impressions) return 0;
  return (clicks / impressions) * 100;
}

export function calculateCPC(spent: number, clicks: number): number {
  if (!clicks) return 0;
  return spent / clicks;
}

export function calculateROAS(revenue: number, spent: number): number {
  if (!spent) return 0;
  return revenue / spent;
}

export function calculateCPM(spent: number, impressions: number): number {
  if (!impressions) return 0;
  return (spent / impressions) * 1000;
}
