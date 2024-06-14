import React, { useState, useCallback } from 'react';
import { Box } from '@mui/system';
import { Grid, IconButton } from '@mui/material';
import { Button, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Tooltip from '@mui/material/Tooltip';
import FilterOptions from './FilterOptions';
import TextField from '@mui/material/TextField';
import { IconTextField } from '../../TextField';

const SearchArea = ({ setSearchField, handleSearchUser, setId, setFilterSearch }) => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  const searchChange = useCallback(
    (event) => {
      setSearchField(event.target.value).toLocaleLowerCase();
    },
    [setSearchField]
  );

  const changeFilter = useCallback(
    (event) => {
      setFilterSearch(event.target.value).toLocaleLowerCase();
    },
    [setFilterSearch]
  );

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          sx={{ mb: { xs: 1, md: 0 } }}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={{xs: 'flex-start' }}
        >
          <TextField
            InputProps={{
              sx: {
                height: 35,
              },
            }}
            sx={{
              borderRadius: 1,
              borderColor: 'white',
              textDecorationColor: 'white',
              border: 0,
            }}
            variant="outlined"
            onChange={searchChange}
          />
          <Button
            sx={{
              ml: 1,
              fontSize: { xs: '12px', md: '14px' },
              textTransform: {
                xs: 'capitalize',
                md: 'uppercase',
              },
            }}
            variant="contained"
            onClick={() => handleSearchUser()}
          >
            Search
          </Button>
        </Grid>
        {/* <Grid
          item
          xs={12}
          sm={6}
          display={{ xs: 'none', md: 'flex' }}
          flexDirection={'row'}
          justifyContent={'flex-end'}
        >
          <Tooltip
            open={tooltipIsOpen}
            style={{ zIndex: 0 }}
            title={<FilterOptions setId={setId} />}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: '#ffffff',
                },
              },
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#f9f9f9',
                color: 'grey',
                border: 0,
                boxShadow: 'none',
                mr: { xs: 1 },
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                  color: 'grey',
                  boxShadow: 'none',
                },
              }}
              onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
            >
              <FilterAltOutlinedIcon />
              <Typography
                variant="caption"
                sx={{
                  mr: 2,
                  fontWeight: '200',
                  color: 'grey',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                Filters
              </Typography>
            </Button>
          </Tooltip>
          <TextField
            InputProps={{
              sx: {
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
            sx={{
              borderRadius: 1,
              borderColor: 'white',
              textDecorationColor: 'white',
              border: 0,
            }}
            variant="outlined"
            onChange={changeFilter}
          />
          <Button
            sx={{
              ml: 1,
              fontSize: { xs: '12px', md: '14px' },
              textTransform: {
                xs: 'capitalize',
                md: 'uppercase',
              },
            }}
            variant="contained"
            onClick={() => handleSearchUser()}
          >
            Search
          </Button>
        </Grid> */}
      </Grid>
    </>
  );
};

export default SearchArea;
