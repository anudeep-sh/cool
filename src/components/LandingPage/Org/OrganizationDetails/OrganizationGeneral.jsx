import React, { useEffect, useState } from 'react';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
import { courseAPI } from '../../../../api/requests/courses/courseAPI';
import MembersListComponent from '../../../../components/LandingPage/OrganizationInvites/InvitesMemberList/InvitesMemberList';
import OragnizationCard from '../../../Card/OrganizationCard';
import Product from '../../../ProductCarousel/Product';
import { Stack } from '@mui/material';
import InfoCard from '../../../Card/InfoCard';
import { getOrgName } from '../../../../utils/appendOrgQuery';
import SettingsContestComponent from '../../../../pages/Contest/SettingsContestComponent';
import Skeletons from '../../../../components/Skeleton/Skeletons';

export default function OrganizationGeneralPage({ userRole, setorgImageStatus, orgImageStatus }) {
  const [isLoading, setLoading] = useState(true);
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const [orgData, setOrgData] = useState(null);
  const [consumptionPageData, setConsumptionPageData] = useState([]);
  const [isUserProfileInProduct, setIsUserProfileInProduct] = useState(true);
  const [courses, setCourses] = useState();
  const [invitesSent, setInvitesSent] = useState([]);
  const [invitesReceived, setInvitesReceived] = useState([]);

  const orgName = getOrgName();

  useEffect(() => {
    fetchData();
    fetchOrganizationMembers();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      await getCourses();
      setLoading(false);
    };
    getAllData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await organizationAPI.getOrganizationById();
      setOrgData(res.organizationData);
      setConsumptionPageData(res.currentPlan);
      setLoading(false);
    } catch (error) {
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

  const fetchInvite = () => {
    fetchInvitesReceivedByOrganization();
    fetchInvitesSentByOrganization();
  };

  const getCourses = async () => {
    try {
      setLoading(true);
      const data = await courseAPI.getUserCourses(0);
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const formatStorageValue = (storageInMB) => {
    if (storageInMB !== undefined && !isNaN(storageInMB)) {
      return (storageInMB / 1024).toFixed(2);
    }
    return 'N/A';
  };

  const currentPlan = [
    {
      id: 1,
      title: 'Plan :',
      value: `${consumptionPageData?.name}`,
    },
    {
      id: 2,
      title: 'Status :',
      value: `${consumptionPageData?.status}`,
    },
    {
      id: 3,
      title: 'Validity : ',
      value: `${
        consumptionPageData?.validUpTo === 0
          ? 'Unlimited'
          : new Date(parseInt(consumptionPageData?.validUpTo)).toDateString()
      }`,
    },
    {
      id: 4,
      title: 'Storage : ',
      value: `${formatStorageValue(consumptionPageData?.storage)} GB`,
    },
    {
      id: 5,
      title: 'Users : ',
      value: `${consumptionPageData?.users}`,
    },
    {
      id: 6,
      title: 'Public Contests : ',
      value: `${consumptionPageData?.contests_public}`,
    },
    {
      id: 7,
      title: 'Organization Contests : ',
      value: `${consumptionPageData?.contests_organization}`,
    },
  ];

  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <Stack sx={{ gap: '16px', flexDirection: 'column' }}>
      <Stack sx={{ flexDirection: { xs: 'column', lg: 'row' }, gap: '32px' }}>
        <Stack height="370px">
          <MembersListComponent
            organizationMembers={organizationMembers}
            userRole={userRole}
            fetchInvite={fetchInvite}
          />
        </Stack>
        {orgData && (
          <OragnizationCard
            Id={orgData?.id}
            Name={orgData?.name}
            Desc={orgData?.description}
            Logo={orgData?.logoLink}
            Visibility={orgData?.visibility}
            fetchData={fetchData}
            setorgImageStatus={setorgImageStatus}
            orgImageStatus={orgImageStatus}
          />
        )}
        <InfoCard
          Heading={'Current Plan'}
          Data={currentPlan}
          ButtonText={'Upgrade Plan'}
          ButtonNavigateTo={`/org/${orgName}/plans`}
          Border={true}
          Align={'row'}
          Direction={'column'}
        />
      </Stack>
      <Product
        title={'Courses available in your organization'}
        dataRender={courses}
        loading={isLoading}
        isEditable={true}
        isUserProfileInProduct={isUserProfileInProduct}
        getCourses={getCourses}
        courses={courses}
      />
      <SettingsContestComponent />
    </Stack>
  );
}
