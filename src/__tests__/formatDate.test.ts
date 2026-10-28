import { dateToString, formatDate, formatDateLong, formatDateRange } from '../utils/formatDate';

describe('formatDate', () => {
  it('formats strings and Date objects with the Brazilian locale', () => {
    expect(formatDate('2024-01-15T12:00:00')).toBe('15/01/2024');
    expect(formatDate(new Date(2024, 0, 15, 12))).toBe('15/01/2024');
  });

  it('returns an empty string for an empty date', () => {
    expect(formatDate('')).toBe('');
  });

  it('formats long dates, individual date values, and ranges explicitly', () => {
    expect(formatDateLong('2024-01-15T12:00:00')).toBe('15 de janeiro de 2024');
    expect(formatDateLong('')).toBe('');
    expect(dateToString('2024-01-15T12:00:00')).toBe('15/01/2024');
    expect(dateToString(null)).toBe('-');
    expect(formatDateRange('2024-01-15T12:00:00', '2024-01-31T12:00:00'))
      .toBe('15/01/2024 - 31/01/2024');
  });
});
