import { Backdrop, Button, CircularProgress, Modal, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
import { courseAPI } from '../../../../api/requests/courses/courseAPI';
import Product from '../../../ProductCarousel/Product';
import { useEffect } from 'react';
import GeneralCard from '../../../Card/GeneralCard';
import getRoleForOrganization from '../../../../utils/GetUserRoleInOrganization';
import { handleAlert } from '../../../../utils/handleAlert';

import { useNavigate } from 'react-router-dom';

export default function OrganizationAdminGeneral() {
  const [orgData, setOrgData] = useState([]);
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(false);
  const [isUserProfileInProduct, setIsUserProfileInProduct] = useState(true);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  async function getOrgData() {
    try {
      setLoading(true);
      await organizationAPI.getOrganizationById().then((res) => {
        setOrgData(res.organizationData);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }

  async function getCourses() {
    try {
      setLoading(true);
      const data = await courseAPI.getUserCourses(0);
      setCourses(data && data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourses();
    getOrgData();
  }, []);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setRole(userRole);
    };
    getUserRole();
  }, []);

  async function leaveOrganization() {
    try {
      await organizationAPI.leaveOrg().then((res) => handleAlert(`${res}`, 'success'));
      navigate('/organization');
    } catch (err) {
      handleAlert('Unable to leave organization', 'error');
    }
  }

  return (
    <Stack sx={{ gap: '12px' }}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { sm: '400px' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            gap: '8px',
          }}
        >
          <Typography>Do you want to leave this Organization {orgData?.name} ?</Typography>
          <Stack sx={{ flexDirection: 'row', width: '100%', gap: '8px' }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ borderRadius: '8px', textTransform: 'none' }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ borderRadius: '8px', textTransform: 'none', backgroundColor: '#93A9FA' }}
              onClick={leaveOrganization}
            >
              Ok
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <GeneralCard
        name={orgData?.name}
        desc={orgData?.description}
        logo={orgData?.logoLink}
        visibility={orgData?.visibility}
        setOpen={setOpen}
      />
      {role === 'ADMIN' && (
        <Product
          title={'Courses available in your organization'}
          dataRender={courses}
          loading={loading}
          isEditable={true}
          isUserProfileInProduct={isUserProfileInProduct}
          getCourses={getCourses}
          courses={courses}
        />
      )}
    </Stack>
  );
}
