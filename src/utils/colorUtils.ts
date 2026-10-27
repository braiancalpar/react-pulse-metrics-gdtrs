export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const STATUS_COLORS: Record<string, string> = {
  active: '#10b981',
  paused: '#f59e0b',
  ended: '#6b7280',
  draft: '#3b82f6',
  error: '#ef4444',
};
