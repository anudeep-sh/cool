import { getOrgName } from './appendOrgQuery';
import { organizationAPI } from '../api/requests/organization/organizationAPI';

const getRoleForOrganization = async () => {
  const fetchUserRole = async (org) => {
    const response = await organizationAPI.getOrgRole(org);
    return response;
  };
  const orgName = getOrgName();
  try {
    if(orgName){
      const response = await fetchUserRole(orgName);
      if (response) {
        return response.role;
      } else {
        throw new Error('Organization data not found');
      }
    }
  } catch (error) {
    localStorage.clear()
    console.error('Error in useRoleForOrg:', error);
    window.location.replace('/dashboard')
    // return null;
  }
};

export default getRoleForOrganization;
