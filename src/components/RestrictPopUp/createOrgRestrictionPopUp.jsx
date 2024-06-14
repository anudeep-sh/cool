import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import restrictedUserImage from '../../assets/restrictedUserImage.svg';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';
import { eventEmitter } from '../../utils/eventEmitter';

function CreateOrgRestrictionPopUp() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const getRoleData = async () => {
    await getRoleForOrganization().then((res) => setUserRole(res));
  };
  const onOkayClick = () => {
    setOpen(false);
    navigate('/organization');
  };
  const closePopUp = () => {
    setOpen(false);
  };
  useEffect(() => {
    const showPopupHandler = () => {
      setOpen(true);
    };
    eventEmitter.on('showFreeOrgLimitRestrictionPopup', showPopupHandler);
    return () => {
      eventEmitter.off('showFreeOrgLimitRestrictionPopup', showPopupHandler);
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CloseIcon sx={{ cursor: 'pointer' }} onClick={closePopUp} />
            </div>
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
                Free Organizations Limit Reached
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
                You can only have one organization with free plan. Please Upgrade the Plan to add
                more organization.
              </Typography>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                {/* {userRole === 'CREATOR' && (
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: '20px',
                    }}
                    onClick={onViewPlansClick}
                  >
                    View Plans
                  </Button>
                )} */}
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

export default CreateOrgRestrictionPopUp;
