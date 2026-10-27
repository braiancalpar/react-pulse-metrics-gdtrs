import api from '../services/api';
import { campaignService } from '../services/campaignService';
import { MOCK_CAMPAIGNS } from '../mocks/campaigns';

jest.mock('../services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const apiGet = api.get as jest.Mock;
const apiPost = api.post as jest.Mock;
const apiPut = api.put as jest.Mock;
const apiDelete = api.delete as jest.Mock;

describe('campaignService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches campaigns with the supplied filters', async () => {
    const response = [{ id: 'campaign-1' }];
    apiGet.mockResolvedValue(response);

    await expect(campaignService.getAll({ status: 'active' })).resolves.toBe(response);
    expect(apiGet).toHaveBeenCalledWith('/campaigns', { params: { status: 'active' } });
  });

  it('returns mock campaigns when listing fails', async () => {
    apiGet.mockRejectedValue(new Error('API unavailable'));

    await expect(campaignService.getAll()).resolves.toBe(MOCK_CAMPAIGNS);
    expect(apiGet).toHaveBeenCalledWith('/campaigns', { params: undefined });
  });

  it('fetches a campaign by ID and falls back to matching mock data', async () => {
    const response = { id: 'remote-campaign' };
    apiGet.mockResolvedValueOnce(response);
    await expect(campaignService.getById('remote-campaign')).resolves.toBe(response);
    expect(apiGet).toHaveBeenCalledWith('/campaigns/remote-campaign');

    apiGet.mockRejectedValueOnce(new Error('API unavailable'));
    await expect(campaignService.getById(MOCK_CAMPAIGNS[0].id)).resolves.toBe(MOCK_CAMPAIGNS[0]);

    apiGet.mockRejectedValueOnce(new Error('API unavailable'));
    await expect(campaignService.getById('missing-campaign')).resolves.toBeNull();
  });

  it('delegates create, update, delete, and metrics requests to the API client', async () => {
    const data = { name: 'New campaign' };
    const created = { id: 'created-campaign', ...data };
    const updated = { id: 'campaign-1', ...data };
    apiPost.mockResolvedValue(created);
    apiPut.mockResolvedValue(updated);
    apiDelete.mockResolvedValue(undefined);
    apiGet.mockResolvedValue({ clicks: 20 });

    await expect(campaignService.create(data)).resolves.toBe(created);
    await expect(campaignService.update('campaign-1', data)).resolves.toBe(updated);
    await expect(campaignService.delete('campaign-1')).resolves.toBeUndefined();
    await expect(campaignService.getMetrics('campaign-1')).resolves.toEqual({ clicks: 20 });

    expect(apiPost).toHaveBeenCalledWith('/campaigns', data);
    expect(apiPut).toHaveBeenCalledWith('/campaigns/campaign-1', data);
    expect(apiDelete).toHaveBeenCalledWith('/campaigns/campaign-1');
    expect(apiGet).toHaveBeenCalledWith('/campaigns/campaign-1/metrics');
  });
});
