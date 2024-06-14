import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ASSET_CONFIGS } from '../../assets/assetConfigs';
import { getOrgData } from '../../organization';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SIGN_UP from '../../assets/LandingPage/Hero/sign_up_icon.svg';
import SIGN_IN from '../../assets/LandingPage/Hero/sign_in_icon.svg';
import ICON from '../../assets/LandingPage/navbar_icon_menu.svg';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import { Badge } from '@mui/material';
import NotificationsPopup from '../../components/NotificationsPopup';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const pages = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'About Us',
    link: '/about-us',
  },
  {
    id: 3,
    title: 'Products',
    link: '/our-products',
  },
  {
    id: 4,
    title: 'Pricing',
    link: '/plans',
  },
  {
    id: 5,
    title: 'Careers',
    link: '/careers',
  },
  {
    id: 6,
    title: 'Contact Us',
    link: '/contact-support',
  },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [domainData, setDomainData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
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

  const [isMobileView, setIsMobileView] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    setIsMobileView(isMobile);
  }, [isMobile]);

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
      placement: isMobileView ? 'bottom' : 'right',
    }));
  };

  const getDomainData = async () => {
    const data = await getOrgData();
    if (data) {
      setDomainData(data);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.clear();
    navigate('/sign-in');
  };

  useEffect(() => {
    getDomainData();
  }, []);

  const isLoggedIn = !!localStorage.getItem('Token');

  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  let contact_logo_navbar_url = imagesObj && imagesObj[ASSET_CONFIGS.CONTEST_LOGO_NAVBAR];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const useStyles = makeStyles((theme) => ({
    badge: {
      fontSize: 20,
    },
  }));
  const classes = useStyles();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none' }}>
      <Container maxWidth="xl" sx={{ paddingTop: '20px' }}>
        <Toolbar disableGutters>
          <Typography
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <a href="/organization">
              <img src={contact_logo_navbar_url} alt="" />
            </a>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'flex', md: 'none', padding: '0' },
            }}
          >
            <IconButton
              sx={{ p: 0.5 }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#002F7A"
            >
              <img src={ICON} alt="" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => navigate(page.link)}
                  sx={{
                    color: location.pathname === page.link ? 'primary' : 'black',
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}

              {!isLoggedIn ? (
                <>
                  <MenuItem onClick={() => navigate('/sign-in')}>
                    <Button
                      sx={{
                        mt: '0px',
                        display: { xs: 'flex', md: 'none' },
                        width: '200px',
                        height: '45px',
                        border: '3px solid #698AFF',
                        borderRadius: '45px',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        background: 'white',
                        fontSize: '1em',
                        fontWight: '550',
                        fontFamily: 'Montserrat',
                        '&:hover': {
                          background: '#698AFF',
                          color: 'white',
                          fontSize: '1.2em',
                        },
                      }}
                    >
                      Sign In
                      <img style={{ paddingLeft: '10px' }} src={SIGN_IN} alt="" />
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/sign-up')}>
                    <Button
                      sx={{
                        mt: '0px',
                        display: { xs: 'flex', md: 'none' },
                        width: '200px',
                        height: '45px',
                        border: '3px solid #698AFF',
                        borderRadius: '45px',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        background: 'white',
                        fontSize: '1em',
                        fontWight: '550',
                        fontFamily: 'Montserrat',
                        '&:hover': {
                          background: '#698AFF',
                          color: 'white',
                          fontSize: '1.2em',
                        },
                      }}
                    >
                      Sign Up
                      <img style={{ paddingLeft: '10px' }} src={SIGN_UP} alt="" />
                    </Button>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate('/organization')}>
                    <Button
                      sx={{
                        mt: '0px',
                        display: { xs: 'flex', md: 'none' },
                        width: '200px',
                        height: '45px',
                        border: '3px solid #698AFF',
                        borderRadius: '45px',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        background: 'white',
                        fontSize: '1em',
                        fontWight: '550',
                        fontFamily: 'Montserrat',
                        '&:hover': {
                          background: '#698AFF',
                          color: 'white',
                          fontSize: '1.2em',
                        },
                      }}
                    >
                      Dashboard
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Button
                      sx={{
                        mt: '0px',
                        display: { xs: 'flex', md: 'none' },
                        width: '200px',
                        height: '45px',
                        border: '3px solid #698AFF',
                        borderRadius: '45px',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        background: 'white',
                        fontSize: '1em',
                        fontWight: '550',
                        fontFamily: 'Montserrat',
                        '&:hover': {
                          background: '#698AFF',
                          color: 'white',
                          fontSize: '1.2em',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          {/* <Box
            sx={{
              display: 'flex',
            }}
          > */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <a href="/">
              <img style={{ paddingTop: '12px' }} src={contact_logo_navbar_url} alt="" />
            </a>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'none', md: 'flex' },
              gap: 1.5,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => navigate(page.link)}
                sx={{
                  my: 2,
                  color: location.pathname === page.link ? 'primary' : 'black',
                  display: 'block',
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {!isLoggedIn ? (
              <>
                <Button
                  sx={{
                    mt: '0px',
                    display: { xs: 'none', md: 'flex' },
                    width: '160px',
                    height: '45px',
                    border: '3px solid #698AFF',
                    borderRadius: '45px',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    background: 'white',
                    fontSize: '1em',
                    fontWight: '550',
                    fontFamily: 'Montserrat',
                    '&:hover': {
                      background: '#698AFF',
                      color: 'white',
                      fontSize: '1.2em',
                    },
                  }}
                  onClick={() => navigate('/sign-in')}
                >
                  Sign In
                </Button>
                <Button
                  sx={{
                    mt: '0px',
                    display: { xs: 'none', md: 'flex' },
                    width: '160px',
                    height: '45px',
                    border: '3px solid #698AFF',
                    borderRadius: '45px',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    background: 'white',
                    fontSize: '1em',
                    fontWight: '550',
                    fontFamily: 'Montserrat',
                    '&:hover': {
                      background: '#698AFF',
                      color: 'white',
                      fontSize: '1.2em',
                    },
                  }}
                  onClick={() => navigate('/sign-up')}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <MenuItem
                  sx={{
                    padding: 0,
                  }}
                >
                  <Badge
                    badgeContent={notificationCount}
                    color="primary"
                    showZero
                    classes={{ badge: classes.badge }}
                  >
                    <NotificationsNoneIcon
                      sx={{ fontSize: '40px', padding: '0' }}
                      style={{ color: 'black' }}
                      onClick={toggleNotificationsPopup}
                    />
                  </Badge>
                  {notificationsPopup.open && (
                    <NotificationsPopup
                      open={notificationsPopup.open}
                      anchorEl={notificationsPopup.anchorEl}
                      placement={notificationsPopup.placement}
                    />
                  )}
                </MenuItem>
                <Button
                  style={
                    window.location.pathname === '/organization'
                      ? { display: 'none' }
                      : { display: { xs: 'none', md: 'flex' } }
                  }
                  sx={{
                    mt: '0px',
                    display: { xs: 'none', md: 'flex' },
                    width: '160px',
                    height: '45px',
                    border: '3px solid #698AFF',
                    borderRadius: '45px',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    background: 'white',
                    fontSize: '1em',
                    fontWight: '550',
                    fontFamily: 'Montserrat',

                    '&:hover': {
                      background: '#698AFF',
                      color: 'white',
                      fontSize: '1.2em',
                    },
                  }}
                  onClick={() => navigate('/organization')}
                >
                  Dashboard
                </Button>
                <Button
                  sx={{
                    mt: '0px',
                    display: { xs: 'none', md: 'flex' },
                    width: '160px',
                    height: '45px',
                    border: '3px solid #698AFF',
                    borderRadius: '45px',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    background: 'white',
                    fontSize: '1em',
                    fontWight: '550',
                    fontFamily: 'Montserrat',
                    '&:hover': {
                      background: '#698AFF',
                      color: 'white',
                      fontSize: '1.2em',
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
          {/* </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
