import { Stack, Tab, Typography } from '@mui/material';
import OrganizationGeneralPage from '../../components/LandingPage/Org/OrganizationDetails/OrganizationGeneral';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState, useEffect } from 'react';
import OrganizationInvite from '../../components/LandingPage/Org/OrganizationDetails/OrganizationInvite';
import OrganizationConsumption from '../../components/LandingPage/Org/OrganizationDetails/OrganizationConsumption';
import OrganizationTransactions from '../../components/LandingPage/Org/OrganizationDetails/OrganizationTransactions';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';
import OrganizationAdminGeneral from '../../components/LandingPage/Org/OrganizationDetails/OrgAdminGeneral';
import OrganizationGeneralConsumption from '../../components/LandingPage/Org/OrganizationDetails/OrgGeneralConsumption';

export default function OrganizationSetting({ setorgImageStatus, orgImageStatus }) {
  const TabArray = [
    {
      value: '1',
      label: 'General',
      role: ['CREATOR', 'SUPERADMIN'],
    },
    {
      value: '2',
      label: 'Invites',
      role: ['CREATOR', 'SUPERADMIN'],
    },
    {
      value: '3',
      label: 'Consumption',
      role: ['CREATOR', 'SUPERADMIN'],
    },
    {
      value: '4',
      label: 'General',
      role: ['ADMIN', null],
    },
    {
      value: '6',
      label: 'Transactions',
      role: ['CREATOR'],
    },
  ];

  const [value, setValue] = useState('1');
  const [selectedArray, setSelectedArray] = useState(null);
  const [userRole, setUserRole] = useState('');
  const drawerWidth = 200;

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setUserRole(userRole);
      const res = TabArray.filter((r) => r.role.includes(userRole));
      setSelectedArray(res);
      setValue(res[0].value);
    };
    getUserRole();
  }, []);

  return (
    <Stack
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        mt: { xs: '25px', sm: '16px' },
        padding: '4px',
      }}
    >
      <TabContext value={value}>
        <Typography
          sx={{
            paddingLeft: { xs: '0px', sm: '24px' },
            fontSize: { xs: '18px', sm: '20px', md: '24px' },
            fontWeight: '600',
            marginBottom: '16px',
          }}
        >
          Organization Settings
        </Typography>
        <TabList
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ paddingLeft: { xs: '0px', sm: '24px' }, overflowX: 'scroll' }}
          indicatorColor="none"
          variant="scrollable"
        >
          {selectedArray?.map((x) => (
            <Tab
              key={x.value}
              value={x.value}
              label={x.label}
              sx={{
                backgroundColor: x.value === value ? '#fff' : '#F6F5F7',
                boxShadow: x.value === value ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none',
                padding: '0 36px',
                fontWeight: '600',
                fontSize: { xs: '14px', sm: '16px' },
                clipPath: 'polygon(10% 0, 91% 0, 100% 100%, 0% 100%)',
                borderRadius: '40px 40px 0px 0px',
                width: '200px',
              }}
            />
          ))}
        </TabList>
        <TabPanel
          value="1"
          sx={{
            padding: { xs: '4px !important', sm: '0px 24px !important' },
          }}
        >
          <Stack
            sx={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              padding: '12px',
              borderRadius: '0px 12px 12px',
            }}
          >
            <OrganizationGeneralPage
              userRole={userRole}
              orgImageStatus={orgImageStatus}
              setorgImageStatus={setorgImageStatus}
            />
          </Stack>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: { xs: '4px !important', sm: '0px 24px !important' } }}>
          <Stack
            sx={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              padding: '12px',
              borderRadius: '0px 12px 12px',
              height: '80%',
            }}
          >
            <OrganizationInvite sedForSettings={true} userRole={userRole} />
          </Stack>
        </TabPanel>
        <TabPanel value="3" sx={{ padding: { xs: '4px !important', sm: '0px 24px !important' } }}>
          <Stack
            sx={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              padding: '12px',
              borderRadius: '0px 12px 12px',
            }}
          >
            <OrganizationConsumption />
          </Stack>
        </TabPanel>
        <TabPanel value="4" sx={{ padding: { xs: '4px !important', sm: '0px 24px !important' } }}>
          <Stack
            sx={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              padding: '12px',
              borderRadius: '0px 12px 12px',
            }}
          >
            <OrganizationAdminGeneral />
          </Stack>
        </TabPanel>
        <TabPanel value="5" sx={{ padding: { xs: '4px !important', sm: '0px 24px !important' } }}>
          <Stack
            sx={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              padding: '12px',
              borderRadius: '0px 12px 12px',
            }}
          >
            <OrganizationGeneralConsumption />
          </Stack>
        </TabPanel>
        <TabPanel value="6" sx={{ padding: { xs: '4px !important', sm: '0px 24px !important' } }}>
          <Stack
            sx={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              padding: '12px',
              borderRadius: '0px 12px 12px',
            }}
          >
            <OrganizationTransactions />
          </Stack>
        </TabPanel>
      </TabContext>
    </Stack>
  );
}
