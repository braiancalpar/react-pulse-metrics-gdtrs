export function sortCampaigns(campaigns: any[], key: string, direction: 'asc' | 'desc' = 'desc'): any[] {
  return [...campaigns].sort((a, b) => {
    const aVal = key.includes('.') ? key.split('.').reduce((obj, k) => obj?.[k], a) : a[key];
    const bVal = key.includes('.') ? key.split('.').reduce((obj, k) => obj?.[k], b) : b[key];
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}
