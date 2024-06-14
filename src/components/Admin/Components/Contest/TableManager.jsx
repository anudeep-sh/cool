import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  TableContainer,
} from '@mui/material';

function EditableTable({ rows, primaryKey, table }) {
  return (
    <Stack>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: 1, background: '#f0f1f6' }} align="center">
                <b>Field Name</b>
              </TableCell>
              <TableCell sx={{ p: 1, background: '#f0f1f6' }} align="center">
                <b>Type</b>
              </TableCell>
              <TableCell sx={{ p: 1, background: '#f0f1f6' }} align="center">
                <b>Required</b>
              </TableCell>
              <TableCell sx={{ p: 1, background: '#f0f1f6' }} align="center">
                <b>Primary Key</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ height: 'px', width: '100%', overflow: 'auto' }}>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">
                  <Typography name="fieldName" fullwidth size="small" variant="outlined">
                    {row?.fieldName}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography name="type" fullwidth size="small" variant="outlined">
                    {row?.type}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography name="isRequired" fullwidth size="small" variant="outlined">
                    {row?.isRequired ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography name="isPrimary" fullwidth size="small" variant="outlined">
                    {(table === 'users' && row?.fieldName === primaryKey) ||
                    (table !== 'users' && row?.fieldName === 'id')
                      ? 'Yes'
                      : 'No'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default EditableTable;
