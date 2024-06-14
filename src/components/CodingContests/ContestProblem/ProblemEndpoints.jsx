import React, { useState } from 'react';
import { handleAlert } from '../../../utils/handleAlert';
import { backendAPI } from '../../../api/requests/contests/BackendAPI';
import {
  Accordion,
  AccordionDetails,
  Typography,
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import CustomTable from '../../Admin/Pages/Methods';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectedProjectTables from '../../Admin/Components/Contest/SelectedProjectTables';

export const ProblemEndpoints = ({ backendId }) => {
  const isSmallScreen = useMediaQuery('(max-width:400px)');
  const [endpointsOpen, setEndpointsOpen] = useState(false);
  const [endpointsData, setEndpointsData] = useState([]);
  const [endpointLoader, setEndpointLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handleShowTable = async () => {
    setTableLoader(true);
    await backendAPI
      .getAllSchema(backendId)
      .then((res) => {
        setTableData(res);
        setTableOpen(true);
      })
      .catch((error) => {
        handleAlert('Error fetching tables details', 'error');
      });
    setTableLoader(false);
  };

  const handleCloseTable = () => {
    setTableOpen(false);
  };
  const handleShowEndpoints = async () => {
    setEndpointLoader(true);
    try {
      const response = await backendAPI.getUserApiDetails(backendId);
      setEndpointsData(response);
      setEndpointsOpen(true);
    } catch (error) {
      handleAlert('Error fetching endpoints data', 'error');
    }
    setEndpointLoader(false);
  };
  const handleCloseEndpoints = () => {
    setEndpointsOpen(false);
  };
  return backendId ? (
    <>
      <Accordion
        m={0}
        p={0}
        defaultExpanded={true}
        sx={{ boxShadow: 'none', marginTop: '32px!important' }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: '#FAFCFE',
            minHeight: { xs: '48px!important', md: '58px!important' },
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: { xs: '16px', md: '20px' },
            }}
          >
            Available Endpoints
          </Typography>{' '}
          {/*title of the container*/}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: '1px solid #e5e5e5',
            px: '0px',
            p: 2,
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
          }}
        >
          {tableLoader ? (
            <CircularProgress
              size="1rem"
              sx={{ alignSelf: 'center', justifySelf: 'center', mr: 2 }}
            />
          ) : (
            <Button
              onClick={handleShowTable}
              variant="contained"
              maxWidth="50%"
              sx={{ mr: isSmallScreen ? 0 : 1, mb: isSmallScreen ? 1 : 0 }}
            >
              Show Table
            </Button>
          )}

          {endpointLoader ? (
            <CircularProgress
              size="1rem"
              sx={{ alignSelf: 'center', justifySelf: 'center', ml: 2 }}
            />
          ) : (
            <Button
              onClick={handleShowEndpoints}
              variant="outlined"
              sx={{ ml: isSmallScreen ? 0 : 1, mt: isSmallScreen ? 1 : 0 }}
            >
              Show Endpoints
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
      <Dialog open={tableOpen} onClose={handleCloseTable}>
        <DialogTitle>Table for Selected Project</DialogTitle>
        <DialogContent>
          <SelectedProjectTables tableData={tableData} selectedOption={backendId} />
        </DialogContent>
      </Dialog>
      <Dialog open={endpointsOpen} onClose={handleCloseEndpoints} maxWidth="850px">
        <DialogContent>
          <CustomTable endpointData={endpointsData} backendId={backendId} />
        </DialogContent>
      </Dialog>
    </>
  ) : null;
};
