import { Backdrop, Stack, CircularProgress } from '@mui/material';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
import { useState, useEffect } from 'react';
import SentReceivedInvites from '../../OrganizationInvites/SentReceivedInvites/SentReceivedInvites';
import InviteWithCode from '../../OrganizationInvites/InviteWithCode/InviteWithCode';
import MembersListComponent from '../../../../components/LandingPage/OrganizationInvites/InvitesMemberList/InvitesMemberList';
import Skeletons from '../../../../components/Skeleton/Skeletons';

export default function OrganizationInvite({ userRole }) {
  const [isLoading, setLoading] = useState(false);
  const [invitesSent, setInvitesSent] = useState([]);
  const [invitesRecieved, setInvitesReceived] = useState([]);
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const [orgData, setOrgData] = useState([]);

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
  const fetchOrganizationMembers = async () => {
    try {
      setLoading(true);
      const responseMemberList = await organizationAPI.getMembersList();
      setOrganizationMembers(responseMemberList.members);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching suggested organizations:', error);
      setLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      await organizationAPI.getOrganizationById().then((res) => {
        setOrgData(res.organizationData);
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  function fetchInvite() {
    fetchInvitesReceivedByOrganization();
    fetchInvitesSentByOrganization();
  }

  useEffect(() => {
    fetchOrganizationMembers();
    fetchData();
    fetchInvite();
  }, []);

  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <Stack
      gap="16px"
      sx={{ flexDirection: { md: 'row' }, alignItems: { xs: 'center', sm: 'normal' } }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '350px',
          width: { xs: '100%', lg: '80%' },
          alignItems: { xs: 'center', sm: 'normal' },
        }}
      >
        <InviteWithCode code={orgData?.code} />
        <Stack height="400px">
          <MembersListComponent
            organizationMembers={organizationMembers}
            userRole={userRole}
            fetchInvite={fetchInvite}
          />
        </Stack>
      </Stack>
      <Stack sx={{ width: '100%' }}>
        <SentReceivedInvites
          DataFromApiInvites={invitesSent}
          DataFromApiRRequests={invitesRecieved}
        />
      </Stack>
    </Stack>
  );
}
