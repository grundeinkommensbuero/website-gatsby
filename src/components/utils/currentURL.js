export const currentURL =
  typeof window !== 'undefined' ? window.location.href : '';

export const isMunicipalityPage = currentURL.includes('orte');
