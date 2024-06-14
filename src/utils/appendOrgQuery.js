const getOrgName = () => {
  const currentUrl = window.location.href;
  const parsedUrl = new URL(currentUrl);
  const pathname = parsedUrl.pathname;
  const pathParts = pathname.split('/');
  const indexOfOrg = pathParts.indexOf('org');
  if (indexOfOrg !== -1 && indexOfOrg < pathParts.length - 1) {
    return pathParts[indexOfOrg + 1];
  } else {
    return null;
  }
};
const orgFlag = () => {
  const org = getOrgName();
  if (org) {
    return '?organization=true';
  }
  return '';
};
export { getOrgName, orgFlag };
