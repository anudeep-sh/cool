import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import InvitesList from '../LandingPage/Org/OrganizationMembers/MembersList';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Skeletons from '../Skeleton/Skeletons';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
import TaskIcon from '@mui/icons-material/Task';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Notifications_SideBar = ({ open, anchorEl, placement, handleClose, setSelectedOrgName }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [activeTab, setActiveTab] = useState(0);

  const boxWidth = isDesktop ? 400 : 400;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const response = await organizationAPI.getNotifications();
      setNotificationsList(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const [loadingInvites, setLoadingInvites] = useState(false);
  const [invitesRecieved, setInvitesReceived] = useState([]);
  const fetchInvitesReceivedByOrganization = async () => {
    try {
      setLoadingInvites(true);
      const responseInvitesReceived = await organizationAPI.getInvitesRecievedByUser();
      setInvitesReceived(responseInvitesReceived);
    } catch (error) {
      console.error('Error fetching suggested organizations:', error);
    } finally {
      setLoadingInvites(false);
    }
  };

  const MarkAsRead = async () => {
    try {
      await organizationAPI.markNotificationsAsRead();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };
  const fetchData = async () => {
    try {
      if (activeTab === 0) {
        await fetchNotifications();
      } else if (activeTab === 1) {
        await fetchInvitesReceivedByOrganization();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleClickAway = () => {
    handleClose();
  };

  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    switch (notification.type) {
      case 'TASK':
        navigate(`/org/${notification.name}/task/${notification.serviceId}`);
        break;
      case 'CONTEST':
        navigate(`/org/${notification.name}/contest/${notification.serviceId}`);
        break;
      case 'COURSE':
        navigate(`/org/${notification.name}/course/videos/${notification.serviceId}`);
        break;
      default:
        break;
    }
    handleClose();
  };
  return (
    <Popper
      sx={{ zIndex: 1200, overflow: 'visible' }}
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      overflow="visible"
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                borderRadius: '20px',
                marginLeft: '10px',
                marginBottom: '10px',
                bgcolor: 'rgba(148, 172, 255, 1)',
              }}
            >
              <Box
                sx={{
                  bgcolor: 'rgba(148, 172, 255, 1)',
                  width: boxWidth,
                  borderRadius: '50px',
                }}
              >
                <AppBar position="static" sx={{ borderRadius: '20px 20px 5px 5px' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{
                      backgroundColor: '#DFE6FF',
                      borderRadius: '20px 20px 5px 5px',
                      color: '#000',
                    }}
                  >
                    <Tab
                      sx={{
                        boxShadow: '1px 2px 2px 0px rgba(0, 0, 0, 0.25)',
                        fontFamily: 'Poppins',
                        fontSize: '15px',
                      }}
                      label="Notifications"
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{
                        boxShadow: '1px 2px 2px 0px rgba(0, 0, 0, 0.25)',
                        fontFamily: 'Poppins',
                        fontSize: '15px',
                      }}
                      label="Invites received"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                  sx={{ padding: '0px' }}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    {loadingNotifications ? (
                      <Skeletons type="smallCircularLoader" />
                    ) : (
                      <Box
                        sx={{
                          maxHeight: '300px',
                          overflowY: 'auto',
                        }}
                      >
                        {notificationsList.map((notification) => {
                          let iconComponent;

                          switch (notification.type) {
                            case 'TASK':
                              iconComponent = <TaskIcon fontSize="small" />;
                              break;
                            case 'CONTEST':
                              iconComponent = <EmojiEventsIcon fontSize="small" />;
                              break;
                            case 'COURSE':
                              iconComponent = <ImportContactsOutlinedIcon fontSize="small" />;
                              break;
                            default:
                              iconComponent = <NotificationsIcon fontSize="small" />;
                              break;
                          }

                          return (
                            <Box
                              key={notification.id}
                              sx={{
                                borderRadius: '10px',
                                background: 'white',
                                boxShadow: '2px 2px 2px 0px rgba(0, 0, 0, 0.25)',
                                padding: '7px 10px',
                                width: '99%',
                                color: '#000',
                                fontFamily: 'Poppins',
                                fontSize: '14px',
                                fontWeight: '500',
                                marginBottom: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleNotificationClick(notification)}
                            >
                              {iconComponent}
                              {notification.message}.
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                    <Box
                      sx={{
                        textAlign: 'right',
                        paddingTop: '10px',
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          // color: '#698AFF',
                          color: 'black',
                          backgroundColor: '#DFE6FF',
                          fontFamily: 'Poppins',
                          fontSize: '13px',
                          borderRadius: '10px',
                          boxShadow: '2px 2px 4px 1px rgba(0, 0, 0, 0.25)',
                          '&:hover': {
                            background: '#C6CEE8',
                          },
                        }}
                        onClick={async () => {
                          await MarkAsRead();
                          handleClose();
                        }}
                      >
                        Mark as read
                      </Button>
                    </Box>
                  </TabPanel>
                  <TabPanel
                    value={value}
                    index={1}
                    dir={theme.direction}
                    sx={{ paddingTop: '0px' }}
                  >
                    {loadingInvites ? (
                      <Skeletons type="smallCircularLoader" />
                    ) : (
                      <InvitesList
                        members={invitesRecieved}
                        showEmail={false}
                        inviteAccepted={false}
                        inviteRejected={false}
                        inviteReceived={true}
                        organization={true}
                        setSelectedOrgName={setSelectedOrgName}
                      />
                    )}
                  </TabPanel>
                </SwipeableViews>
              </Box>
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default Notifications_SideBar;
