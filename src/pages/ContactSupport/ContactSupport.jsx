import React, { useState } from 'react';
import './ContactSupport.css';
import Footer from '../../components/Header/Footer';
import Navbar from '../../components/Header/Navbar';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { contactSupportAPI } from '../../api/requests/contactSupportAPI';
import { Grid, TextField, Typography, Tab } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { handleAlert } from '../../utils/handleAlert';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

function ContactSupport() {
  useDocumentTitle('Contact Support');

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Regex for validating the Email Address
  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [companyHead, setCompanyHead] = useState('');

  const [loader, setLoader] = useState(false);

  // API Call for Contact Support
  const handleSubmitSupport = async () => {
    setLoader(true);

    if (
      name.length === 0 ||
      email.length === 0 ||
      phoneNumber.length === 0 ||
      description.length === 0
    ) {
      handleAlert('Please fill all the fields', 'error');
      setLoader(false);
    }
    if (phoneNumber.length !== 10) {
      handleAlert('Please enter a valid phone number', 'error');
      setLoader(false);
    }
    if (!email.match(validEmailRegex)) {
      handleAlert('Please enter a valid email address', 'error');
      setLoader(false);
    }

    if (
      name.length > 0 &&
      phoneNumber.length === 10 &&
      description.length > 0 &&
      email.match(validEmailRegex)
    ) {
      try {
        const nameArr = name.split(' ');

        const data = {
          firstName: nameArr[0],
          lastName: nameArr[1] ?? ' ',
          email: email,
          phoneNumber: phoneNumber,
          description: description,
        };

        await contactSupportAPI.contactSupport(data);
        handleAlert("Details Submitted Successfully. We'll get back to you soon", 'success');
        setLoader(false);
        setName('');
        setEmail('');
        setPhoneNumber('');
        setDescription('');
      } catch (err) {
        handleAlert('Something went wrong, please try again later', 'error');
        setLoader(false);
      }
    }
  };

  // API Call For Sales Support
  const handleSupportSales = async () => {
    setLoader(true);

    if (
      name.length === 0 ||
      email.length === 0 ||
      phoneNumber.length === 0 ||
      description.length === 0 ||
      companySize.length === 0 ||
      companyHead.length === 0
    ) {
      handleAlert('Please fill all the fields', 'error');
      setLoader(false);
    }

    if (phoneNumber.length !== 10) {
      handleAlert('Please enter a valid phone number', 'error');
      setLoader(false);
    }
    if (!email.match(validEmailRegex)) {
      handleAlert('Please enter a valid email address', 'error');
      setLoader(false);
    }
    if (parseInt(companySize) <= 0) {
      handleAlert("Company's Size cannot be zero or negative", 'error');
      setLoader(false);
    }

    if (
      name.length > 0 &&
      phoneNumber.length === 10 &&
      description.length > 0 &&
      email.match(validEmailRegex) &&
      parseInt(companySize) > 0 &&
      companyHead.length > 0
    ) {
      try {
        const nameArr = name.split(' ');

        const data = {
          firstName: nameArr[0],
          lastName: nameArr[1] ?? '',
          companyMail: email,
          phoneNumber: phoneNumber,
          companySize: companySize,
          compnayHeadq: companyHead,
          discussion: description,
        };

        await contactSupportAPI.contactSales(data);
        handleAlert("Details Submitted Successfully. We'll get back to you soon", 'success');
        setLoader(false);
        setName('');
        setEmail('');
        setPhoneNumber('');
        setDescription('');
        setCompanySize('');
        setCompanyHead('');
      } catch (err) {
        handleAlert('Something went wrong, please try again later', 'error');
        setLoader(false);
      }
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundColor: '#698aff',
          position: 'relative',
          padding: '3rem 4rem',
        }}
        className="contact-box"
      >
        <Grid container direction="column" spacing={8} sx={{ color: '#ffffff' }}>
          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: '600', marginBottom: '1rem' }}>
              Let's Connect!
            </Typography>
            <Typography
              variant="body2"
              style={{ color: '#ffffff', width: '28%' }}
              className="contact-text"
            >
              Do you have any queries/complains, do you want to partner with us, or just give a
              feedback?
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}
            >
              We’d love to hear from you.
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffff' }}>
              Email us on:
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffff', fontSize: '0.8rem' }}>
              support@optigrit.com
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: '#ffffff',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              Or
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffff' }}>
              Call us on:
            </Typography>
            <Typography style={{ color: '#ffffff', fontSize: '0.8rem' }}>
              +91-9878324029
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            right: '10rem',
            top: '-7rem',
            color: '#023786',
            padding: '1.5rem 1.5rem',
            maxHeight: '700px',
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          }}
          className="contact-input-box"
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 400, fontSize: '1.05rem', marginBottom: '1rem' }}
          >
            What brings you here?
          </Typography>

          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              sx={{ marginBottom: '1rem' }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Feedback" value="1" />
              <Tab label="Sales Query" value="2" />
              <Tab label="Complaint" value="3" />
              <Tab label="Others" value="4" />
            </TabList>

            <TabPanel value="1">
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your full name"
                    variant="standard"
                    size="small"
                    fullWidth
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Email Id
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your email id"
                    variant="standard"
                    size="small"
                    fullWidth
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your phone number"
                    type="tel"
                    variant="standard"
                    size="small"
                    fullWidth
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Write your feedback
                  </Typography>
                  <TextField
                    placeholder="Please share your feedback"
                    multiline
                    rows={4}
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item textAlign="center">
                  <LoadingButton
                    style={{
                      padding: '0.5rem 4rem',
                    }}
                    variant="contained"
                    onClick={handleSubmitSupport}
                    loading={loader}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value="2">
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your full name"
                    variant="standard"
                    size="small"
                    fullWidth
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Company's Email Id
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your company's email id"
                    variant="standard"
                    size="small"
                    fullWidth
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Company's Size
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your company's size"
                    variant="standard"
                    size="small"
                    fullWidth
                    type="number"
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Company's Headquarter
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter the headquarter's location"
                    variant="standard"
                    size="small"
                    fullWidth
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={companyHead}
                    onChange={(e) => setCompanyHead(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your phone number"
                    type="number"
                    variant="standard"
                    size="small"
                    fullWidth
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Write your query
                  </Typography>
                  <TextField
                    placeholder="Please share your query"
                    multiline
                    rows={4}
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        fontSize: '0.85rem',
                      },
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item textAlign="center">
                  <LoadingButton
                    style={{
                      padding: '0.5rem 4rem',
                    }}
                    variant="contained"
                    onClick={handleSupportSales}
                    loading={loader}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value="3">
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your full name"
                    variant="standard"
                    size="small"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Email Id
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your email id"
                    variant="standard"
                    size="small"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Phone number
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your phone number"
                    variant="standard"
                    size="small"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Write your complaint
                  </Typography>
                  <TextField
                    placeholder="Please share your complaint"
                    multiline
                    rows={4}
                    size="small"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </Grid>
                <Grid item textAlign="center">
                  <LoadingButton
                    style={{
                      padding: '0.5rem 4rem',
                    }}
                    variant="contained"
                    onClick={handleSubmitSupport}
                    loading={loader}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value="4">
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your full name"
                    variant="standard"
                    size="small"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Email Id
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your email id"
                    variant="standard"
                    size="small"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Phone number
                  </Typography>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter your phone number"
                    variant="standard"
                    size="small"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{
                      '& input::placeholder': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    Write your message
                  </Typography>
                  <TextField
                    placeholder="Please share your message"
                    multiline
                    rows={4}
                    size="small"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </Grid>
                <Grid item textAlign="center">
                  <LoadingButton
                    style={{
                      padding: '0.5rem 4rem',
                    }}
                    variant="contained"
                    onClick={handleSubmitSupport}
                    loading={loader}
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default ContactSupport;
