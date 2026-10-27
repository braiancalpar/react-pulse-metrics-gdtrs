// Duplica lógica que já existe no campaignService - junk drawer
export function filterCampaigns(campaigns: any[], filters: any): any[] {
  return campaigns.filter(c => {
    if (filters.status && filters.status !== 'all' && c.status !== filters.status) return false;
    if (filters.channel && filters.channel !== 'all' && c.channel !== filters.channel) return false;
    if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}
