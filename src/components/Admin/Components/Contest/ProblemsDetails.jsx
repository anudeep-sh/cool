import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { contestAPI } from '../../../../api/requests/contests/contestAPI';
import { CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getOrgName } from '../../../../utils/appendOrgQuery';
import { handleAlert } from '../../../../utils/handleAlert';

import ContestDetails from './ContestDetails';
export default function ProblemDetails() {
  const orgName = getOrgName();
  const navigate = useNavigate();
  const { contestId } = useParams();
  const [problem, setProblem] = useState([]);
  const [loader, setLoader] = useState(false);
  const [contestData, setContestData] = useState();
  const [areResultsDeclared, setAreResultsDeclared] = useState(false);
  // const [scores, setScores] = useState({}); // State to store scores

  const handleClick = (problemId, startTime, endTime) => {
    const currTime = new Date().getTime() / 1000;
    if (currTime < startTime || currTime < endTime) {
      return;
    } else navigate(`/org/${orgName}/admin/contest/${contestId}/problems/${problemId}`);
  };
  const getContestData = async () => {
    setLoader(true);
    contestAPI
      .getContest(contestId)
      .then((res) => {
        setProblem(res?.problemData);
        setContestData(res?.contestData);
        setAreResultsDeclared(res?.areResultsDeclared);
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getContestData();
  }, []);
  const [open, setOpen] = useState(false);
  const handlePostResults = async () => {
    try {
      await contestAPI.postResults(contestId);

      handleAlert('Results posted successfully', 'success');
    } catch (err) {
      handleAlert('Error posting results', 'error');
    }
    getContestData();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handlePostResults();
    setOpen(false);
  };
  const drawerWidth = 200;
  return (
    <Box
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        p: 2,
        pr: { xs: 1, md: 8 },
      }}
    >
      {contestData && contestData[0] && <ContestDetails contest={contestData[0]} />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          justifyContent: 'space-between',
          my: 3,
        }}
      >
        <Typography variant="h6"> Problem details</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: { xs: 2, md: 0 } }}>
          <Button variant="contained" disabled={areResultsDeclared} onClick={handleClickOpen}>
            Post Results
          </Button>
          <Button
            variant="outlined"
            disabled={areResultsDeclared === false}
            onClick={() =>
              navigate(
                `/org/${orgName}/contest/${contestId}/${contestData[0]?.endingDate}/${contestData[0]?.code}/ranking`
              )
            }
          >
            Show Results
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ background: '#93A9FA' }}>
              <TableCell sx={{ color: 'white', fontWeight: '600', letterSpacing: '1px' }}>
                Title
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: '600', letterSpacing: '1px' }}
                align="right"
              >
                Code
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: '600', letterSpacing: '1px' }}
                align="right"
              >
                Difficulty level
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: '600', letterSpacing: '1px' }}
                align="right"
              >
                Max Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loader ? (
              <CircularProgress />
            ) : (
              problem?.map((prob) => (
                <TableRow
                  key={prob.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.6)' },
                  }}
                  onClick={() =>
                    handleClick(prob.id, contestData[0]?.startingDate, contestData[0]?.endingDate)
                  }
                  style={{ cursor: 'pointer', height: '50px' }}
                >
                  {/* <TableCell component="th" scope="row" style={{cursor:'pointer'}} onClick={() => handleClick(prob.id)}>
                    {prob.title}
                  </TableCell> */}
                  <TableCell align="left">{prob.title}</TableCell>
                  <TableCell align="right">{prob.code}</TableCell>
                  <TableCell align="right">{prob.difficultyLevel}</TableCell>
                  <TableCell align="right">{prob.maximumScore}</TableCell>
                  {/* <TableCell align="right" width="130px">
                    <TextField
                      type="number"
                      inputProps={{
                        max: prob.maximumScore,
                        min: 0,
                      }}
                      value={scores[prob.id] || ''}
                      onChange={(e) => handleChange(e, prob.id)}
                    />
                  </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Post Results'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to post the results?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
