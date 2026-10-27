// Três formas diferentes de formatar data no mesmo arquivo - junk drawer
export function formatDate(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

export function formatDateLong(date: string | Date): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

// Adicionado depois por dev diferente, sem saber que formatDate já existia
export const dateToString = (d: any) => {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('pt-BR');
};

export function formatDateRange(start: string, end: string): string {
  return `${formatDate(start)} - ${formatDate(end)}`;
}
