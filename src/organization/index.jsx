import { organizationAPI } from '../api/requests/organization/organizationAPI';

export const getOrgDomain = () => {
  const url = window.location.hostname;
  if (url.includes('optigrit.com') || url.includes('localhost')) {
    const urlSplit = url.split('.');
    if (urlSplit.length > 1) {
      if (urlSplit[0] === 'optigrit') return '';
      return urlSplit[0];
    } else return '';
  } else return '';
};

export const getOrgData = async () => {
  const domain = getOrgDomain();
  if (!domain) return null;
  const domainData = await organizationAPI.searchOrganization(domain);
  if (domainData.length === 0) {
    return null;
  }
  return domainData[0];
};
