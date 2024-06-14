import React from 'react';
import { Box, Button, Tabs, Tab, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tabsClasses } from '@mui/material/Tabs';
import AddIcon from '@mui/icons-material/Add';
import NumberBadge from '../../pages/Contest/NumberBadge';
import { getOrgName } from '../../utils/appendOrgQuery';

const TabComponent = ({
  tabs,
  activeTab,
  setActiveTab,
  setPage,
  navigateToLink,
  statusCount,
  setSearchValue,
}) => {
  const orgName = getOrgName();

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
    setSearchValue('');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '99%',
        bgcolor: '#fff',
        boxShadow: 3,
        borderRadius: '10px',
        mb: 3,
        px: 1,
        pt: 1,
        mt: { xs: 1, sm: 2 },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          maxWidth: 'calc(100% - 150px)',
          height: '65px',
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        {Object.entries(tabs).map(([key, label]) => (
          <Tab
            key={key}
            icon={
              <NumberBadge
                num={statusCount ? statusCount[label] : 0}
                isActive={activeTab === key}
              />
            }
            iconPosition="end"
            label={label}
            value={key}
          />
        ))}
      </Tabs>

      <Button
        disableRipple
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => {
          navigate(`/org/${orgName}${navigateToLink}`);
        }}
        sx={{
          height: '35px',
          mb: 0.8,
          mr: 1,
        }}
      >
        Create
      </Button>
    </Box>
  );
};

export default TabComponent;
