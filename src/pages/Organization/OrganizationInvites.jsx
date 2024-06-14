import React, { useEffect, useState } from 'react';
import SentReceivedInvites from '../../components/LandingPage/OrganizationInvites/SentReceivedInvites/SentReceivedInvites';
import SendInvites from '../../components/LandingPage/OrganizationInvites/SendInvites/SendInvites';
import MembersListComponent from '../../components/LandingPage/OrganizationInvites/InvitesMemberList/InvitesMemberList';
import InviteWithCode from '../../components/LandingPage/OrganizationInvites/InviteWithCode/InviteWithCode';
import '../../components/LandingPage/OrganizationInvites/OrganizationInvites.css';
import Skeletons from '../../components/Skeleton/Skeletons';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

export default function OrganizationInvites({ usedForSettings }) {
  const [isLoading, setLoading] = useState(true);

  const [organizationMembers, setOrganizationMembers] = useState([]);
  const [userRole, setUserRole] = useState([]);
  useDocumentTitle('Invite');
  const fetchOrganizationMembers = async () => {
    try {
      setLoading(true);
      const responseMemberList = await organizationAPI.getMembersList();
      setUserRole(responseMemberList.role);
      setOrganizationMembers(responseMemberList.members);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching suggested organizations:', error);
      setLoading(false);
    }
  };

  const [invitesSent, setInvitesSent] = useState([]);
  const [invitesRecieved, setInvitesReceived] = useState([]);

  const fetchInvitesSentByOrganization = async () => {
    try {
      setLoading(true);

      const responseInviteSent = await organizationAPI.getInvitesSentByOrganization();
      setInvitesSent(responseInviteSent);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching suggested organizations:', error);
      setLoading(false);
    }
  };
  const fetchInvitesReceivedByOrganization = async () => {
    try {
      setLoading(true);
      const responseInvitesReceived = await organizationAPI.getRequestsRecievedByOrganization();
      setInvitesReceived(responseInvitesReceived);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching suggested organizations:', error);
      setLoading(false);
    }
  };

  function fetchInvite() {
    fetchInvitesReceivedByOrganization();
    fetchInvitesSentByOrganization();
  }

  {
    useEffect(() => {
      fetchInvitesSentByOrganization();
      fetchInvitesReceivedByOrganization();
      fetchOrganizationMembers();
    }, []);
  }

  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <div className={usedForSettings ? 'OrganizationInvitesCon-Settings' : 'OrganizationInvitesCon'}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          justifyContent: 'space-evenly',
        }}
      >
        <div>
          <InviteWithCode code={12345} />
        </div>
        <div>
          <MembersListComponent
            organizationMembers={organizationMembers}
            userRole={userRole}
            fetchInvite={fetchInvite}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          justifyContent: 'space-evenly',
        }}
      >
        <div>
          <SentReceivedInvites
            DataFromApiInvites={invitesSent}
            DataFromApiRRequests={invitesRecieved}
          />
        </div>
        <div>
          <SendInvites />
        </div>
      </div>
    </div>
  );
}
