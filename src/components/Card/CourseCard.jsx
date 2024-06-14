import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';
import DefaultCourseProfile from '../../assets/CourseImages/DefaultCourseProfile.svg';

export default function CourseCard({ Data, setSelectedCourseId, selectedCourseId }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '300px',
        width: { xs: '100%', lg: '50%' },
        overflow: 'scroll',
        borderRadius: '30px',
        background: '#FFF',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.35)',
        p: 3,
        gap: '10px',
      }}
    >
      {Data?.map((course, index) => (
        <Box
          key={course?.id}
          sx={{
            display: 'flex',
            gap: '15px',
            borderRadius: '15px',
            background:
              selectedCourseId === course?.id || (index === 0 && !selectedCourseId)
                ? 'rgba(199, 211, 255, 0.50)'
                : '#FFF',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
            p: 1.5,
            pr: 3,
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedCourseId(course?.id);
          }}
        >
          <img
            style={{
              width: '81px',
              height: '75px',
            }}
            src={course?.profilephoto || DefaultCourseProfile}
            alt=""
          />
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              width: '70%',
            }}
          >
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
              <Typography
                sx={{
                  color: '#000',
                  fontFamily: 'Poppins',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                {course?.courseName}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontFamily: 'Poppins',
                  fontSize: '10px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                {course?.percentage}%
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <LinearProgress
                variant="determinate"
                value={course?.percentage}
                sx={{ height: '10px', borderRadius: '80px' }}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
