import { useState } from 'react';
import TableAccordion from './TableAccordion';

const SelectedProjectTables = ({ tableData, selectedOption }) => {
  const tables = tableData.data;

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {tables?.map((table, index) => (
        <TableAccordion
          key={index}
          table={table}
          expanded={expanded}
          handleChange={handleChange}
          selectedOption={selectedOption}
        />
      ))}
    </div>
  );
};

export default SelectedProjectTables;
