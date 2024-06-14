import TaskCard from '../TaskCard/TaskCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography } from '@mui/material';
import ButtonAddNew from '../../CreateAndEdit/ButtonAddNew';
import { useState, useEffect } from 'react';
import './TaskCarousel.css';
import getRoleForOrganization from '../../../../utils/GetUserRoleInOrganization';

const TaskCarousel = ({
  slidesToShow,
  slidesToScroll,
  isVertical,
  taskArray,
  isParentTask,
  title,
}) => {
  if (slidesToScroll === undefined) slidesToScroll = 1;
  if (slidesToShow === undefined) slidesToShow = 1;
  if (isVertical === undefined) isVertical = false;
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setRole(userRole);
    };
    getUserRole();
  }, []);
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    vertical: isVertical,
  };

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          mt: 1,
          display: '-webkit-box!important',
          WebkitLineClamp: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitBoxOrient: ' vertical',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: (role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') ? 'flex' : 'none',
          alignItems: 'center',
          width: 'auto',
          justifyContent: 'right',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <ButtonAddNew width="150px" display="block" isParentTask={isParentTask} />
      </Box>
      <Slider {...settings}>
        {taskArray?.map((task) => {
          return <TaskCard task={task} isParentTask={isParentTask} />;
        })}
      </Slider>
    </div>
  );
};

export default TaskCarousel;
