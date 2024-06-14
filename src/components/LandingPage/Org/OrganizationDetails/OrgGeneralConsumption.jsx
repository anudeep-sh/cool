import { Stack, Typography, Backdrop, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import CourseCard from '../../../Card/CourseCard';
import CourseDetails from '../../../Card/CourseDetails';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
import Skeletons from '../../../../components/Skeleton/Skeletons';

export default function OrganizationGeneralConsumption() {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [consumptionPageData, setConsumptionPageData] = useState([]);
  const [foundSelectedCourse, setFoundSelectedCourse] = useState('');
  const [isLoading, setLoading] = useState(false);

  const selectedCourse =
    consumptionPageData?.courses && consumptionPageData.courses.length > 0
      ? [
          {
            id: 1,
            title: 'Data Consumed :',
            value: `${
              foundSelectedCourse?.consumedStorage ||
              consumptionPageData.courses[0]?.consumedStorage
            }`,
          },
          {
            id: 2,
            title: 'Enrolled Members :',
            value: `${
              foundSelectedCourse?.enrolledUsers || consumptionPageData.courses[0]?.enrolledUsers
            }`,
          },
          {
            id: 3,
            title: 'Ratings Received :',
            value: `${foundSelectedCourse?.ratings || consumptionPageData.courses[0]?.ratings}`,
          },
          {
            id: 4,
            title: 'No of videos : ',
            value: `${
              foundSelectedCourse?.videosCount || consumptionPageData.courses[0]?.videosCount
            }`,
          },
        ]
      : [];
  const coursesData = consumptionPageData?.courses?.map((course) => ({
    id: `${course?.id}`,
    profilephoto: `${course?.imageUrl ? course?.imageUrl : ''}`,
    courseName: `${course?.title}`,
    percentage: `${
      course?.PercentageConsumedOfWholeOrganization
        ? course?.PercentageConsumedOfWholeOrganization
        : '0'
    }`,
  }));

  const selectedCourse2 =
    consumptionPageData?.courses && consumptionPageData.courses.length > 0
      ? {
          courseTitle: `${foundSelectedCourse?.title || consumptionPageData.courses[0]?.title}`,
          Percentage: `${
            foundSelectedCourse?.PercentageConsumedOfWholeOrganization ||
            consumptionPageData.courses[0]?.PercentageConsumedOfWholeOrganization ||
            0
          }`,
        }
      : {};

  const findSelectedCourse = (selectedCourseId) => {
    try {
      const foundCourse = consumptionPageData?.courses?.find(
        (course) => course?.id === selectedCourseId
      );
      setFoundSelectedCourse(foundCourse);
    } catch (error) {}
  };

  async function fetchData() {
    try {
      setLoading(true);
      const res = await organizationAPI.getConsumptionDetails();
      setLoading(false);
      setConsumptionPageData(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    findSelectedCourse(selectedCourseId);
  }, [selectedCourseId]);

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <Stack sx={{ minHeight: '80vh', gap: '20px' }}>
      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>Course Analytics</Typography>
      {consumptionPageData?.courses?.length > 0 ? (
        <Stack sx={{ flexDirection: { xs: 'column', lg: 'row' }, gap: '8px' }}>
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
      ) : (
        <Typography>No Courses Available now</Typography>
      )}
    </Stack>
  );
}
