import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Country, State } from 'country-state-city';
import 'react-phone-number-input/style.css';
import 'react-multi-carousel/lib/styles.css';
import dayjs from 'dayjs';
import UserInformation from '../../components/UserprofileComponents/UserInformation';
import PersonalInformation from '../../components/UserprofileComponents/PersonalInformation';
import ProfessionalInformation from '../../components/UserprofileComponents/ProfessionalInformation';
import AdditionalInformation from '../../components/UserprofileComponents/AdditionalInformation';
import { userAPI } from '../../api/requests/users/userAPI';
import { handleAlert } from '../../utils/handleAlert';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  useDocumentTitle('Profile');
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const UserProfile2 = () => {
  const matches = useMediaQuery('(max-width:920px)');
  const [profile, setProfile] = useState(null);
  const [instituteType, setInstituteType] = useState(null);
  const [instituteName, setInstituteName] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [profilePhotoLink, setProfilePhotoLink] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [resume, setResume] = useState(null);
  const [githubLink, setGithubLink] = useState(null);
  const [twitterLink, setTwitterLink] = useState(null);
  const [address, setAddress] = useState(null);
  const [websiteLink, setWebsiteLink] = useState(null);
  const [data2, setData2] = useState([]);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [street, setStreet] = useState(null);
  const [mobile, setMobile] = useState();
  const [anyChange, setAnyChange] = useState(true);
  const [dob, setDob] = useState(dayjs(''));
  const [gender, setGender] = useState(null);
  const [highestEducationEarned, setHighestEducationEarned] = useState(null);
  const [profession, setProfession] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      await Promise.all([getProfile()]);
      setLoading(false);
    };
    getAllData();
  }, []);

  const drawerWidth = 200;
  const getProfile = async () => {
    try {
      const data = await userAPI.getUserInfo();
      setProfile(data && data);
    } catch (err) {}
  };
  const handleUpload = async (postData) => {
    try {
      await userAPI.uploadUserInfo(postData);
      handleAlert('Profile updated!', 'success');
    } catch (err) {
      handleAlert('Error!', 'error');
    }
  };

  const uploadData = async () => {
    const postData = {
      firstName: firstName,
      lastName: lastName,
      websiteLink: websiteLink,
      instituteName: instituteName,
      instituteType: instituteType?.toLowerCase(),
      country: selectedCountry?.name,
      countryCode: selectedCountry?.isoCode,
      mobile: mobile,
      githubLink: githubLink,
      twitterLink: twitterLink,
      dob: String(dob),
      gender: gender,
      companyName: companyName,
      position: position,

      highestEducationEarned: highestEducationEarned,
      profession: profession,
      address:
        String(selectedCountry?.isoCode) +
        '_' +
        String(selectedState?.isoCode) +
        '_' +
        String(pinCode) +
        '_' +
        String(street),
    };
    if (postData) {
      handleUpload(postData);
    } else {
    }
  };

  let myObject;

  if (address != null) {
    const [Country, State, pincode, Street] = address?.split('_');

    myObject = {
      Country,
      State,
      pincode,
      Street,
    };
  }

  useEffect(() => {
    setInstituteType(profile?.instituteType);
    setInstituteName(profile?.instituteName);
    setCountry(profile?.country);
    setCountryCode(profile?.countryCode);
    setFirstName(profile?.firstName);
    setLastName(profile?.lastName);
    setGithubLink(profile?.githubLink);
    setTwitterLink(profile?.twitterLink);
    setWebsiteLink(profile?.websiteLink);
    setMobile(profile?.mobile);
    setAddress(profile?.address);
    setDob(profile?.dob);
    setGender(profile?.gender);
    setHighestEducationEarned(profile?.highestEducationEarned);
    setProfession(profile?.profession);
    setEmail(profile?.email);
    setUsername(profile?.username);
    setAddress(profile?.address);
    setProfilePhotoLink(profile?.profilePhotoLink);
    setResume(profile?.resumeLink);
    setCompanyName(profile?.companyName);
    setPosition(profile?.position);
  }, [profile]);

  useEffect(() => {
    setSelectedCountry(Country?.getCountryByCode(countryCode));
    setSelectedState(State?.getStateByCodeAndCountry(myObject?.State, myObject?.Country));
    setPinCode(myObject?.pincode === null ? '' : myObject?.pincode);
    setStreet(myObject?.Street === 'undefined' ? '' : myObject?.Street);
  }, [address]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            style={{
              backgroundColor: '#ffffff',
              top: 'auto',
              bottom: 0,
              boxShadow: 0,
            }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000000' }}>
                Profile
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ width: 'auto' }}>
          <Box
            sx={{
              justifyContent: 'center',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="tabs"
              variant={'scrollable'}
              allowScrollButtonsMobile
              tabItemContainerStyle={{ position: 'fixed', bottom: '0' }}
              scrollButtons="auto"
              sx={{
                md: { size: 'small' },
                backgroundColor: '#f6f6f6',
                xs: { ml: 1, mr: 1 },
                md: { ml: 1, mr: 1 },
                lg: { ml: 2, mr: 2 },
                xl: { ml: 3, mr: 3 },
                borderRadius: 2,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'capitalize',
                height: 70,
                '& MuiTabs-scrollButtons.Mui-disabled': {
                  opacity: 0.3,
                },
                '& button': {
                  color: '#8C8C8C',
                  borderRadius: 1,
                  textTransform: 'capitalize',
                  xs: {
                    fontSize: '13px',
                    color: '#8C8C8C',
                    textTransform: 'capitalize',
                    size: 'small',
                  },
                  sm: {
                    fontSize: '13px',
                    color: '#8C8C8C',
                    textTransform: 'capitalize',
                    size: 'small',
                  },
                  md: {
                    fontSize: '13px',
                    color: '#8C8C8C',
                    textTransform: 'capitalize',
                    size: 'small',
                  },
                  lg: {
                    fontSize: '14px',
                    color: '#8C8C8C',
                    textTransform: 'capitalize',
                    size: 'small',
                  },
                  size: 'small',
                },
                '& button:active': {
                  backgroundColor: '#ffffff',
                  color: '#8C8C8C',
                },
                '& .css-18rllz0-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                  backgroundColor: '#ffffff',
                  color: '#8C8C8C',
                  height: 40,
                },
                '& .css-heg063-MuiTabs-flexContainer': {
                  justifyContent: 'center',
                  // gap: "8em",
                  xs: { gap: '0.05em', justifyContent: 'center' },
                  sm: { gap: '0.05em', justifyContent: 'center' },
                  md: { gap: '0.5em', justifyContent: 'center' },
                  lg: { gap: '3em', justifyContent: 'center' },
                },
                '& button: Mui-selected': { backgroundColor: '#ffffff' },
                '& .MuiTabs-indicator': { backgroundColor: '#ffffff' },
              }}
              TabIndicatorProps={{
                style: {
                  '& button': { backgroundColor: '#ffffff' },
                  '& button: MuiButtonBase-root': {
                    backgroundColor: '#ffffff',
                  },
                  backgroundColor: '#f6f6f6',
                  textDecorationColor: '#000000',
                  '& button': { backgroundColor: '#ffffff' },
                },
              }}
              inkBarStyle={{ background: 'white' }}
            >
              <Tab sx={{ m: 1 }} label={matches ? 'User' : 'User Information'} {...a11yProps(0)} />
              <Tab
                sx={{ m: 1 }}
                label={matches ? 'Personal' : 'Personal Information'}
                {...a11yProps(1)}
              />
              <Tab
                sx={{ m: 1 }}
                label={matches ? 'Professional' : 'Professional Information'}
                {...a11yProps(2)}
              />
              <Tab
                sx={{ m: 1 }}
                label={matches ? 'Additional' : 'Additional Information'}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <UserInformation
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              setAnyChange={setAnyChange}
              profilePhotoLink={profilePhotoLink}
              setProfilePhotoLink={setProfilePhotoLink}
              dob={dob}
              gender={gender}
              setDob={setDob}
              setGender={setGender}
              username={username}
              email={email}
              mobile={mobile}
              setMobile={setMobile}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PersonalInformation
              profilePhotoLink={profilePhotoLink}
              setProfilePhotoLink={setProfilePhotoLink}
              gender={gender}
              setGender={setGender}
              email={email}
              setEmail={setEmail}
              setAnyChange={setAnyChange}
              username={username}
              setUsername={setUsername}
              mobile={mobile}
              setMobile={setMobile}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              pinCode={pinCode}
              setPinCode={setPinCode}
              street={street}
              setStreet={setStreet}
              dob={dob}
              setDob={setDob}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProfessionalInformation
              highestEducationEarned={highestEducationEarned}
              setHighestEducationEarned={setHighestEducationEarned}
              profession={profession}
              setProfession={setProfession}
              instituteName={instituteName}
              setInstituteName={setInstituteName}
              instituteType={instituteType}
              setInstituteType={setInstituteType}
              setAnyChange={setAnyChange}
              firstName={firstName}
              gender={gender}
              setGender={setGender}
              companyName={companyName}
              setCompanyName={setCompanyName}
              position={position}
              setPosition={setPosition}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AdditionalInformation
              resume={resume}
              setResume={setResume}
              setAnyChange={setAnyChange}
              githubLink={githubLink}
              setGithubLink={setGithubLink}
              twitterLink={twitterLink}
              setTwitterLink={setTwitterLink}
              websiteLink={websiteLink}
              setWebsiteLink={setWebsiteLink}
            />
          </TabPanel>
        </Box>
        {/* <Box sx={{ p: 2, pt: 0 }}>
          <Box display="flex" flexDirection="column"> */}
        {/* <Box mt={2}>
              <Typography variant="h6" sx={{ fontSize: "25px" }}>
                Submission HeatMap
              </Typography>
              <Box mt={1} alignItems={"center"} justifyContent={"center"}>
                <HeatMap />
              </Box>
            </Box> */}
        {/* <Box mt={2}>
              <Typography variant="h6" sx={{ fontSize: "25px" }}>
                Contest Rating
              </Typography>
              <Box display="flex" flexDirection={"row"}>
                <Box>
                  <Box display="flex" flexDirection={"row"}>
                    <Box>
                      <Circle />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: "25px" }}>
                        Global Ranking
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box></Box>
              </Box>
              <Box mt={1} alignItems={"center"} justifyContent={"center"}>
                <ChartsComponent />
              </Box>
            </Box> */}
        {/* </Box> */}
        {/* </Box> */}
        <Box display="flex" flexDirection="row">
          <Box ml={3} mb={4}>
            <Button variant="contained" disabled={anyChange} onClick={() => uploadData()}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile2;
