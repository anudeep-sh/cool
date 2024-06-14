import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { handleAlert } from '../../../utils/handleAlert';

function MethodSelectorTable({
  methodData,
  endpointData,
  selectedEndpoints,
  handleEndpointChange,
}) {
  const handleCopyToClipboard = (methodId, endpointIndex) => {
    const method = endpointData.find((endpoint) => endpoint.methodId === methodId);
    let toBeCopied;
    if (method && method.endpoints) {
      toBeCopied = method.endpoints[endpointIndex - 1].endpoint;
    }
    navigator.clipboard.writeText(toBeCopied);
    handleAlert('Copied to clipboard', 'success');
  };
  const display = 'Please choose a method';
  return (
    <Table>
      <TableHead>
        <Stack />
        <TableRow>
          <TableCell align="center" sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Method
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Endpoint
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: '600', fontSize: '1rem' }}>
            Description
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {methodData.map((method) => (
          <TableRow key={method.id}>
            <TableCell align="center">{method.name}</TableCell>
            <TableCell align="center">
              <FormControl>
                <Stack direction="row" alignItems="center">
                  <Select
                    value={selectedEndpoints[method.id] || ''}
                    onChange={(event) => handleEndpointChange(event, method.id)}
                    displayEmpty
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      width: '400px',
                      justifyContent: 'center',
                      '@media (max-width: 1000px)': {
                        width: '180px',
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Available Endpoints
                    </MenuItem>
                    {endpointData &&
                      endpointData
                        .find((item) => item.methodType === method.name)
                        .endpoints?.map((endpoint, index) => (
                          <MenuItem key={endpoint?.endpoint} value={index + 1}>
                            {endpoint?.endpoint}
                          </MenuItem>
                        ))}
                  </Select>
                  {selectedEndpoints[method.id] ? (
                    <Tooltip title="Copy to Clipboard">
                      <IconButton
                        sx={{ p: 0, marginLeft: 0.5 }}
                        onClick={() =>
                          handleCopyToClipboard(method.id, selectedEndpoints[method.id])
                        }
                      >
                        <ContentPasteTwoToneIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <IconButton disabled sx={{ p: 0, ml: 0.5 }}>
                      <ContentPasteTwoToneIcon fontSize="large" />
                    </IconButton>
                  )}
                </Stack>
              </FormControl>
            </TableCell>
            <TableCell align="center">
              <TextField
                style={{ backgroundColor: 'white', borderRadius: '10px' }}
                multiline
                fullWidth
                maxRows={4}
                value={
                  selectedEndpoints[method.id] !== undefined
                    ? endpointData?.find((item) => item.methodId === method.id).endpoints[
                        selectedEndpoints[method.id] - 1
                      ].description
                    : display
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MethodSelectorTable;
