import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ButtonGoTo = ({ taskType, courseId, contestId, orgName }) => {
  const goToID = taskType === 'course' ? courseId : contestId;
  const navigate = useNavigate();
  const handleGoTo = () => {
    if (taskType === 'course') navigate(`/org/${orgName}/course/videos/${goToID}`);
    else navigate(`/org/${orgName}/contest/${goToID}`);
  };
  return (
    <Button
      onClick={handleGoTo}
      size="small"
      variant="contained"
      sx={{
        textTransform: 'none !important',
      }}
      endIcon={<ChevronRightIcon />}
    >
      Go to {taskType}
    </Button>
  );
};

export default ButtonGoTo;
