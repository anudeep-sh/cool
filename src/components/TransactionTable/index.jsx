import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableContainer,
  Paper,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const moment = require('moment');

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  {
    id: 'updated_at',
    label: 'Date',
    minWidth: 100,
    format: (value) => {
      const date = moment(value);
      return date.format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    id: 'planName',
    label: 'Plan Name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantity',
    label: 'Months',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'promoCode',
    label: 'Code Applied',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'mode',
    label: 'Mode',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function TransactionTable({ page, setPage, pageCount, transactions }) {
  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, pageCount));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const displayValue =
                      value === null
                        ? '~'
                        : column.format && typeof value === 'number'
                        ? column.format(value)
                        : value;
                    return (
                      <TableCell key={column.id} align="center">
                        {displayValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Page: {page}
          <ArrowBackIosNewIcon
            sx={{
              marginLeft: '5px',
              color: page === 1 ? 'lightgrey' : 'inherit',
            }}
            fontSize="small"
            onClick={handlePrevPage}
          />
          <ArrowForwardIosIcon
            sx={{
              color: page === pageCount || pageCount === 0 ? 'lightgrey' : 'inherit',
            }}
            fontSize="small"
            onClick={handleNextPage}
          />
        </Typography>
      </Box>
    </Paper>
  );
}
