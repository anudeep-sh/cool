import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsPopup from '../NotificationsPopup';
import { useMediaQuery } from '@mui/material';
import { Badge, Grid, Toolbar } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getOrgData } from '../../organization';
import GetValidatedTokenData from '../../utils/helper';
import { ASSET_CONFIGS } from '../../assets/assetConfigs';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { blueGrey } from '@mui/material/colors';
import fallbackAvatar from '../../assets/SidebarResponsive/account-group-outline.svg';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import { useParams } from 'react-router-dom';
import { ChatBubbleOutline } from '@mui/icons-material';
const drawerWidth = 200;
function SideBarResponsive(props) {
  const params = useParams();

  const orgName = params.orgName;
  const [domainData, setDomainData] = React.useState(null);
  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  let side_bar_logo_url = imagesObj && imagesObj[ASSET_CONFIGS.SIDE_BAR_LOGO];
  let home_navbar_phone_url = imagesObj && imagesObj[ASSET_CONFIGS.HOME_NAVBAR_PHONE];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  // Check if current route is contest page
  let showAppBar = null;
  const isContestPage = location.pathname === '/contest';
  let isCoursePage =
    location.pathname.includes('/course/videos') ||
    (location.pathname.includes('/course/upload') && props.show !== true);

  if (location.pathname.includes('/contest') && location.pathname.includes('/rankings')) {
    showAppBar = false;
  } else if (
    location.pathname.includes('course/videos') ||
    location.pathname.includes('/course/upload')
  ) {
    showAppBar = true;
  }

  const [userNotificationLength, setUserNotificationLength] = useState(0);
  const [inviteNotificationNumber, setInviteNotificationNumber] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const response = await organizationAPI.getNotifications();
      setUserNotificationLength(response.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInvite = async () => {
    try {
      const response = await organizationAPI.getInvitesRecievedByUser();
      setInviteNotificationNumber(response.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvite();
    fetchNotifications();
  }, []);

  useEffect(() => {
    setNotificationCount(userNotificationLength + inviteNotificationNumber);
  }, [userNotificationLength, inviteNotificationNumber]);

  const [userRole, setUserRole] = useState('');
  const [orgLogoLink, setOrgLogoLink] = useState('');

  const fetchUserRole = async () => {
    try {
      const response = await organizationAPI.getOrgRole(orgName);
      setUserRole(response.role);
      setOrgLogoLink(response.logoLink);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  const [tokenData, setTokenData] = React.useState(null);

  const checkToken = () => {
    const token = GetValidatedTokenData();
    if (token) {
      setTokenData(token);
    }
  };

  useEffect(() => {
    getDomainData();
    checkToken();
  }, []);

  const getDomainData = async () => {
    const data = await getOrgData();
    setDomainData(data);
    setLoading(false);
  };
  const navigate = useNavigate();

  const [selectedPath, setSelectedPath] = useState(`org/${orgName}/dashboard`);
  useEffect(() => {
    const currentPath = location.pathname;
    if (selectedPath === currentPath) {
      setSelectedPath('');
    } else {
      setSelectedPath(currentPath);
    }
  }, [location.pathname]);
  const handleNavigate = (e, path) => {
    e.preventDefault();
    navigate(`${path}`);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('organization');
    localStorage.removeItem('Token');
    navigate('/sign-in');
  };
  const [isMobileView, setIsMobileView] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const [imgUrl, setimgUrl] = useState('');
  useEffect(() => {
    setIsMobileView(isMobile);
    fetchUserRole();
  }, [isMobile, orgName, props.orgImageStatus]);

  const [notificationsPopup, setNotificationsPopup] = useState({
    open: false,
    anchorEl: null,
    placement: '',
  });
  const toggleNotificationsPopup = (event) => {
    fetchNotifications();
    fetchInvite();

    setNotificationsPopup((prev) => ({
      open: !prev.open,
      anchorEl: prev.open ? null : event.currentTarget,
      placement: isMobileView ? 'top' : 'right',
    }));
  };

  const closeNotificationsPopup = () => {
    setNotificationsPopup({
      open: false,
      anchorEl: null,
      placement: '',
    });
    fetchNotifications();
    fetchInvite();
  };
  const renderOrganizationImage = () => {
    if (orgLogoLink) {
      return <img style={{ width: '24px', height: '24px' }} src={orgLogoLink} alt="" />;
    } else {
      const orgNameInitial = orgName?.charAt(0) || '';

      return (
        <div
          style={{
            display: ' flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '24px',
            height: '24px',
            backgroundColor: ' #354150',
            color: '#fff',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: 'normal',
            borderRadius: '50%',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          <span>{orgNameInitial}</span>
        </div>
      );
    }
  };
  let pagesMiddleSuperAdmin = [
    {
      name: orgName,
      path: `/org/${orgName}/dashboard`,
      icon: renderOrganizationImage(),
    },
    {
      name: 'Contests',
      path: `/org/${orgName}/contest`,
      icon: <EmojiEventsIcon sx={{ fontSize: { uxl: '14px' } }} />,
    },
    {
      name: 'Create Course',
      path: `/org/${orgName}/course/user`,

      icon: <ImportContactsOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Create Contest',
      path: `/org/${orgName}/contest/user`,
      icon: <EditCalendarIcon sx={{ fontSize: { uxl: '14px' } }} />,
    },
    {
      name: 'Create Task',
      path: `/org/${orgName}/task/created`,
      icon: <TaskIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Assigned Tasks',
      path: `/org/${orgName}/task/assigned`,
      icon: <FormatListBulletedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Chat',
      path: `/org/${orgName}/chat`,
      icon: <ChatBubbleOutline sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Settings',
      path: `/org/${orgName}/settings`,
      icon: <SettingsOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
  ];
  let pagesMiddleAdmin = [
    {
      name: `${orgName}`,
      path: `/org/${orgName}/dashboard`,
      icon: renderOrganizationImage(),
    },
    {
      name: 'Contests',
      path: `/org/${orgName}/contest`,
      icon: <EmojiEventsIcon sx={{ fontSize: { uxl: '14px' } }} />,
    },
    {
      name: 'Create Course',
      path: `/org/${orgName}/course/user`,

      icon: <ImportContactsOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Create Task',
      path: `/org/${orgName}/task/created`,
      icon: <TaskIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Assigned Tasks',
      path: `/org/${orgName}/task/assigned`,
      icon: <FormatListBulletedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Chat',
      path: `/org/${orgName}/chat`,
      icon: <ChatBubbleOutline sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Settings',
      path: `/org/${orgName}/settings`,
      icon: <SettingsOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
  ];
  let pagesMiddleUser = [
    {
      name: `${orgName}`,
      path: `/org/${orgName}/dashboard`,
      icon: renderOrganizationImage(),
    },
    {
      name: 'Contests',
      path: `/org/${orgName}/contest`,
      icon: <EmojiEventsIcon sx={{ fontSize: { uxl: '14px' } }} />,
    },
    {
      name: 'Assigned Tasks',
      path: `/org/${orgName}/task/assigned`,
      icon: <FormatListBulletedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Chat',
      path: `/org/${orgName}/chat`,
      icon: <ChatBubbleOutline sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Settings',
      path: `/org/${orgName}/settings`,
      icon: <SettingsOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
  ];
  let pagesBottom = [
    {
      name: 'Joined Orgs',
      path: '/organization?filter=joined',
      icon: <SearchOutlinedIcon sx={{ fontSize: { uxl: '14px' } }} />,
    },
    {
      name: 'Owned Orgs',
      path: '/organization?filter=owned',
      icon: <GroupAddOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'User Profile',
      path: '/user-profile',
      icon: <AccountCircleOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Notifications',
      onClick: toggleNotificationsPopup,
      icon: (
        <Badge badgeContent={notificationCount} color="primary" showZero>
          <NotificationsNoneIcon sx={{ fontSize: { uxl: '14px' } }} />
        </Badge>
      ),
    },
    {
      name: 'Logout',
      onClick: handleLogout,
      icon: <LogoutIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
  ];

  const sidebarUserProfileTop = [
    {
      name: 'Joined Orgs',
      path: '/organization?filter=joined',
      icon: <SearchOutlinedIcon sx={{ fontSize: { uxl: '14px' } }} />,
    },
    {
      name: 'Owned Orgs',
      path: '/organization?filter=owned',
      icon: <GroupAddOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
  ];
  const sidebarUserProfileBottom = [
    {
      name: 'User Profile',
      path: '/user-profile',
      icon: <AccountCircleOutlinedIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
    {
      name: 'Notifications',
      onClick: toggleNotificationsPopup,
      icon: (
        <Badge badgeContent={notificationCount} color="primary" showZero>
          <NotificationsNoneIcon sx={{ fontSize: { uxl: '14px' } }} />
        </Badge>
      ),
    },
    {
      name: 'Logout',
      onClick: handleLogout,
      icon: <LogoutIcon sx={{ fontSize: { uxl: '28px' } }} />,
    },
  ];

  let menuItems;
  if (userRole === 'ADMIN') {
    menuItems = pagesMiddleAdmin;
  } else if (userRole === 'SUPERADMIN' || userRole === 'CREATOR') {
    menuItems = pagesMiddleSuperAdmin;
  } else {
    menuItems = pagesMiddleUser;
  }
  //overriding theme for sidebar
  const sidebarTheme = createTheme({
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: '35px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: '24px',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            '.MuiAvatar-fallback': {
              background: `url(${fallbackAvatar}) center no-repeat`,
            },
          },
        },
      },
      MuiListItemAvatar: {
        styleOverrides: {
          root: {
            minWidth: '38px',
          },
        },
      },
    },
  });

  const drawer = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      {location.pathname === '/user-profile' ? (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'middle' }}>
            <img
              style={{
                padding: '5px 5px 5px 5px',
                width: '140px',
                marginTop: '8px',
                marginBottom: '8px',
              }}
              src={imagesObj && side_bar_logo_url}
              alt="Optigrit"
              onClick={(e) => handleNavigate(e, '/organization')}
            />
          </Box>
          {tokenData ? (
            <>
              <List>
                <Box
                  sx={{
                    width: '100%',
                    borderTop: '1px solid rgba(231, 231, 231, 1)',
                  }}
                >
                  {sidebarUserProfileTop.map((page, index) => (
                    <ListItemButton
                      key={index}
                      sx={{
                        fontSize: '16px',
                        height: '42px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      selected={selectedPath === page.path}
                      onClick={(e) => handleNavigate(e, page.path)}
                    >
                      {page.badgeContent ? (
                        <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                          <Badge badgeContent={page.badgeContent} color="primary">
                            {page.icon}
                          </Badge>
                        </ListItemIcon>
                      ) : (
                        <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                          {' '}
                          {page.icon}
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={page.name}
                        primaryTypographyProps={{
                          color: 'rgba(0, 0, 0, 0.55)',
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: 'normal',
                        }}
                      />
                    </ListItemButton>
                  ))}
                </Box>
              </List>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '0',
                  borderTop: '1px solid rgba(231, 231, 231, 1)',
                  width: '100%',
                }}
              >
                {sidebarUserProfileBottom.map((page, index) => (
                  <ListItemButton
                    key={index}
                    sx={{
                      fontSize: '16px',
                      height: '42px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    selected={selectedPath === page.path}
                    onClick={(e) => (page.onClick ? page.onClick(e) : handleNavigate(e, page.path))}
                  >
                    {page.badgeContent ? (
                      <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                        <Badge badgeContent={page.badgeContent} color="primary">
                          {page.icon}
                        </Badge>
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                        {' '}
                        {page.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={page.name}
                      primaryTypographyProps={{
                        color: 'rgba(0, 0, 0, 0.55)',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                      }}
                    />
                  </ListItemButton>
                ))}
              </Box>
            </>
          ) : null}

          <Divider />
        </div>
      ) : (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'middle' }}>
            <img
              style={{
                padding: '5px 5px 5px 5px',
                width: '140px',
                marginTop: '8px',
                marginBottom: '8px',
              }}
              src={imagesObj && side_bar_logo_url}
              alt="Optigrit"
              onClick={(e) => handleNavigate(e, '/organization')}
            />
          </Box>
          {tokenData ? (
            <>
              <List
                sx={{
                  overflowY: 'auto',
                  maxHeight: '90vh',
                  '&::-webkit-scrollbar': {
                    display: 'block',
                    width: '7px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    display: 'block',
                    borderRadius: '30px',
                    backgroundColor: blueGrey[100],
                    boxShadow: 'box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    borderTop: '1px solid rgba(231, 231, 231, 1)',
                  }}
                >
                  {menuItems.map((page, index) => (
                    <ListItemButton
                      key={index}
                      sx={{
                        fontSize: '16px',
                        height: '42px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      selected={selectedPath === page.path}
                      onClick={(e) => handleNavigate(e, page.path)}
                    >
                      {page.badgeContent ? (
                        <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                          <Badge badgeContent={page.badgeContent} color="primary">
                            {page.icon}
                          </Badge>
                        </ListItemIcon>
                      ) : (
                        <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                          {' '}
                          {page.icon}
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={page.name}
                        primaryTypographyProps={{
                          color: 'rgba(0, 0, 0, 0.55)',
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: 'normal',
                        }}
                      />
                    </ListItemButton>
                  ))}
                </Box>
              </List>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '0',
                  borderTop: '1px solid rgba(231, 231, 231, 1)',
                  width: '100%',
                }}
              >
                {pagesBottom.map((page, index) => (
                  <ListItemButton
                    key={index}
                    sx={{
                      fontSize: '16px',
                      height: '42px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    selected={selectedPath === page.path}
                    onClick={(e) => (page.onClick ? page.onClick(e) : handleNavigate(e, page.path))}
                  >
                    {page.badgeContent ? (
                      <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                        <Badge badgeContent={page.badgeContent} color="primary">
                          {page.icon}
                        </Badge>
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                        {' '}
                        {page.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={page.name}
                      primaryTypographyProps={{
                        color: 'rgba(0, 0, 0, 0.55)',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                      }}
                    />
                  </ListItemButton>
                ))}
              </Box>
            </>
          ) : null}

          <Divider />
          <List
            sx={{
              maxHeight: '65vh',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                display: 'block',
                background: '#FAFAFA',
                boxShadow: '16px 4px 28px 0px rgba(0, 0, 0, 0.10) inset',
              },
              '&::-webkit-scrollbar-thumb': {
                display: 'block',
                backgroundColor: blueGrey[100],
              },
            }}
          ></List>
        </div>
      )}
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  // if (location.pathname === "/user-profile") {
  //   return (

  //     <div
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         justifyContent: 'space-between',
  //         height: '100%',
  //       }}
  //     >
  //
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="SideBar">
        <Box
          sx={{
            display: {
              xs: 'initial',
              sm: isCoursePage ? 'none' : 'initial',
              md: isCoursePage ? 'none' : 'initial',
              lg: isCoursePage ? 'none' : 'initial',
              xl: isCoursePage ? 'none' : 'initial',
            },
          }}
        >
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              backgroundColor: '#ffffff',
              color: '#000',
              borderBottom: {
                xs: isCoursePage ? '1px solid rgba(53, 65, 80, 0.1);' : 'none',
              },
              boxShadow: {
                xs: isCoursePage ? 'none' : ' 0px 1px 10px rgba(0, 0, 0, 0.1);',
              },
              width: {
                sm: showAppBar ? '100%' : `calc(100% - ${drawerWidth}px)`,
                md: showAppBar ? '100%' : `calc(100% - ${drawerWidth}px)`,
              },
              ml: { sm: showAppBar ? '0px' : `${drawerWidth}px` },
            }}
          >
            <Toolbar
              sx={{
                display: {
                  lg: isCoursePage ? 'flex' : 'none',
                  sm: showAppBar ? 'flex' : 'none',
                  md: showAppBar ? 'flex' : 'none',
                  gap: '10%',
                },
                minHeight: { sm: '56px!important' },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: {
                    sm: isContestPage ? 'block' : 'none',
                    md: isContestPage ? 'block' : 'none',
                  },
                  justifyContent: 'left',
                  ml: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <a href={`/org/${orgName}/dashboard`}>
                  <img
                    style={{ padding: '10px 0px 10px 16px' }}
                    src={imagesObj && home_navbar_phone_url}
                    alt=""
                  />
                </a>
              </Grid>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
              maxHeight: { sm: isCoursePage ? '56px' : '56px' },
            }}
            aria-label="mailbox folders"
          >
            <Toolbar
              sx={{
                display: {
                  md: showAppBar ? 'block' : 'none',
                  lg: isCoursePage ? 'block' : 'none',
                  sm: showAppBar ? 'block' : 'none',
                  maxHeight: { lg: isCoursePage ? '56px' : '' },
                },
              }}
            />

            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <ThemeProvider theme={sidebarTheme}>
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: {
                    xs: 'block',
                    sm: showAppBar ? 'block' : 'none',
                    md: showAppBar ? 'block' : 'none',
                  },
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
            </ThemeProvider>
            <ThemeProvider theme={sidebarTheme}>
              <Drawer
                variant="permanent"
                sx={{
                  display: {
                    xs: 'none',
                    sm: showAppBar ? 'none' : 'block',
                    lg: showAppBar ? 'block' : 'block',
                    lg: isCoursePage ? 'none' : 'block',
                  },
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: { sm: drawerWidth, uxl: 350 },
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </ThemeProvider>
          </Box>
        </Box>
      </div>
      {notificationsPopup.open && (
        <NotificationsPopup
          open={notificationsPopup.open}
          anchorEl={notificationsPopup.anchorEl}
          placement={notificationsPopup.placement}
          handleClose={closeNotificationsPopup}
          setSelectedOrgName={props.setSelectedOrgName}
        />
      )}
    </>
  );
}

SideBarResponsive.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBarResponsive;
