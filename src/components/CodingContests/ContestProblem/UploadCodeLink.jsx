import React, { useState, useEffect } from 'react';
import { ContainerOfTitle } from '../../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  Box,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  OutlinedInput,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useOutletContext, useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ReusableButton from '../../ReusableButtons/ReusableButton';
import Select from '@mui/material/Select';

import { manipulateuserdata } from '../../../Redux/UserData/User-Action';
import { SET_ALERT_DATA } from '../../../Redux/UserData/User-Constants';
import { contestProblemAPI } from '../../../api/requests/contests/contestProblemAPI';
import { handleAlert } from '../../../utils/handleAlert';
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const UploadCodeLink = ({ problem }) => {
  const { problemId } = useParams();

  const [submission, setSubmission] = useState([]);

  useEffect(() => {
    getSubmissions();
  }, []);

  const getSubmissions = async () => {
    try {
      const data = await contestProblemAPI.getSubmissions(problemId);
      setSubmission(data[data.length - 1]);
    } catch (err) {}
  };
  // const [problem, setProblem] = useState('');
  // useEffect(() => {
  //   contestProblemAPI.getProblem(problemId).then((res) => {
  //     setProblem(res?.problemData);
  //   });
  // }, []);

  const [solutionLink, setSolutionLink] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [language, setLanguage] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [submissionError, setSubmissionError] = useState(false);
  function isUrlValid(userInput) {
    var regexQuery =
      '/(http(s)?://.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/';
    var url = new RegExp(regexQuery, 'g');
    if (url.test(userInput)) {
      alert('Great, you entered an E-Mail-address');
      return true;
    }
    return false;
  }

  const submitSolution = async () => {
    await contestProblemAPI
      .submitSolution(problemId, dataforpost)
      .then((data) => {
        handleAlert('Submission successful', 'success');
        setSubmissionError(false);
        getSubmissions();
      })
      .catch((err) => {
        handleAlert('Failed to make submission', 'error');
        setSubmissionError(true);
      });
  };

  const clearString = () => {
    setSolutionLink('');
  };

  const dataforpost = {
    githubRepo: githubRepo,
    submissionLink: solutionLink,
    language: language,
    githubUsername: githubUsername,
  };

  return (
    <>
      <Box
        sx={{
          ml: { xs: 1, md: 2 },
          width: '98%',
          mt: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h7" gutterBottom sx={{ fontWeight: 600 }}>
          Important instruction regarding Submissions
        </Typography>
        <Box
          sx={{
            color: submissionError ? 'red' : 'black',
            border: '1px solid grey',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
            mt: 2,
          }}
        >
          * Github Repository should be public.
          <br />
          * Branch should be master.
          <br />* Repository should have a build folder.
        </Box>
      </Box>
      <Accordion
        m={0}
        p={0}
        defaultExpanded={true}
        sx={{
          m: '16px!important',
          mr: { xs: '0px!important', md: '0px!important' },
          width: '100%',
          boxShadow: 'none',
          ml: { xs: '0px!important' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: '#FAFCFE',
            minHeight: { xs: '48px!important', md: '58px!important' },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: { xs: '16px', md: '20px' },
            }}
          >
            Upload code here
          </Typography>{' '}
        </AccordionSummary>

        <AccordionDetails sx={{ border: '1px solid #e5e5e5', px: '0px', p: 2 }}>
          <Grid container xs={12} sm={8} md={12} sx={{ m: 'auto!important' }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography
                sx={{ fontSize: { xs: '13px', md: '15px' }, fontWeight: '400' }}
                variant="body2"
              >
                Fill the required details to make your submission
              </Typography>
            </Grid>
            <Grid container>
              {/* <Grid
                item
                xs={12}
                md={2.5}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: '16px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Paste submission link here"
                  variant="outlined"
                  sx={{
                    borderColor: 'grey',
                    '&:hover': {
                      borderColor: 'grey',
                    },
                  }}
                  fullWidth
                  onChange={(event) => setSolutionLink(event.target.value)}
                />
              </Grid> */}

              <Grid
                item
                xs={12}
                md={2.5}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: '16px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Github username"
                  variant="outlined"
                  required
                  sx={{
                    borderColor: 'grey',
                    '&:hover': {
                      borderColor: 'grey',
                    },
                  }}
                  fullWidth
                  onChange={(event) => setGithubUsername(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2.5}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: '16px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Enter repository"
                  variant="outlined"
                  required
                  sx={{
                    borderColor: 'grey',
                    '&:hover': {
                      borderColor: 'grey',
                    },
                  }}
                  fullWidth
                  onChange={(event) => setGithubRepo(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2.5}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: '16px!important', xs: '0px!important' },
                  mb: 2.5,
                }}
              >
                {' '}
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Select Language</InputLabel>
                  <Select
                    input={<OutlinedInput label={'Select Language'} />}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
                    onChange={(event) => setLanguage(event.target.value)}
                    required
                  >
                    {problem?.languages?.map((x, i) => {
                      return (
                        <MenuItem key={i} value={x}>
                          {x}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                pt="0px!important"
                pl="0px!important"
                sx={{ pr: { md: '0px!important', xs: '0px!important' } }}
              >
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{
                    textAlign: 'center',
                    height: 40,
                    color: 'white',
                    backgroundColor: '#696969',
                    '&:hover': {
                      backgroundColor: '#000000',
                    },
                  }}
                  onClick={() => {
                    submitSolution();
                    clearString();
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontSize: '15px',
                      fontWeight: '200',
                    }}
                    variant="body2"
                  >
                    Submit
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" sx={{ fontWeight: 600, ml: 1, mt: 4 }}>
        Your last submission
      </Typography>
      {submission ? (
        <TableContainer sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date of submission</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Github Username</TableCell>
                <TableCell>Github Repository</TableCell>
                <TableCell>Submission Link</TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    maxWidth: 'fit-content',
                    p: { xs: '4px 12px', md: '4px 16px' },
                    boxShadow: 0,
                    textTransform: 'none',
                    color: '#698AFF',
                    backgroundColor: 'transparent',
                    borderRadius: '20px',
                    border: '1px solid #DEE6FB ',
                  }}
                >
                  <Typography sx={{ fontSize: { xs: '12px' }, fontWeight: '400' }} variant="body2">
                    {new Date(submission?.updated_at).getDate()}-
                    {monthNames[new Date(submission?.updated_at).getMonth()]}-
                    {new Date(submission?.updated_at).getFullYear()}, Time:{' '}
                    {new Date(submission?.updated_at).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{submission?.language}</TableCell>
              <TableCell>{submission?.githubUsername}</TableCell>
              <TableCell>{submission?.githubRepo}</TableCell>{' '}
              <TableCell>
                <ReusableButton Title={'View Submission '} size={'small'} disabled />
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h7" sx={{ ml: 1 }}>
          No submission found
        </Typography>
      )}
    </>
  );
};

export default UploadCodeLink;
