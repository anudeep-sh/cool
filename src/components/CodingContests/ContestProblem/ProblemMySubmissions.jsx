import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { NavLink, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chip, Typography, Button, Grid } from '@mui/material';
import styled from 'styled-components';
import ReusableButton from '../../ReusableButtons/ReusableButton';
import { contestAPI } from '../../../api/requests/contests/contestAPI';
import { contestProblemAPI } from '../../../api/requests/contests/contestProblemAPI';

const ProblemMySubmissions = ({ problem }) => {
  const { problemId } = useParams();

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions();
  }, []);

  const getSubmissions = async () => {
    try {
      const data = await contestProblemAPI.getSubmissions(problemId);
      setSubmissions(data);
    } catch (err) {}
  };

  function createData(date, username, language, githubLink, submissionLink) {
    return { date, username, language, githubLink, submissionLink };
  }
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const MyStyledButton = styled('button')({});

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

  const rows = [];

  for (let i = 0; i < submissions.length; i++) {
    const dateTime = new Date(submissions[i]?.updated_at);
    rows.push(
      createData(
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
            {dateTime?.getDate()}-{monthNames[dateTime?.getMonth()]}-{dateTime?.getFullYear()},
            Time:{' '}
            {dateTime?.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </Typography>
        </Box>,
        submissions[i]?.githubUsername,
        <Chip label={submissions[i]?.language} color="ChipColor" variant="filled" />,

        <ReusableButton
          Title={'View GitHub '}
          onClick={() => openInNewTab(submissions[i]?.githubRepo && submissions[i]?.githubRepo)}
        />,

        <ReusableButton
          Title={'View Submission '}
          size={'small'}
          onClick={() =>
            openInNewTab(submissions[i]?.submissionLink && submissions[i]?.submissionLink)
          }
        />
      )
    );
  }

  const drawerWidth = 240;

  return (
    <>
      <TableContainer
        sx={{
          marginLeft: '16px',
          display: { xs: 'none', md: 'block' },
          width: { xs: '100%' },
          ml: { xs: '0px!important' },
        }}
      >
        <Table sx={{ minWidth: 800, border: 1, borderColor: '#f3f3f3' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date of submission</TableCell>
              <TableCell align="left">Github UserName</TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="left">Github Link</TableCell>
              <TableCell align="left">Submission Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left" component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#2B3746',
                      display: '-webkit-box!important',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: ' vertical',
                    }}
                  >
                    {row.username}
                  </Typography>
                </TableCell>
                <TableCell align="left">{row.language}</TableCell>
                <TableCell align="left">{row.githubLink}</TableCell>
                <TableCell align="left">{row.submissionLink}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        sx={{
          marginLeft: '16px',
          display: { xs: 'block', md: 'none', width: '100%' },
        }}
      >
        <Table sx={{ border: 1, borderColor: '#f3f3f3' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My submissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left" component="th" scope="row" sx={{ pb: '0px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      mb: '16px',
                    }}
                  >
                    <Typography variant="caption">Date :</Typography> {row.date}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      mb: '16px',
                    }}
                  >
                    <Typography variant="caption">UserName :</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2B3746',
                        display: '-webkit-box!important',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: ' vertical',
                      }}
                    >
                      {row.username}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      mb: '16px',
                    }}
                  >
                    <Typography variant="caption">Language :</Typography> {row.language}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      mb: '16px',
                    }}
                  >
                    <Typography variant="caption">Github Link :</Typography> {row.githubLink}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      mb: '16px',
                    }}
                  >
                    <Typography variant="caption">Submission Link :</Typography>{' '}
                    {row.submissionLink}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProblemMySubmissions;
