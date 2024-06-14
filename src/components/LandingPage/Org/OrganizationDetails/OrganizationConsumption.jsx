import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
import MetricCard from '../../../Card/MetricCard';
import CourseCard from '../../../Card/CourseCard';
import CourseDetails from '../../../Card/CourseDetails';
import Skeletons from '../../../../components/Skeleton/Skeletons';

export default function OrganizationConsumption() {
  const [consumptionPageData, setConsumptionPageData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await organizationAPI.getConsumptionDetails();
        setConsumptionPageData(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const metrics = [
    { id: 1, title: 'Members : ', value: `${consumptionPageData?.metrics?.membersCount}` },
    { id: 2, title: 'Tasks :  ', value: `${consumptionPageData?.metrics?.tasksCount}` },
    { id: 3, title: 'Courses :  ', value: `${consumptionPageData?.metrics?.coursesCount}` },
    { id: 4, title: 'Contests :  ', value: `${consumptionPageData?.metrics?.contestsCount}` },
  ];

  const storageUsed = [
    {
      id: 1,
      title: 'Aggregate: ',
      value: `${consumptionPageData?.storageUsed?.aggregateStorage || '0'} GB`,
    },
    {
      id: 2,
      title: 'Consumed: ',
      value: `${consumptionPageData?.storageUsed?.consumedStorage || '0'} GB`,
    },
    {
      id: 3,
      title: 'Available: ',
      value: `${consumptionPageData?.storageUsed?.availableStorage || '0'} GB`,
    },
  ];

  const coursesData = consumptionPageData?.courses?.map((course) => ({
    id: `${course?.id}`,
    profilephoto: `${course?.imageUrl || ''}`,
    courseName: `${course?.title}`,
    percentage: `${course?.PercentageConsumedOfWholeOrganization || '0'}`,
  }));

  const selectedCourse =
    consumptionPageData?.courses?.find((course) => course.id === selectedCourseId) ||
    consumptionPageData?.courses?.[0];

  const courseDetails = selectedCourse
    ? [
        { id: 1, title: 'Data Consumed :', value: `${selectedCourse.consumedStorage}` },
        { id: 2, title: 'Enrolled Members :', value: `${selectedCourse.enrolledUsers}` },
        { id: 3, title: 'Ratings Received :', value: `${selectedCourse.ratings}` },
        { id: 4, title: 'No of videos : ', value: `${selectedCourse.videosCount}` },
      ]
    : [];

  const selectedCourse2 = selectedCourse
    ? {
        courseTitle: `${selectedCourse.title}`,
        Percentage: `${selectedCourse.PercentageConsumedOfWholeOrganization || 0}`,
      }
    : {};

  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: 'column', lg: 'row' },
          gap: '32px',
          width: '100%',
          justifyContent: 'space-evenly',
        }}
      >
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
          Align={'row'}
          Direction={'row'}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: 'column',
          gap: '12px',
          marginTop: '30px',
        }}
      >
        <Typography sx={{ fontSize: '24px' }}>Course Analytics</Typography>
        {consumptionPageData?.courses?.length > 0 ? (
          <Stack
            sx={{
              flexDirection: { xs: 'column', lg: 'row' },
              display: 'flex',
              justifyContent: 'space-evenly',
              gap: '20px',
            }}
          >
            <CourseCard
              Data={coursesData}
              setSelectedCourseId={setSelectedCourseId}
              selectedCourseId={selectedCourseId}
            />
            <CourseDetails
              Heading={selectedCourse2.courseTitle}
              Data={courseDetails}
              Border={true}
              Align={'row'}
              Direction={'column'}
              Progress={selectedCourse2.Percentage}
              Title={selectedCourse2.courseTitle}
            />
          </Stack>
        ) : (
          <Typography>No Courses Available now</Typography>
        )}
      </Stack>
    </Stack>
  );
}
