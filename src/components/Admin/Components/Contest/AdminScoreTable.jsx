import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import RankingTableUserInfo from '../../../CodingContests/ContestRanking/RankingTableUserInfo';
import InputField from './InputField';
import { Button, Typography } from '@mui/material';
import AdminScoreTableLink from './AdminScoreTableLink';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#6a6a6a',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const AdminScoreTable = ({ people }) => {
  const columns = [
    { id: 'userinfo', label: 'User Information', minWidth: 100 },
    { id: 'submissionlink', label: 'Submission Link', minWidth: 200 },

    {
      id: 'input',
      label: 'Give Score',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'button',
      label: 'Submit',
      minWidth: 100,
      align: 'right',
    },
  ];

  function createData(userinfo, submissionlink, input, button) {
    return { userinfo, submissionlink, input, button };
  }

  const rows = [];

  for (let i = 0; i < people.length; i++) {
    rows.push(
      createData(
        <RankingTableUserInfo person={people[i]} />,
        <AdminScoreTableLink />,
        <InputField />,
        <Button>Submit</Button>
      )
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ margin: 'auto', width: '100%', overflow: 'hidden', border: 0, boxShadow: 0 }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, textAlign: 'center' }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{ textAlign: 'center' }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default AdminScoreTable;
