import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import { CircularProgress } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableManager from './TableManager';
import { backendAPI } from '../../../../api/requests/contests/BackendAPI';
import { handleAlert } from '../../../../utils/handleAlert';

function TableAccordion({ table, expanded, handleChange, selectedOption }) {
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = React.useState({});
  const [primaryKey, setPrimaryKey] = React.useState('');
  const getUserSchemaPrimaryKey = async () => {
    try {
      const key = await backendAPI.getUsersPrimaryKey(selectedOption);
      setPrimaryKey(key?.fieldName);
    } catch (error) {
      handleAlert('Error fetching primary key', 'error');
    }
  };
  const fetchTable = async (table) => {
    setLoader(true);
    try {
      const responseData = await backendAPI.getTableData(selectedOption, table);
      const newRows = Object.keys(responseData?.properties ?? {}).map((key) => ({
        id: key,
        fieldName: key,
        isRequired: responseData?.required?.includes(key),
        isPrimary: false,
        customValidation: '',
        type: responseData?.properties[key].type ?? 'string',
      }));
      setRowData(newRows);
    } catch (error) {
      handleAlert('Error fetching tables details', 'error');
    }
    setLoader(false);
  };
  useEffect(() => {
    if (expanded === table && expanded !== false) {
      fetchTable(table);
      if (table === 'users') getUserSchemaPrimaryKey();
    }
  }, [table, expanded]);

  return (
    <Accordion expanded={expanded === table} onChange={handleChange(table)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {loader ? <CircularProgress size='20px'/> : table}
      </AccordionSummary>
      <AccordionDetails>
        <TableManager
          rows={Object.keys(rowData).length === 0 ? [] : rowData}
          primaryKey={primaryKey}
          table={table}
        />
      </AccordionDetails>
    </Accordion>
  );
}
export default TableAccordion;
