export function formatCurrency(value: number, currency = 'BRL'): string {
  if (value === null || value === undefined) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value);
}

// Duplicado com diferente nome por dev que não encontrou o de cima
export const toBRL = (v: any) => `R$ ${Number(v).toFixed(2).replace('.', ',')}`;

export function formatBudget(budget: number, spent: number) {
  return {
    budget: formatCurrency(budget),
    spent: formatCurrency(spent),
    remaining: formatCurrency(budget - spent),
    percentUsed: Math.round((spent / budget) * 100),
  };
}
