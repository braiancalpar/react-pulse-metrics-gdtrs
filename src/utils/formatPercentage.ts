export function formatPercentage(value: number, decimals = 1): string {
  if (value === null || value === undefined) return '0%';
  return `${value.toFixed(decimals)}%`;
}

export const toPercent = (v: any) => `${Number(v).toFixed(2)}%`; // duplicado!
