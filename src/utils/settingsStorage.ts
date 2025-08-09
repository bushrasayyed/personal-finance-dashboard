const SETTINGS_KEYS = {
  THEME: 'preferredTheme',
  CURRENCY: 'preferredCurrency',
  DATE_FORMAT: 'preferredDateFormat',
};

export const getTheme = () => localStorage.getItem(SETTINGS_KEYS.THEME) || 'light';
export const setTheme = (theme: string) => localStorage.setItem(SETTINGS_KEYS.THEME, theme);

export const getCurrency = () => localStorage.getItem(SETTINGS_KEYS.CURRENCY) || 'INR';
export const setCurrency = (currency: string) =>
  localStorage.setItem(SETTINGS_KEYS.CURRENCY, currency);

export const getDateFormat = () => localStorage.getItem(SETTINGS_KEYS.DATE_FORMAT) || 'DD/MM/YYYY';
export const setDateFormat = (format: string) =>
  localStorage.setItem(SETTINGS_KEYS.DATE_FORMAT, format);

export const clearAllSettings = () => {
  Object.values(SETTINGS_KEYS).forEach(key => localStorage.removeItem(key));
};
