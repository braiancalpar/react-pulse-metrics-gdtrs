// Deveria estar junto com calculateCTR.ts - junk drawer
export function calculateROI(revenue: number, cost: number): number {
  if (!cost) return 0;
  return ((revenue - cost) / cost) * 100;
}

export function calculateCAC(spend: number, acquisitions: number): number {
  if (!acquisitions) return 0;
  return spend / acquisitions;
}
