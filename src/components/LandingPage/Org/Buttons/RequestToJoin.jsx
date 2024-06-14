import React from 'react';
import '../SuggestedOrganizations.css';
import { handleAlert } from '../../../../utils/handleAlert';

import JoinIconWhite from '../../../../assets/LandingPage/Org/joinOrgWhiteIcon.svg';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';

export default function RequestToJoin({ disabled, OrganizationID }) {
  
  const handleJoinRequest = async (OrganizationID) => {
    try {
      await organizationAPI.requestToJoinOrganization(OrganizationID);
      handleAlert('Join request sent successfully', 'success');
    } catch (error) {
      console.error('Error sending join request:', error);
    }
  };
  return (
    <button
      className={`ViewOrg-orgsRequestBtn ${disabled ? 'ViewOrg-orgsRequestBtnDisabled' : ''}`}
      onClick={() => handleJoinRequest(OrganizationID)}
      disabled={disabled}
    >
      Request to Join
      <img src={JoinIconWhite} alt="" />
    </button>
  );
}
