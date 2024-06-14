import { Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UtilFunctions from '../UtilFunctions';
import getRoleForOrganization from '../../../../utils/GetUserRoleInOrganization';
import { useEffect, useState } from 'react';

const BtnViewFile = ({ subtaskId, taskProgress, url, btnText }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setRole(userRole);
    };
    getUserRole();
  }, []);
  const fileUrl =
    (role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR')
      ? UtilFunctions.getFileUrl(subtaskId, taskProgress)
      : url;

  const handleViewSubmission = () => {
    const anchorTag = document.createElement('a');
    anchorTag.href = fileUrl;
    anchorTag.setAttribute('target', '_blank');
    document.body.appendChild(anchorTag);
    anchorTag.click();
    anchorTag.remove();
  };

  return (
    <>
      {fileUrl ? (
        <Button
          onClick={handleViewSubmission}
          endIcon={<ChevronRightIcon />}
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none !important',
            display: 'flex',
            flexGrow: !role && 1,
          }}
        >
          {btnText}
        </Button>
      ) : (
        <Button
          disabled
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          size="small"
          sx={{
            textTransform: 'none !important',
            display: 'flex',
            flexGrow: !role && 1,
            opacity: 1,
            color: 'gray',
            borderColor: 'rgba(0, 0, 0, 0.12)',
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {btnText}
        </Button>
      )}
    </>
  );
};

export default BtnViewFile;
