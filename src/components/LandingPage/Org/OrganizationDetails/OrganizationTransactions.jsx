import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, IconButton } from '@mui/material';
import TransactionTable from '../../../TransactionTable/index';
import { Backdrop, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
import Skeletons from '../../../../components/Skeleton/Skeletons';

export default function OrganizationTransactions() {
  const [isLoading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [pageCount, setPageCount] = useState(1);
  async function getTransactions() {
    setLoading(true);
    try {
      const response = await organizationAPI.getOrgTransaction(page, searchValue);
      setPageCount(response.pages);
      setTransactions(response.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getTransactions();
  }, [page]);
  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <div>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
        }}
      >
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            borderRadius: '20px',
          }}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Transaction"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Paper>
        <Button
          variant="outlined"
          sx={{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.10)',
            borderRadius: '15px',
            padding: '0 20px',
            border: 'none',
          }}
          onClick={getTransactions}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: '20px',
        }}
      >
        <Typography
          sx={{
            paddingBottom: '20px',
            fontSize: '25px',
            fontFamily: 'Poppins',
          }}
        >
          Transaction Log
        </Typography>
        <TransactionTable
          transactions={transactions}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
        />
      </Box>
    </div>
  );
}
