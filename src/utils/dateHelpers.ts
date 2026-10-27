export function getDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export function getLastNDays(n: number): { startDate: string; endDate: string } {
  return {
    startDate: getDaysAgo(n),
    endDate: new Date().toISOString().split('T')[0],
  };
}

export function isDateInRange(date: string, start: string, end: string): boolean {
  return date >= start && date <= end;
}

// Adicionado depois, sem padronizar com as outras funções acima
export const today = () => new Date().toISOString().split('T')[0];
export const yesterday = () => getDaysAgo(1);
