import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import GetValidatedTokenData from '../../utils/helper';
import LogOutIcon from '../../assets/RightSideBarIcons/LogOutIcon.svg';
import NotificationsIcon from '../../assets/RightSideBarIcons/NotificationsIcon.svg';
import AnalyticsPageIcon from '../../assets/RightSideBarIcons/AnalyticsPageIcon.svg';
import CousrePageIcon from '../../assets/RightSideBarIcons/CousrePageIcon.svg';
import DashboardPageIcon from '../../assets/RightSideBarIcons/DashboardPageIcon.svg';
import InvitesPageIcon from '../../assets/RightSideBarIcons/InvitesPageIcon.svg';
import OrganizationMemberIcon from '../../assets/RightSideBarIcons/OrganizationMemberIcon.svg';
import TasksPageIcon from '../../assets/RightSideBarIcons/TasksPageIcon.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';
import NotificationsPopup from '../PopUp/Notifications_SideBar';
import Tooltip from '@mui/material/Tooltip';

const drawerWidth = 60;

export default function RightSideBar({ setSelectedOrgName }) {
  const params = useParams();
  const location = useLocation();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  let isCoursePage =
    location.pathname.includes('/course/videos') || location.pathname.includes('/course/upload');

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : drawerWidth,
        paddingTop: 4,
        backgroundColor: 'rgba(199, 211, 255, 0.6)',
        height: '100vh',
        zIndex: 1201,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} onClick={item.onClick} sx={{ padding: 1.1, cursor: 'pointer' }}>
            {typeof item.icon === 'function' ? (
              item.icon()
            ) : (
              <img src={item.icon} alt="" onClick={() => navigate(item.path)} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('organization');
    localStorage.removeItem('Token');
    navigate('/sign-in');
  };
  const [username, setUsername] = React.useState('');

  const checkToken = () => {
    const token = GetValidatedTokenData();
    if (token) {
      setUsername(token?.username);
    }
  };
  const orgName = params.orgName;
  const renderProfilePhoto = () => {
    if (username) {
      const firstNameInitial = username.charAt(0);

      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              fontSize: '20px',
              fontWeight: '400',
              backgroundColor: 'rgba(91, 128, 255, 0.8)',
              borderRadius: '50%',
              width: '35px',
              height: '33.845px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              textTransform: 'capitalize',
              marginLeft: 0.3,
              cursor: 'pointer',
              boxShadow: '2px 2px 4px 1px rgba(0, 0, 0, 0.10)',
            }}
            onClick={() => navigate('/user-profile')}
          >
            {firstNameInitial}
          </Box>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            fontSize: '20px',
            fontWeight: '400',
            backgroundColor: 'rgba(91, 128, 255, 0.8)',
            borderRadius: '50%',
            width: '35px',
            height: '33.845px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            textTransform: 'capitalize',
            marginLeft: 0.3,
            cursor: 'pointer',
            boxShadow: '2px 2px 4px 1px rgba(0, 0, 0, 0.10)',
          }}
          onClick={() => navigate('/user-profile')}
        ></Box>
      </div>
    );
  };
  const [notificationsPopup, setNotificationsPopup] = useState({
    open: false,
    anchorEl: null,
    placement: '',
  });

  const toggleNotificationsPopup = (event) => {
    setNotificationsPopup((prev) => ({
      open: !prev.open,
      anchorEl: prev.open ? null : event.currentTarget,
      placement: 'left-start',
    }));
  };

  const openNotificationsPopup = (event) => {
    setNotificationsPopup({
      open: true,
      anchorEl: event.currentTarget,
      placement: 'left-start',
    });
  };

  const closeNotificationsPopup = () => {
    setNotificationsPopup({
      open: false,
      anchorEl: null,
      placement: '',
    });
  };

  const menuItemsUser = [
    {
      index: 1,
      onClick: toggleNotificationsPopup,
      icon: NotificationsIcon,
      title: 'Notifications',
    },
    {
      index: 2,
      path: '/user-profile',
      icon: renderProfilePhoto,
      title: 'Profile',
    },
    {
      index: 3,
      path: '/',
      icon: LogOutIcon,
      onClick: handleLogout,
      title: 'Logout',
    },
  ];
  const menuItemsAdmin = [
    {
      index: 1,
      onClick: toggleNotificationsPopup,
      icon: NotificationsIcon,
      title: 'Notifications',
    },
    {
      index: 2,
      path: `/org/${orgName}/consumption`,
      icon: AnalyticsPageIcon,
      title: 'Analytics',
    },
    {
      index: 3,
      path: `org/${orgName}/members`,
      icon: OrganizationMemberIcon,
      title: 'View Members',
    },
    {
      index: 4,
      path: '/sign-in',
      icon: LogOutIcon,
      onClick: handleLogout,
      title: 'Logout',
    },
  ];
  const menuItemsSuperAdmin = [
    {
      index: 1,
      onClick: toggleNotificationsPopup,
      icon: NotificationsIcon,
      title: 'Notifications',
    },
    {
      index: 2,
      path: `/org/${orgName}/consumption`,
      icon: AnalyticsPageIcon,
      title: 'Analytics',
    },
    {
      index: 3,
      path: `/org/${orgName}/invites`,
      icon: InvitesPageIcon,
      title: 'Send Invites',
    },
    {
      index: 4,
      path: `/org/${orgName}/dashboard`,
      icon: DashboardPageIcon,
      title: 'Dashboard',
    },
    {
      index: 5,
      path: `/org/${orgName}/task/created`,
      icon: TasksPageIcon,
      title: 'Tasks',
    },
    {
      index: 6,
      path: `/org/${orgName}/course/create`,
      icon: CousrePageIcon,
      title: 'Create Course',
    },
    {
      index: 7,
      path: '/sign-in',
      icon: LogOutIcon,
      onClick: handleLogout,
      title: 'Logout',
    },
  ];
  const [userRole, setUserRole] = useState('USER');

  useEffect(() => {
    checkToken();
    const getRoleData = async () => {
      const Role = await getRoleForOrganization();
      Role && setUserRole(Role);
    };
    getRoleData();
  }, [params.orgName]);

  let menuItems;
  if (userRole === 'ADMIN') {
    menuItems = menuItemsAdmin;
  } else if (userRole === 'SUPERADMIN' || userRole === 'CREATOR') {
    menuItems = menuItemsSuperAdmin;
  } 
    else if( userRole === 'CREATOR') {
    menuItems = menuItemsSuperAdmin;
  }
    else {
    menuItems = menuItemsUser;
  }

  return isCoursePage ? (
    <></>
  ) : (
    <>
      <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              sx={{ position: 'fixed', top: 0, right: 100, zIndex: 1200 }}
            >
              <Box
                sx={{
                  position: 'fixed',
                  top: 20,
                  right: 0,
                  backgroundColor: 'rgba(199, 211, 255, 0.6)',
                  paddingTop: 0.8,
                  paddingLeft: 1,
                  borderRadius: '50px 0px 0px 50px;',
                  boxShadow: '1px 2px 2px 1px rgba(0, 0, 0, 0.25)',
                  display: { xs: 'block', sm: 'none' },
                }}
              >
                <ArrowBackIosIcon
                  sx={{
                    fontSize: 'medium',
                    color: '#000',
                  }}
                />
              </Box>
            </Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          zIndex: 1200,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              paddingTop: 4,
              backgroundColor: 'rgba(199, 211, 255, 0.6)',
              height: '100%',
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} onClick={item.onClick} sx={{ padding: 1.1, cursor: 'pointer' }}>
                <Tooltip title={item.title} placement="left">
                  {typeof item.icon === 'function' ? (
                    item.icon()
                  ) : item.icon === 'NotificationsIcon' ? (
                    <NotificationsIcon />
                  ) : (
                    <img src={item.icon} alt="" onClick={() => navigate(item.path)} />
                  )}
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      {notificationsPopup.open && (
        <NotificationsPopup
          open={notificationsPopup.open}
          anchorEl={notificationsPopup.anchorEl}
          placement={notificationsPopup.placement}
          handleClose={closeNotificationsPopup}
          setSelectedOrgName={setSelectedOrgName}
        />
      )}
    </>
  );
}
