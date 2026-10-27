import { formatDate } from '../utils/formatDate';

describe('formatDate', () => {
  it('formata data no padrão brasileiro', () => {
    const result = formatDate('2024-01-15T12:00:00');
    expect(result).toBe('15/01/2024');
  });

  it('retorna string vazia para data inválida', () => {
    const result = formatDate('');
    expect(result).toBe('');
  });

  it('formata data com hora', () => {
    const result = formatDate('2024-01-15T10:30:00');
    expect(typeof result).toBe('string');
  });
});
