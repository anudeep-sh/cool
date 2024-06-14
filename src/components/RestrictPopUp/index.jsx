import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import restrictedUserImage from '../../assets/restrictedUserImage.svg';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';
import { eventEmitter } from '../../utils/eventEmitter';
import { getOrgName } from '../../utils/appendOrgQuery';

function StorageRestrictPopUp() {
  const orgName = getOrgName();
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const getRoleData = async () => {
    await getRoleForOrganization().then((res) => setUserRole(res));
  };
  const onOkayClick = () => {
    setOpen(false);
  };
  const onViewPlansClick = () => {
    setOpen(false);
    navigate(`org/${orgName}/plans`);
  };

  useEffect(() => {
    const showPopupHandler = () => {
      setOpen(true);
    };
    eventEmitter.on('showStorageLimitRestrictionPopup', showPopupHandler);
    return () => {
      eventEmitter.off('showStorageLimitRestrictionPopup', showPopupHandler);
    };
  }, []);

  useEffect(() => {
    getRoleData();
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.classList.remove('View-open');
    };
  }, []);
  return (
    open && (
      <div>
        <div className="View" ref={popupRef}>
          <div className="View-main-restricted">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: {
                    xs: '25px',
                    sm: '35px',
                  },
                }}
              >
                Plan Limit Reached
              </Typography>
              <img className="restrictionPageImage" src={restrictedUserImage} alt="" />
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: {
                    xs: '18px',
                    sm: '20px',
                  },
                }}
              >
                Please Contact Your Organization Owner to Upgrade the Plan
              </Typography>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                {userRole === 'CREATOR' && (
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: '20px',
                    }}
                    onClick={onViewPlansClick}
                  >
                    View Plans
                  </Button>
                )}
                <Button
                  variant="contained"
                  sx={{
                    marginTop: '20px',
                  }}
                  onClick={onOkayClick}
                >
                  Okay
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    )
  );
}

export default StorageRestrictPopUp;
