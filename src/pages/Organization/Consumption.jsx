import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import Typography from '@mui/material/Typography';
import Skeletons from '../../components/Skeleton/Skeletons';
import CourseCard from '../../components/Card/CourseCard';
import MetricCard from '../../components/Card/MetricCard';
import { Stack } from '@mui/material';
import CourseDetails from '../../components/Card/CourseDetails';
import OragnizationCard from '../../components/Card/OrganizationCard';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { getOrgName } from '../../utils/appendOrgQuery';

export default function Consumption() {
  const drawerWidth = 200;
  const [isLoading, setLoading] = useState(true);
  const [consumptionPageData, setConsumptionPageData] = useState([]);
  const [orgData, setOrgData] = useState(null);
  const orgName = getOrgName();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await organizationAPI.getConsumptionDetails();
      setConsumptionPageData(response);
      const res = await organizationAPI.getOrganizationById(response.organizationId);
      setOrgData(res.organizationData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const metrics = [
    {
      id: 1,
      title: 'Members : ',
      value: `${consumptionPageData?.metrics?.membersCount}`,
    },
    {
      id: 2,
      title: 'Tasks :  ',
      value: `${consumptionPageData?.metrics?.tasksCount}`,
    },
    {
      id: 3,
      title: 'Courses :  ',
      value: `${consumptionPageData?.metrics?.coursesCount}`,
    },
  ];
  const storageUsed = [
    {
      id: 1,
      title: 'Aggregate Data',
      value: `${consumptionPageData?.storageUsed?.aggregateStorage}`,
    },
    {
      id: 2,
      title: 'Data Consumed',
      value: `${consumptionPageData?.storageUsed?.consumedStorage}`,
    },
    {
      id: 3,
      title: 'Data Available',
      value: `${consumptionPageData?.storageUsed?.availableStorage}`,
    },
  ];
  const currentPlan = [
    {
      id: 1,
      title: 'Current Plan :',
      value: `${consumptionPageData?.currentPlan?.name}`,
    },
    {
      id: 2,
      title: 'X/Month :',
      value: `${consumptionPageData?.currentPlan?.price}`,
    },
    {
      id: 3,
      title: 'Validity : ',
      value: `${new Date(consumptionPageData.currentPlan?.validUpTo * 1000).toDateString()}`,
    },
  ];

  const [foundSelectedCourse, setFoundSelectedCourse] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const findSelectedCourse = (selectedCourseId) => {
    try {
      const foundCourse = consumptionPageData?.courses?.find(
        (course) => course?.id === selectedCourseId
      );
      setFoundSelectedCourse(foundCourse);
    } catch (error) {
      console.error('Error finding selected course:', error);
    }
  };

  useEffect(() => {
    findSelectedCourse(selectedCourseId);
  }, [selectedCourseId]);

  const selectedCourse2 =
    consumptionPageData?.courses && consumptionPageData.courses.length > 0
      ? {
          courseTitle: `${
            foundSelectedCourse?.title || consumptionPageData.courses[0]?.title || ''
          }`,
          Percentage: `${
            foundSelectedCourse?.PercentageConsumedOfWholeOrganization ||
            consumptionPageData.courses[0]?.PercentageConsumedOfWholeOrganization ||
            ''
          }`,
        }
      : {};

  const selectedCourse =
    consumptionPageData?.courses && consumptionPageData.courses.length > 0
      ? [
          {
            id: 1,
            title: 'Data Consumed :',
            value: `${
              foundSelectedCourse?.consumedStorage ||
              consumptionPageData.courses[0]?.consumedStorage ||
              'N/A'
            }`,
          },
          {
            id: 2,
            title: 'Enrolled Members :',
            value: `${
              foundSelectedCourse?.membersCount ||
              consumptionPageData.courses[0]?.membersCount ||
              'N/A'
            }`,
          },
          {
            id: 3,
            title: 'Ratings Received :',
            value: `${
              foundSelectedCourse?.rating || consumptionPageData.courses[0]?.rating || 'N/A'
            }`,
          },
          {
            id: 4,
            title: 'No of videos : ',
            value: `${
              foundSelectedCourse?.videosCount ||
              consumptionPageData.courses[0]?.videosCount ||
              'N/A'
            }`,
          },
        ]
      : [];

  const coursesData = consumptionPageData?.courses?.map((course) => ({
    id: `${course?.id}`,
    profilephoto: '',
    courseName: `${course?.title}`,
    percentage: `${course?.PercentageConsumedOfWholeOrganization}`,
  }));
  useDocumentTitle('ConsumptionPage');
  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <Box
      sx={{
        ml: { sm: `${drawerWidth}px` },
        display: 'flex',
        justifyContent: 'center',
        padding: '15px',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
            '@media (max-width: 1285px)': {
              flexDirection: 'column',
              justifyContent: 'center',
            },
            gap: '105px',
          }}
        >
          <Stack direction="column" gap="16px">
            <MetricCard
              Heading={'Metrices'}
              Data={metrics}
              Border={true}
              Align={'row'}
              Direction={'row'}
            />
            <MetricCard
              Heading={'Data Usage'}
              Data={storageUsed}
              Border={true}
              Align={'column'}
              Direction={'row'}
            />
          </Stack>
          <OragnizationCard
            Id={orgData.id}
            Name={orgData?.name}
            Desc={orgData?.description}
            Logo={orgData?.logoLink}
          />
          <MetricCard
            Heading={'Plans'}
            Data={currentPlan}
            ButtonText={'Upgrade Plan'}
            ButtonNavigateTo={`/org/${orgName}/plans`}
            Border={true}
            Align={'row'}
            Direction={'column'}
          />
        </Box>
        <Stack
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            gap: '16px',
          }}
        >
          <Typography
            sx={{
              color: '#000',
              fontFamily: 'Poppins',
              fontSize: { xs: '20px', sm: '24px' },
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: 'normal',
              mt: 5,
            }}
          >
            Course Analytics
          </Typography>
          <Stack
            sx={{
              flexDirection: { xs: 'column', lg: 'row' },
              justifyContent: 'space-between',
              width: '100%',
              gap: '28px',
              alignItems: 'center',
            }}
          >
            <CourseCard
              Data={coursesData}
              setSelectedCourseId={setSelectedCourseId}
              selectedCourseId={selectedCourseId}
            />
            <CourseDetails
              Heading={selectedCourse2.courseTitle}
              Data={selectedCourse}
              Border={true}
              Align={'row'}
              Direction={'column'}
              Progress={selectedCourse2.Percentage}
              Title={selectedCourse2.courseTitle}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
