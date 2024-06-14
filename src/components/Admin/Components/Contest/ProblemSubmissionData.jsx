import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import ReusableButton from '../../../../components/ReusableButtons/ReusableButton';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { contestProblemAPI } from '../../../../api/requests/contests/contestProblemAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrgName } from '../../../../utils/appendOrgQuery';
import { handleAlert } from '../../../../utils/handleAlert';
import { contestAPI } from '../../../../api/requests/contests/contestAPI';

const ProblemSubmissionData = () => {
  const [areResultsDeclared, setAreResultsDeclared] = useState(false);
  const orgName = getOrgName();
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
  const { problemId, contestId } = useParams();
  useEffect(() => {
    contestAPI
      .getContest(contestId)
      .then((res) => {
        setAreResultsDeclared(res?.areResultsDeclared);
      })
      .catch((err) => {
        handleAlert('Cannot fetch contest details', 'error');
      });
  }, []);
  const drawerWidth = 210;
  const navigate = useNavigate();
  const [scores, setScores] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [editingEnabled, setEditingEnabled] = useState('');

  useEffect(() => {
    getSubmissions();
  }, [page]);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getSubmissions = async () => {
    try {
      const data = await contestProblemAPI.getSubmissionsToScore(problemId, page);
      setSubmissions(data?.submissions);
      const initialScores = {};

      data?.submissions?.forEach((submission) => {
        initialScores[submission.submissionId] = submission.score || '0';
      });
      setScores(initialScores);
      setMaxPage(data?.totalPages);
    } catch (err) {}
  };

  const handleUpdateScore = (username, newScore) => {
    setScores((prevScores) => ({
      ...prevScores,
      [username]: newScore,
    }));
  };

  const handleButtonClick = async (event, submissionId, userId) => {
    try {
      const score = scores[submissionId] || 0;
      const body = { contestId, userId, submissionId, problemId, score };
      await contestProblemAPI.updateScore(body);
    } catch (err) {
      handleAlert('Cannot update score', 'error');
    }
    setEditingEnabled('');
  };

  const renderSubmissionRows = () => {
    return submissions.map((submission, index) => (
      <TableRow key={index}>
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
        <TableCell>{submission.username}</TableCell>
        <TableCell>{submission.language}</TableCell>
        <TableCell>
          {submission.githubUsername}/{submission.githubRepo}
        </TableCell>
        <TableCell>
          <ReusableButton
            Title={'View Submission '}
            size={'small'}
            onClick={() => openInNewTab(submission.deployedLink && submission.deployedLink)}
          />
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <TextField
              id={submission.submissionId}
              type="number"
              value={scores[submission.submissionId]}
              style={{ minWidth: '75px', maxWidth: '100px' }}
              disabled={editingEnabled === submission.submissionId ? false : true}
              onChange={(e) => handleUpdateScore(submission.submissionId, e.target.value)}
            />
            {editingEnabled === submission.submissionId ? (
              <Button
                onClick={(e) => handleButtonClick(e, submission.submissionId, submission.userId)}
              >
                Update
              </Button>
            ) : (
              <Button
                onClick={(e) => setEditingEnabled(submission.submissionId)}
                disabled={areResultsDeclared}
              >
                Edit
              </Button>
            )}
          </Box>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Box
      sx={{
        width: { sm: `calc(100 % -${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        p: { xs: 1, md: 4 },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Score the Submissions
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Submission Time</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Github Repo</TableCell>
              <TableCell>Submission Link</TableCell>
              <TableCell>Enter Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderSubmissionRows()}</TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          position: 'fixed',
          bottom: 1,
          right: 0,
          left: 0,
        }}
      >
        <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)} sx={{ mr: 1 }}>
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)} disabled={page === maxPage}>
          Next
        </Button>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate(`/org/${orgName}/admin/contest/${contestId}/problems`)}
        >
          Previous
        </Button>
      </Box>
    </Box>
  );
};

export default ProblemSubmissionData;
