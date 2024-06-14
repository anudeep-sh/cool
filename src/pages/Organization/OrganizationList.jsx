import { Backdrop, CircularProgress, Stack } from '@mui/material';
import { useState } from 'react';
import OrgListComponent from '../../components/LandingPage/Org/OrgListComponent';

export default function OrganizationListPage() {
  const [open, setOpen] = useState(false);

  return (
    <Stack
      sx={{
        backgroundColor: '#7694FE',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <OrgListComponent setOpen={setOpen} Direction={null} />
    </Stack>
  );
}
