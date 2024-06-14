import React, { useState } from 'react';
import { Box } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Typography } from '@mui/material';

const FilterOptions = ({ setId }) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ boxShadow: 1, border: 1, borderColor: '#e5e5e5' }}
      >
        <Box p={1}>
          <Typography variant="body1" sx={{ ml: 1, mr: 2, fontWeight: '400', color: 'grey' }}>
            Filter by-
          </Typography>
        </Box>
        <Box>
          <FormControl sx={{ justifyItems: 'left', textAlign: 'left', color: '#000000' }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="country"
              name="radio-buttons-group"
              sx={{ textAlign: 'left', color: '#000000' }}
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ border: 1, borderColor: '#e5e5e5', m: 1, height: 35 }}
              >
                <FormControlLabel
                  sx={{ ml: 0.5, justifyItems: 'left', textAlign: 'left', color: '#000000' }}
                  value="country"
                  control={<Radio />}
                  label="Country"
                  onClick={() => setId(1)}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ border: 1, borderColor: '#e5e5e5', m: 1, height: 35 }}
              >
                <FormControlLabel
                  sx={{ ml: 0.5, textAlign: 'left', color: '#000000' }}
                  value="institution"
                  control={<Radio />}
                  label="Institution"
                  onClick={() => setId(2)}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ border: 1, borderColor: '#e5e5e5', m: 1, height: 35 }}
              >
                <FormControlLabel
                  sx={{ ml: 0.5, textAlign: 'left', color: '#000000' }}
                  value="institution_type"
                  control={<Radio />}
                  label="Institution Type"
                  onClick={() => setId(3)}
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default FilterOptions;
