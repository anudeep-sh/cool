import React, { useState } from 'react';
import { Stack, Typography, Box, Grid, Radio, IconButton } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconTextField } from '../../TextField';
import Skeletons from '../../Skeleton/Skeletons';

const FilterTaskAssignee = ({ onApplyChanges, onSearch }) => {
  const [range, setRange] = useState([0, 50]);
  const [value, setValue] = useState('');
  const [userName, setUserName] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLoad, setSearchLoad] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setRange(newValue);
  };

  const handleInputChange = (event, index) => {
    const newValue = event.target.value === '' ? 0 : Number(event.target.value);
    const newRange = [...range];
    newRange[index] = newValue;
    setRange(newRange);
  };

  const handleBlur = (index) => {
    let newValue = range[index];
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }
    const newRange = [...range];
    newRange[index] = newValue;
    setRange(newRange);
  };

  const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];

  const valuetext = (value) => {
    return `${value}%`;
  };

  const handleSubmitChange = () => {
    const dataToSend = {
      range,
      value,
      userName,
    };
    onApplyChanges(dataToSend);
  };

  const handleSearch = (event) => {
    const searchFieldString = event.target.value;
    setSearchKeyword(searchFieldString);
    if (event.target.value === '') {
      setSearched(false);
    }
  };
  const handleReset = () => {
    setSearchKeyword('');
    onSearch('');
    setSearched(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchKeyword);
    }
  };

  return (
    <Stack
      spacing={1}
      sx={{
        padding: '20px',
        paddingTop: '12px',
        width: '100%',
        borderLeft: '2px solid #e0e0e0',
      }}
    >
      <Box sx={{ boxShadow: 2, borderRadius: '10px', width: '100%', marginBottom: '20px' }}>
        <FormControl variant="outlined" sx={{ width: '100%' }}>
          <InputLabel
            style={{
              position: 'absolute',
              marginLeft: '50px',
              fontSize: '20px',
              transform: 'translateY(50%)',
              visibility: searchKeyword.length > 0 ? 'hidden' : 'visible',
            }}
          >
            Search
          </InputLabel>
          <IconTextField
            variant="outlined"
            onChange={handleSearch}
            value={searchKeyword}
            iconStart={
              searchKeyword ? (
                <IconButton aria-label="remove" size="small" onClick={() => handleReset()}>
                  <CloseRoundedIcon />
                </IconButton>
              ) : (
                <SearchRoundedIcon sx={{ fontSize: 30 }} />
              )
            }
            iconEnd={
              searchKeyword ? (
                searchLoad ? (
                  <Skeletons type="smallCircularLoader" />
                ) : (
                  <IconButton
                    aria-label="search"
                    size="small"
                    onClick={() => handleKeyPress({ key: 'Enter' })}
                  >
                    {' '}
                    <SearchRoundedIcon />
                  </IconButton>
                )
              ) : null
            }
            InputProps={{
              style: {
                borderRadius: '10px',
                boxShadow: '10',
              },
            }}
            onKeyPress={handleKeyPress}
          />
        </FormControl>
      </Box>

      <Box
        sx={{
          paddingX: { xs: '10px', md: '20px' },
          boxShadow: '2',
          borderRadius: '10px',
          gap: '10px',
          display: 'flex',
          flexDirection: 'column',
          height: '160px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: 'grey', fontSize: '20px' }}>Progress Range</Typography>
        <Grid container alignItems="center" sx={{ width: '100%' }}>
          <Slider
            value={range}
            onChange={handleSliderChange}
            aria-labelledby="range-slider"
            valueLabelFormat={(val, index) => `${val}%`}
            getAriaValueText={valuetext}
            marks={marks}
            min={0}
            max={100}
            thumb={false}
            sx={{
              color: '#698AFF',
              height: '30%',
              width: '100%',
              '.MuiSlider-thumb': {
                backgroundColor: 'white',
                border: '2px solid #698AFF',
                width: 20,
                height: 20,
              },
              '.MuiSlider-rail': {
                backgroundColor: 'black',
              },
            }}
          />
        </Grid>

        <Grid
          container
          alignItems="center"
          sx={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
        >
          <Grid item sx={{ margin: '0px', padding: '0px', textAlign: 'center' }}>
            <TextField
              value={range[0]}
              size="small"
              onChange={(e) => handleInputChange(e, 0)}
              onBlur={() => handleBlur(0)}
              sx={{
                width: '60px',
                textAlign: 'center',
                height: '30px',
                borderRadius: '10px',
                margin: '0px',
                padding: '0px',
                textAlign: 'center',
              }}
            />
          </Grid>
          <Grid item sx={{ padding: '0px' }}>
            <Typography
              variant="body1"
              sx={{ marginX: 1, marginTop: '10px', marginBottom: '0px', padding: '0px' }}
            >
              to
            </Typography>
          </Grid>
          <Grid item sx={{ padding: '0px', textAlign: 'center' }}>
            <TextField
              value={range[1]}
              size="small"
              onChange={(e) => handleInputChange(e, 1)}
              onBlur={() => handleBlur(1)}
              sx={{
                width: '60px',
                textAlign: 'center',
                height: '30px',
                borderRadius: '10px',
                marginBottom: '0px',
                marginTop: '0px',
                textAlign: 'center',
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <Stack
              direction="column"
              sx={{ boxShadow: '2', borderRadius: '10px', paddingX: '20px' }}
            >
              <Typography sx={{ color: 'grey', fontSize: '20px' }}>Username</Typography>
              <FormControlLabel value="A-Z" control={<Radio />} label="A-Z" />
              <FormControlLabel value="Z-A" control={<Radio />} label="Z-A" />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <Stack
              direction="column"
              sx={{ boxShadow: '2', borderRadius: '10px', paddingX: '20px' }}
            >
              <Typography sx={{ color: 'grey', fontSize: '20px' }}>Progress</Typography>
              <FormControlLabel value="Low to High" control={<Radio />} label="Low to High" />
              <FormControlLabel value="High to Low" control={<Radio />} label="High to Low" />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{ borderRadius: '10px', width: '100%' }}
        onClick={() => handleSubmitChange()}
      >
        Apply Changes
      </Button>
    </Stack>
  );
};

export default FilterTaskAssignee;
