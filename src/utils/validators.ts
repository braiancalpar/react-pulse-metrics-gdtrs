export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isRequired(value: any): boolean {
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
}
